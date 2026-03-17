"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import * as En from "blockly/msg/en";
import QRCode from "react-qr-code";
import { ArduinoGenerator } from "@/blockly/generator/arduino";
import BlocklyToolBoxLogic from "@/blockly/toolbox/BlocklyToolBoxLogic";
import BlocklyToolBoxAppearence from "@/blockly/toolbox/BlocklyToolBoxAppearence";
import { Download, FolderOpen, Trash2, Save, ChevronDown } from 'lucide-react';
import { useToast } from "@/components/ui/toast/ToastContext";

<<<<<<< HEAD
export default function BlocklyPage({ params }: { params: Promise<{ name: string }> }) {
=======
export default function BlocklyPage() {
>>>>>>> dev
    const blocklyDivRef = useRef<HTMLDivElement | null>(null);
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [code, setCode] = useState<string>("// Code will appear here…\n");
<<<<<<< HEAD
    const [Ports, setPorts] = useState<any[]>([]);
    const [BotID, setBotID] = useState<string>("");
    const [selectPort, setSelectPort] = useState<string>("");
    const { showToast } = useToast();


    const initPorts = async () => {
        try {
            const arduinoPort = await fetch("http://localhost:8080/arduino/ports");
            const portsData = await arduinoPort.json();
            console.log("Initial ports:", portsData);
            setPorts(portsData);
        } catch (error) {
            showToast({
                type: "info",
                title: "Ports Error",
                description: "Error fetching ports.",
                duration: 8000,
            });
        }
    };


=======
    const [name, setName] = useState("");
    const [Ports, setPorts] = useState<any[]>([]);
    const [BotID, setBotID] = useState<string>("");
    const [selectPort, setSelectPort] = useState<string>("");
    let autosaveTimer: NodeJS.Timeout;
    const { showToast } = useToast();


    const onWorkSpaceChange = (name: string) => {
        clearTimeout(autosaveTimer);
        autosaveTimer = setTimeout(async () => {
            const state = Blockly.serialization.workspaces.save(workspaceRef.current!);
            try {
                await fetch(`/api/workspace/${name}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ blocklyData: state }),
                });

            } catch (err) {
                console.error("save failed", err);
            }
        }, 60000);
    };

    const initPorts = async () => {
        const arduinoPort = await fetch("http://localhost:8080/arduino/ports");
        const portsData = await arduinoPort.json();
        console.log("Initial ports:", portsData);
        setPorts(portsData);
    };

>>>>>>> dev
    useEffect(() => {
        if (!blocklyDivRef.current) return;
        initPorts();
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

                on_start.initSvg();
                on_loop.initSvg();

                on_start.nextConnection?.connect(on_loop.previousConnection!);
                on_start.moveBy(50, 50);

                on_start.setDeletable(false);
                on_loop.setDeletable(false);
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
        const hasTeleop = arduinoCode.includes("    robot.telop();");

        try {
            showToast({
                type: "info",
                title: "Upload Info",
                description: "Uploading...",
                duration: 20000,
            });
            await fetch("http://localhost:8080/arduino/rewrite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: arduinoCode }),
            });

            const res = await fetch("http://localhost:8080/arduino/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ port: selectPort }),
            });

            if (res.ok) {
                showToast({
                    type: "success",
                    title: "Upload Success",
                    description: "Code uploaded successfully!",
<<<<<<< HEAD
                    duration: 8000,
=======
>>>>>>> dev
                });

            }
            else {
                showToast({
                    type: "error",
                    title: "Upload Failed",
                    description: "Failed to upload code.",
                });
            }

        } catch (err) {
            showToast({
                type: "error",
                title: "Upload Error",
                description: "An error occurred while uploading.",
            });
        }

        if (hasTeleop) {

            const serial = await fetch("http://localhost:8080/arduino/serial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ port: selectPort }),
            });

            const rawText = await serial.text();
            console.log("Serial response:", rawText);
            try {
                const data = JSON.parse(rawText);
                if (data && data.bot_id) {
                    setBotID(data.bot_id);
                } else if (data && data.id) {
                    setBotID(data.id);
                } else {
                    setBotID(rawText);
                }
            } catch (e) {
                setBotID(rawText);
            }
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
                    <div className="p-3 border-t border-gray-200 text-green-400 text-[10px] h-32 shrink-0 flex flex-col items-center overflow-hidden">
                        <div className="font-bold uppercase tracking-widest opacity-50 mb-2 self-start w-full">QR Code</div>
                        {BotID ? (
                            <div className="bg-white p-1.5 rounded-md shadow-sm">
                                <QRCode value={String(BotID)} size={70} />
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400 opacity-70">
                                No QR Code
                            </div>
                        )}
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

                    <button onClick={initPorts} className="flex items-center gap-2 bg-[#2149FF] px-6 py-2 rounded-lg font-bold shadow-sm transition-all active:scale-95">
                        Scan Port
                    </button>
                    <div className="relative group">
                        <select
                            className="appearance-none bg-black/20 hover:bg-black/30 border border-white/10 px-4 py-1.5 pr-8 rounded text-xs font-medium cursor-pointer outline-none transition-colors"
                            value={selectPort} // Bind the state to the select value
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setSelectPort(newValue);
                                console.log("Selected port:", newValue);
                            }}
                        >
                            <option value="">
                                {!Ports || Ports.length === 0 ? "No Ports Found" : "Select a Port"}
                            </option>

                            {Ports?.filter(Boolean).map((p, index) => (
                                <option
                                    key={p.address || index}
                                    value={p.address}
                                    className="bg-[#365AFF]"
                                >
                                    {p.address}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ChevronDown size={14} className="opacity-70" />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-xs font-medium tracking-tight">
                        <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded">
                            <FolderOpen size={14} />
<<<<<<< HEAD
                            <span>untititle</span>
=======
                            <span>Untitled</span>
>>>>>>> dev
                        </div>
                    </div>
                </div>

            </footer>
        </div>
    );
}