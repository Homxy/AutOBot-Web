"use strict";

import * as Blockly from 'blockly';
import { initCoreGenerators } from './core.generator';
import { initArduinoGenerators } from './arduino.generator';
import { initAutOBotGenerators } from './autobot.generator';
import { initAutOBotAIGenerators } from './autobot_ai.generator';

interface ArduinoGenerator extends Blockly.Generator {
  setupPins?: Set<string>;
  pinOutput?: Set<string>;
  /** Track if AutOBot library is being used in the current workspace */
  autobotUsed?: boolean;
}

export const ArduinoGenerator: ArduinoGenerator = new Blockly.Generator('Arduino');

// Internal state for library detection
const Library = {
  AutOBot: false,
  AutOBotAI: false
};

ArduinoGenerator.scrub_ = function (block, code) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = nextBlock ? this.blockToCode(nextBlock) : "";
  return code + nextCode;
};

// Initialize all the different domain generators onto our ArduinoGenerator instance
initCoreGenerators(ArduinoGenerator);
initArduinoGenerators(ArduinoGenerator);
initAutOBotGenerators(ArduinoGenerator, Library);
initAutOBotAIGenerators(ArduinoGenerator, Library);

// --- workspaceToCode() Implementation ---
ArduinoGenerator.workspaceToCode = function (workspace: Blockly.Workspace | undefined) {
  if (!workspace) return '// Error: No workspace provided\n';

  // Reset state
  ArduinoGenerator.setupPins = new Set();
  Library.AutOBot = false;
  Library.AutOBotAI = false;

  let libraryIncludes = '';
  let globalDeclarations = '';
  let mainCode = '';

  const blocks = workspace.getTopBlocks(true);

  // Generate code for all blocks
  for (const block of blocks) {
    mainCode += this.blockToCode(block) || '';
  }

  // Handle AutOBot Library Requirements
  if (Library.AutOBot) {
    libraryIncludes += `#include <AutOBot.h>\n`;
    globalDeclarations += `AutOBot robot;\n\n`;
  }

  if (Library.AutOBotAI) {
    libraryIncludes += `#include <AutOBotAI.h>\n`;
    globalDeclarations += `AutOBotAI ai;\n`;
  }

  let finalCode = libraryIncludes + '\n' + globalDeclarations + mainCode;

  // Ensure Boilerplate (setup/loop) exists if not manually added by blocks
  if (!finalCode.includes('void setup()')) {
    finalCode += `\nvoid setup() {\n  // Setup code\n}\n`;
  }
  if (!finalCode.includes('void loop()')) {
    finalCode += `\nvoid loop() {\n  // Loop code\n}\n`;
  }

  // Formatting cleanup
  return finalCode
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
};