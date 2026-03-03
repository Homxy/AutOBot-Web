import * as Blockly from "blockly/core";

const Order = { ATOMIC: 0 };

export function initAutOBotAIGenerators(generator: any, Library: any) {
    generator.forBlock['autobot_ai_begin'] = function (block: Blockly.Block) {
        Library.AutOBotAI = true;
        return `ai.begin(robot);\n`;
    };

    generator.forBlock['autobot_ai_human'] = function (block: Blockly.Block) {
        const speed = generator.valueToCode(block, 'SPEED', Order.ATOMIC) || '0';
        const turn = generator.valueToCode(block, 'TURN', Order.ATOMIC) || '0.5';
        return `ai.requestHuman(${speed}, ${turn});\n`;
    };

    generator.forBlock['autobot_ai_line'] = function (block: Blockly.Block) {
        const color = block.getFieldValue('COLOR');
        const speed = generator.valueToCode(block, 'SPEED', Order.ATOMIC) || '0';
        return `ai.requestLine(${speed}, 0.5, 100, "${color}");\n`;
    };

    generator.forBlock['autobot_ai_handle'] = function (block: Blockly.Block) {
        return `ai.handle();\n`;
    };
}
