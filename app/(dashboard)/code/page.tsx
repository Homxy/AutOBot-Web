"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import * as En from "blockly/msg/en";
import { ArduinoGenerator } from "@/blockly/generator/arduino";
import BlocklyToolBoxLogic from "@/blockly/toolbox/BlocklyToolBoxLogic";
import BlocklyToolBoxAppearence from "@/blockly/toolbox/BlocklyToolBoxAppearence";
import { Download, FolderOpen, Trash2, Save, ChevronDown } from 'lucide-react';

export default function BlocklyPage({ params }: { params: Promise<{ id: string }> }) {
    const blocklyDivRef = useRef<HTMLDivElement | null>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [code, setCode] = useState<string>("// Code will appear here…\n");
    const [name, setName] = useState("untitled");
    const [Ports, setPorts] = useState<any[]>([]);
    const [selectPort, setSelectPort] = useState<string>("");
    let autosaveTimer: NodeJS.Timeout;

    const initPorts = async () => {
        const arduinoPort = await fetch("/api/getport");
        const portsData = await arduinoPort.json();
        console.log("Initial ports:", portsData);
        setPorts(portsData);
    };

    const getPorts = async () => {
        const ports = await (navigator as any).serial.getPorts();

        (navigator as any).serial.addEventListener("connect", async (event: any) => {
            console.log("Serial port connected event detected");
            const serialPort = event.target;
            const serialPortInfo = serialPort.getInfo();
            const arduinoPort = await fetch("/api/getport");
            const portsData = await arduinoPort.json();
            portsData.forEach((p: any) => {
                setPorts((prevPorts) => [...prevPorts, p]);
            });
        });

        (navigator as any).serial.addEventListener("disconnect", async (event: any) => {
            console.log("Serial port disconnected event detected");
            const serialPort = event.target;
            const serialPortInfo = serialPort.getInfo();
            setPorts(prevPorts => prevPorts.filter(p => {
                return !(Number.parseInt(p.vid, 16) === serialPortInfo.usbVendorId && Number.parseInt(p.pid, 16) === serialPortInfo.usbProductId);
            }));
        });
    };


    useEffect(() => {
        if (!blocklyDivRef.current) return;
        initPorts();
        getPorts();
        BlocklyToolBoxLogic();

        Object.assign(Blockly.Msg, En);

        const workspace = Blockly.inject(blocklyDivRef.current, {
            toolbox: BlocklyToolBoxAppearence,
            renderer: "zelos",
            grid: { spacing: 20, length: 3, colour: "#E5E7EB", snap: true },
            zoom: { controls: true, wheel: true, startScale: 1.0 },
            trashcan: true,
        });

        workspaceRef.current = workspace;

        const on_start = workspace.newBlock("on_start");
        const on_loop = workspace.newBlock("on_loop");
        on_start.initSvg();
        on_loop.initSvg();
        on_start.nextConnection.connect(on_loop.previousConnection);
        on_start.moveBy(50, 50);
        on_start.setDeletable(false);
        on_loop.setDeletable(false);


        workspace.addChangeListener(() => {
            const arduinoCode = ArduinoGenerator.workspaceToCode(workspace);
            setCode(arduinoCode || "// (no blocks yet)\n");

            const blocks = workspace.getAllBlocks(false);
            const hasStart = blocks.some(b => b.type === "on_start");
            const hasLoop = blocks.some(b => b.type === "on_loop");

            if (!hasStart || !hasLoop) {
                const on_start = workspace.newBlock("on_start");
                const on_loop = workspace.newBlock("on_loop");
                const serial_begin = workspace.newBlock("serial_begin");

                on_start.initSvg();
                on_loop.initSvg();
                serial_begin.initSvg();

                on_start.nextConnection?.connect(on_loop.previousConnection!);
                on_start.getInput("DO")?.connection?.connect(serial_begin.previousConnection!);
                on_start.moveBy(50, 50);

                on_start.setDeletable(false);
                on_loop.setDeletable(false);
                serial_begin.setDeletable(false);
            }
        });
        // 6. Handle Resizing
        const ro = new ResizeObserver(() => {
            Blockly.svgResize(workspace);
        });
        ro.observe(blocklyDivRef.current);

        return () => {
            ro.disconnect();
            workspace.dispose();
        };


    }, []);

    const runCode = async () => {
        if (!workspaceRef.current) return;
        const arduinoCode = ArduinoGenerator.workspaceToCode(workspaceRef.current) || "// (no blocks yet)\n";

        try {
            await fetch("api/writefile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: arduinoCode }),
            });
            console.log("from client", selectPort);
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ port: selectPort }),
            });

            if (res.ok) {
                alert("Code uploaded successfully!");
            } else {
                alert("Failed to upload code.");
            }
        } catch (err) {
            console.error("Upload failed", err);
            alert("An error occurred during upload.");
        }
    };

    const saveCode = () => {
        if (!workspaceRef.current) return;

        const state = Blockly.serialization.workspaces.save(workspaceRef.current);
        const stateString = JSON.stringify(state, null, 2);

        localStorage.setItem('blockly_state', stateString);

        const blob = new Blob([stateString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.json`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    }

    const loadFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !workspaceRef.current) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target?.result as string;
            try {
                const state = JSON.parse(contents);
                Blockly.serialization.workspaces.load(state, workspaceRef.current!);
            } catch (err) {
                alert("Invalid file format. Please upload a valid Blockly JSON file.");
            }
        };
        reader.readAsText(file);
        event.target.value = "";
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const clearWorkspace = () => {
        workspaceRef.current?.clear();
    };



    return (
        <div className="flex flex-col h-[calc(100vh-65px)] overflow-hidden text-slate-900">
            <main className="flex flex-[8]">
                <section className="flex-1 relative bg-white border-r overflow-hidden">
                    <div ref={blocklyDivRef} className="absolute inset-0 w-full h-full" />
                </section>
                <section className="w-[300px] bg-[#fdfdfd] flex flex-col border-l border-gray-200">
                    <div className="p-3 border-b bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
                    </div>
                    <pre className="p-4 text-xs leading-relaxed overflow-auto text-pink-600 flex-1">
                        {code}
                    </pre>
                    <div className="p-3 border-t border-gray-200 text-green-400 text-[10px] h-32 shrink-0">
                        <div className="font-bold uppercase tracking-widest opacity-50 mb-2">QR Code</div>
                        {/* QR Code logic or image would go here */}
                    </div>
                </section>
            </main>

            <footer className="flex-[1] bg-[#365AFF] flex items-center justify-between px-6 text-white z-10 shadow-lg shrink-0">
                <div className="flex gap-3">
                    <button onClick={runCode} className="flex items-center gap-2 bg-[#2149FF] px-6 py-2 rounded-lg font-bold shadow-sm transition-all active:scale-95">
                        <Download size={18} /> Upload
                    </button>
                    <button onClick={clearWorkspace} className="flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95">
                        <Trash2 size={16} /> Clear
                    </button>
                    <button onClick={saveCode} className="flex items-center gap-2 bg-[#2149FF] px-6 py-2 rounded-lg font-bold shadow-sm transition-all active:scale-95">
                        <Save size={18} /> Save
                    </button>
                    <button onClick={handleImportClick} className="flex items-center gap-2 bg-[#2149FF] px-6 py-2 rounded-lg font-bold shadow-sm transition-all active:scale-95">
                        <FolderOpen size={18} /> Import
                    </button>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={loadFromFile}
                    accept=".json"
                    style={{ display: 'none' }}
                />

                {/* --- NEW DROPDOWN SECTION --- */}
                <div className="flex items-center gap-4 ml-auto mr-6">
                    <div className="relative group">
                        {/* <select 
                    className="appearance-none bg-black/20 hover:bg-black/30 border border-white/10 px-4 py-1.5 pr-8 rounded text-xs font-medium cursor-pointer outline-none transition-colors"
                    value={selectPort}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        setSelectPort(newValue);
                        console.log("Selected port:", newValue);
                    }}
                >
                    <option value="">
                        {Ports.length > 0 ? "Select a Port" : "No Ports Found"}
                    </option>

                    {Ports.map((p, index) => (
                        <option 
                            key={p.portAddress || index} 
                            value={p.portAddress} 
                            className="bg-[#365AFF]"
                        >
                            {p.portAddress}
                        </option>
                    ))}
                </select> */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown size={14} className="opacity-70" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs font-medium tracking-tight">
                        <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded">
                            <FolderOpen size={14} />
                            <span>{name}</span>
                        </div>
                    </div>
                </div>

            </footer>
        </div>
    );
}