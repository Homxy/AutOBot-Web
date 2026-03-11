import * as Blockly from "blockly/core";

export function initArduinoGenerators(generator: any) {
    generator.forBlock["pin_set"] = function (block: Blockly.Block) {
        const pin = block.getFieldValue("PIN");
        const state = block.getFieldValue("STATE") === "1" ? "HIGH" : "LOW";
        generator.setupPins = generator.setupPins || new Set();
        generator.setupPins.add(pin);
        return `digitalWrite(${pin}, ${state});\n`;
    };

    generator.forBlock["pin_out"] = function (block: Blockly.Block) {
        const pin = block.getFieldValue("PIN");
        const state = block.getFieldValue("STATE") === "OUTPUT" ? "OUTPUT" : "INPUT";
        generator.pinOutput = generator.pinOutput || new Set();
        generator.pinOutput.add(pin);
        return `pinMode(${pin}, ${state});\n`;
    }

    generator.forBlock["wait_ms"] = function (block: Blockly.Block) {
        const duration = block.getFieldValue("DURATION") || 0;
        return `delay(${duration});\n`;
    };

    generator.forBlock["on_start"] = function (block: Blockly.Block) {
        const statements = generator.statementToCode(block, "DO");
        return 'void setup() {\n' + statements.replace(/^/gm, '  ') + '\n}\n';
    };

    generator.forBlock["on_loop"] = function (block: Blockly.Block) {
        const statements = generator.statementToCode(block, "DO");
        return 'void loop() {\n' + statements.replace(/^/gm, '  ') + '\n}\n';
    };
}
