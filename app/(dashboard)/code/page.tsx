"use client";
import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core"; 
import "blockly/blocks"; 
import * as En from "blockly/msg/en";
import { ArduinoGenerator } from "@/blockly/generator/ArduinoGenerator";
import BlocklyToolBox from "@/blockly/toolbox/BlocklyToolBox";
import { Download, FolderOpen, Trash2, Save } from 'lucide-react';

export default function BlocklyPage() {
  const blocklyDivRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [code, setCode] = useState<string>("// Code will appear here…\n");

  useEffect(() => {
    if (!blocklyDivRef.current) return;

    BlocklyToolBox();
    Object.assign(Blockly.Msg, En);

    const toolbox = {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: 'Logic',
          colour: '#5757FF',
          contents: [
            { kind: 'block', type: 'controls_if' },
            { kind: 'block', type: 'logic_compare' },
            { kind: 'block', type: 'logic_operation' },
            { kind: 'block', type: 'logic_negate' },
            { kind: 'block', type: 'logic_boolean' }
          ]
        },
        {
          kind: 'category',
          name: 'Loops',
          colour: '#74CC00',
          contents: [
            {
              kind: 'block',
              type: 'controls_repeat_ext',
              inputs: { TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } } }
            },
            { kind: 'block', type: 'controls_whileUntil' },
            {
              kind: 'block',
              type: 'controls_for',
              inputs: {
                FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
                BY: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
              }
            }
          ]
        },
        {
          kind: 'category',
          name: 'Math',
          colour: '#BC3FDC',
          contents: [
            { kind: 'block', type: 'math_number', fields: { NUM: 123 } },
            { kind: 'block', type: 'math_arithmetic' },
            {
              kind: 'block',
              type: 'math_random_int',
              inputs: {
                FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                TO: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
              }
            }
          ]
        },
        {
          kind: 'category',
          name: 'Text',
          colour: '#FF5757',
          contents: [
            { kind: 'block', type: 'text' },
            { kind: 'block', type: 'text_print' }
          ]
        },
        { kind: 'category', name: 'Variables', custom: 'VARIABLE', colour: '#FFBD59' },
        {
          kind: 'category',
          name: 'Arduino',
          colour: '#5757FF',
          contents: [
            { kind: 'block', type: 'pin_out' },
            { kind: 'block', type: 'pin_set' },
            { kind: 'block', type: 'wait_ms', fields: { DURATION: 1000 } }
          ]
        },
        {
          kind: 'category',
          name: 'AutOBot',
          colour: '#BC3FDC',
          contents: [
            { kind: 'block', type: 'autobot_begin', fields: { TYPE: 'mecanum', DEV: 0 } },
            {
              kind: 'block',
              type: 'autobot_move_simple',
              inputs: {
                SPEED: { shadow: { type: 'math_number', fields: { NUM: 1.0 } } },
                TIME: { shadow: { type: 'math_number', fields: { NUM: 1000 } } }
              }
            },
            {
              kind: 'block',
              type: 'autobot_drive',
              inputs: {
                X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                W: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
              }
            },
            { kind: 'block', type: 'autobot_stop' },
            { kind: 'block', type: 'autobot_teleop' }
          ]
        },
        {
          kind: 'category',
          name: 'AutOBotAI',
          colour: '#FF5757',
          contents: [
            { kind: 'block', type: 'autobot_ai_begin' },
            { kind: 'block', type: 'autobot_ai_handle' },
            { kind: 'sep', gap: 20 },
            {
              kind: 'block',
              type: 'autobot_ai_human',
              inputs: {
                SPEED: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                TURN: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } }
              }
            },
            {
              kind: 'block',
              type: 'autobot_ai_line',
              inputs: { SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } } }
            }
          ]
        }
      ]
    };

    // 3. Inject Workspace
    const workspace = Blockly.inject(blocklyDivRef.current, {
      toolbox,
      renderer: "zelos",
      grid: { spacing: 20, length: 3, colour: "#E5E7EB", snap: true },
      zoom: { controls: true, wheel: true, startScale: 1.0 },
      trashcan: true,
    });

    workspaceRef.current = workspace;

    // 4. Initial Blocks
    const on_start = workspace.newBlock("on_start");
    const on_loop = workspace.newBlock("on_loop");
    on_start.initSvg();
    on_loop.initSvg();
    on_start.nextConnection.connect(on_loop.previousConnection);
    on_start.moveBy(50, 50);

    // 5. Change Listener for Code Generation
    const listener = () => {
      const arduinoCode = ArduinoGenerator.workspaceToCode(workspace);
      setCode(arduinoCode || "// (no blocks yet)\n");
    };
    workspace.addChangeListener(listener);

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

    async function runCode() {
        if (!workspaceRef.current) return;

        const ag = ArduinoGenerator.workspaceToCode(workspaceRef.current) || "// (no blocks yet)\n";

        await fetch("api/write_file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: ag }),
        });

        await fetch("api/compile_upload", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        });
    };

    async function saveCode() {
        if (!workspaceRef.current) return;

        const state = Blockly.serialization.workspaces.save(workspaceRef.current);
        const stateString = JSON.stringify(state, null, 2);

        localStorage.setItem('blockly_state', stateString);

        const blob = new Blob([stateString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = "Untitled Project.json";
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log("File downloaded and saved to LocalStorage");
    }

    async function loadFromFile(event: React.ChangeEvent<HTMLInputElement>) {
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
  // ... (keep saveCode, clearWorkspace, etc. from your original file)

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] overflow-hidden text-slate-900">
      <main className="flex flex-[8]">
        <section className="flex-1 relative bg-white border-r overflow-hidden">
          <div ref={blocklyDivRef} className="absolute inset-0 w-full h-full" />
        </section>
        <section className="w-[300px] bg-[#fdfdfd] flex flex-col border-l border-gray-200">
          <div className="p-3 border-b bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
            <span>Arduino Code</span>
          </div>
          <pre className="p-4 font-mono text-xs leading-relaxed overflow-auto text-pink-600 flex-1">
            {code}
          </pre>
        </section>
      </main>

      <footer className="flex-[1] bg-[#365AFF] flex items-center justify-between px-6 text-white z-10 shadow-lg shrink-0">
        <div className="flex gap-3">
            <button onClick={saveCode} className="flex items-center gap-2 bg-[#2149FF] px-6 py-2 rounded-lg font-bold shadow-sm transition-all active:scale-95">
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

        <div className="flex items-center gap-6 text-xs font-medium tracking-tight">
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded">
            <FolderOpen size={14} />
            <span>Untitled Project</span>
          </div>
        </div>

      </footer>
    </div>
  );
}