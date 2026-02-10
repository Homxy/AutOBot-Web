// components/BlocklyEditor.tsx
"use client";
import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export default function BlocklyEditor({ onCodeChange }: { onCodeChange: (code: string) => void }) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    // Define the Toolbox (The Categories)
    const toolbox = {
      kind: 'categoryToolbox',
      contents: [
        { kind: 'category', name: 'Basic', colour: '#4c97ff', contents: [{ kind: 'block', type: 'controls_repeat_ext' }] },
        { kind: 'category', name: 'Logic', colour: '#5b80a5', contents: [{ kind: 'block', type: 'logic_compare' }] },
        { kind: 'category', name: 'Loops', colour: '#5ba55b', contents: [{ kind: 'block', type: 'controls_whileUntil' }] },
        { kind: 'category', name: 'Math', colour: '#5b67a5', contents: [{ kind: 'block', type: 'math_number' }] },
      ],
    };

    workspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox,
      grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
      trashcan: true,
    });

    // Listen for changes to generate code
    workspace.current.addChangeListener(() => {
      const code = javascriptGenerator.workspaceToCode(workspace.current!);
      onCodeChange(code);
    });

    return () => workspace.current?.dispose();
  }, [onCodeChange]);

  return <div ref={blocklyDiv} className="h-full w-full" />;
}