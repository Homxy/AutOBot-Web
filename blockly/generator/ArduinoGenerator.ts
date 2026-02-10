"use strict";

import * as Blockly from 'blockly';

interface ArduinoGenerator extends Blockly.Generator {
  setupPins?: Set<string>;
  pinOutput?: Set<string>;
  /** Track if AutOBot library is being used in the current workspace */
  autobotUsed?: boolean;
}

export const ArduinoGenerator: ArduinoGenerator = new Blockly.Generator('Arduino');

const Order = {
  ATOMIC: 0,           // 0, 1, 'string', variable
  MULTIPLICATIVE: 3,   // *, /, %
  ADDITIVE: 4,         // +, -
  RELATIONAL: 6,       // <, <=, >, >=
  EQUALITY: 7,         // ==, !=
  LOGICAL_AND: 11,     // &&
  LOGICAL_OR: 12,      // ||
  ASSIGNMENT: 14,      // =
};

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


// If/Else Condition
ArduinoGenerator.forBlock['controls_if'] = function(block) {
  let n = 0;
  let code = '';
  do {
    const conditionCode = ArduinoGenerator.valueToCode(block, 'IF' + n, Order.ATOMIC) || 'false';
    const branchCode = ArduinoGenerator.statementToCode(block, 'DO' + n);
    code += (n > 0 ? 'else ' : '') + `if (${conditionCode}) {\n${branchCode}}\n`;
    n++;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    const branchCode = ArduinoGenerator.statementToCode(block, 'ELSE');
    code += `else {\n${branchCode}}\n`;
  }
  return code;
};

// Comparison (x == y, x < y, etc.)
ArduinoGenerator.forBlock['logic_compare'] = function(block) {
  const OPERATORS: { [key: string]: string } = {
    'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='
  };
  const operator = OPERATORS[block.getFieldValue('OP')];
  const argument0 = ArduinoGenerator.valueToCode(block, 'A', Order.RELATIONAL) || '0';
  const argument1 = ArduinoGenerator.valueToCode(block, 'B', Order.RELATIONAL) || '0';
  return [`${argument0} ${operator} ${argument1}`, Order.RELATIONAL];
};

// Boolean (true/false)
ArduinoGenerator.forBlock['logic_boolean'] = function(block) {
  const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
  return [code, Order.ATOMIC];
};

// Repeat X times
ArduinoGenerator.forBlock['controls_repeat_ext'] = function(block) {
  const repeats = ArduinoGenerator.valueToCode(block, 'TIMES', Order.ASSIGNMENT) || '0';
  const branch = ArduinoGenerator.statementToCode(block, 'DO');
  const loopVar = "i"; // In a production app, use a unique variable name
  return `for (int ${loopVar} = 0; ${loopVar} < ${repeats}; ${loopVar}++) {\n${branch}}\n`;
};

// While / Until
ArduinoGenerator.forBlock['controls_whileUntil'] = function(block) {
  const until = block.getFieldValue('MODE') === 'UNTIL';
  let condition = ArduinoGenerator.valueToCode(block, 'BOOL', Order.ATOMIC) || 'false';
  if (until) condition = '!' + condition;
  const branch = ArduinoGenerator.statementToCode(block, 'DO');
  return `while (${condition}) {\n${branch}}\n`;
};

// -- Math --

ArduinoGenerator.forBlock["math_number"] = function (block) {
  const code = Number(block.getFieldValue("NUM"));
  return [code.toString(), Order.ATOMIC];
};

ArduinoGenerator.forBlock["logic_boolean"] = function (block) {
  const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
  return [code, Order.ATOMIC];
};

ArduinoGenerator.forBlock["math_arithmetic"] = function (block) {
  // 1. Explicitly define the object type or cast the key
  const OPERATORS: { [key: string]: [string, number] } = {
    'ADD': [' + ', Order.ATOMIC],
    'MINUS': [' - ', Order.ATOMIC],
    'MULTIPLY': [' * ', Order.ATOMIC],
    'DIVIDE': [' / ', Order.ATOMIC],
  };

  // 2. Get the value and cast it as a key of the object
  const opField = block.getFieldValue('OP');
  const tuple = OPERATORS[opField];
  
  const operator = tuple[0];
  const order = tuple[1];
  
  const argument0 = ArduinoGenerator.valueToCode(block, 'A', order) || '0';
  const argument1 = ArduinoGenerator.valueToCode(block, 'B', order) || '0';
  
  const code = argument0 + operator + argument1;
  return [code, order];
};

ArduinoGenerator.forBlock['text'] = function(block) {
  const code = JSON.stringify(block.getFieldValue('TEXT'));
  return [code, Order.ATOMIC];
};

ArduinoGenerator.forBlock['text_print'] = function(block) {
  const msg = ArduinoGenerator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
  // Ensure Serial.begin is in setup if using this
  return `Serial.println(${msg});\n`;
};


// --- Standard Arduino Blocks ---


ArduinoGenerator.forBlock["pin_set"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const state = block.getFieldValue("STATE") === "1" ? "HIGH" : "LOW";
  ArduinoGenerator.setupPins = ArduinoGenerator.setupPins || new Set();
  ArduinoGenerator.setupPins.add(pin);
  return `digitalWrite(${pin}, ${state});\n`;
};

ArduinoGenerator.forBlock["pin_out"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const state = block.getFieldValue("STATE") === "OUTPUT" ? "OUTPUT" : "INPUT";
  ArduinoGenerator.pinOutput = ArduinoGenerator.pinOutput || new Set();
  ArduinoGenerator.pinOutput.add(pin);
  return `pinMode(${pin}, ${state});\n`;
}

ArduinoGenerator.forBlock["wait_ms"] = function (block) {
  const duration = block.getFieldValue("DURATION") || 0;
  return `delay(${duration});\n`;
};

// --- AutOBot Library Blocks ---

ArduinoGenerator.forBlock["autobot_begin"] = function (block) {
  Library.AutOBot = true; // Flag that we need headers and object declaration
  const driveType = block.getFieldValue('TYPE') || 'mecanum';
  const deviation = block.getFieldValue('DEV') || 0;
  return `robot.begin("${driveType}", ${deviation});\n`;
};

ArduinoGenerator.forBlock["autobot_move_simple"] = function (block) {
  Library.AutOBot = true;
  const dir = block.getFieldValue('DIR');
  const speed = ArduinoGenerator.valueToCode(block, 'SPEED', Order.ATOMIC) || '0';
  const time = ArduinoGenerator.valueToCode(block, 'TIME', Order.ATOMIC) || '0';
  return `robot.${dir}(${speed}, ${time});\n`;
};

ArduinoGenerator.forBlock["autobot_drive"] = function (block) {
  Library.AutOBot = true;
  const x = ArduinoGenerator.valueToCode(block, 'X', Order.ATOMIC) || '0';
  const y = ArduinoGenerator.valueToCode(block, 'Y', Order.ATOMIC) || '0';
  const w = ArduinoGenerator.valueToCode(block, 'W', Order.ATOMIC) || '0';
  return `robot.drive(${x}, ${y}, ${w});\n`;
};

ArduinoGenerator.forBlock["autobot_stop"] = function (block) {
  Library.AutOBot = true;
  return `robot.stop();\n`;
};

ArduinoGenerator.forBlock["autobot_teleop"] = function (block) {
  Library.AutOBot = true;
  return `robot.telop();\n`;
};

// --- Control Structures ---

ArduinoGenerator.forBlock["on_start"] = function (block) {
  // We don't skip setup for AutOBot; we just wrap the code
  const statements = ArduinoGenerator.statementToCode(block, "DO");
  return 'void setup() {\n' + statements.replace(/^/gm, '  ') + '\n}\n';
};

ArduinoGenerator.forBlock["on_loop"] = function (block) {
  const statements = ArduinoGenerator.statementToCode(block, "DO");
  return 'void loop() {\n' + statements.replace(/^/gm, '  ') + '\n}\n';
};

ArduinoGenerator.forBlock['autobot_ai_begin'] = function(block) {
  Library.AutOBotAI = true;
  return `ai.begin(robot);\n`;
};

ArduinoGenerator.forBlock['autobot_ai_human'] = function(block) {
  const speed = ArduinoGenerator.valueToCode(block, 'SPEED', Order.ATOMIC) || '0';
  const turn = ArduinoGenerator.valueToCode(block, 'TURN', Order.ATOMIC) || '0.5';
  return `ai.requestHuman(${speed}, ${turn});\n`;
};

ArduinoGenerator.forBlock['autobot_ai_line'] = function(block) {
  const color = block.getFieldValue('COLOR');
  const speed = ArduinoGenerator.valueToCode(block, 'SPEED', Order.ATOMIC) || '0';
  return `ai.requestLine(${speed}, 0.5, 100, "${color}");\n`;
};

ArduinoGenerator.forBlock['autobot_ai_handle'] = function(block) {
  return `ai.handle();\n`;
};

// --- workspaceToCode() Implementation ---

ArduinoGenerator.workspaceToCode = function (workspace: Blockly.Workspace | undefined) {
  if (!workspace) return '// Error: No workspace provided\n';

  // Reset state
  ArduinoGenerator.setupPins = new Set();
  Library.AutOBot = false;
  
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
    libraryIncludes += `#include <AutOBotPi.h>\n`;
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