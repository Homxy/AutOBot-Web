import * as Blockly from "blockly/core";

const Order = { ATOMIC: 0 };

export function initAutOBotAIGenerators(generator: any, Library: any) {
    generator.forBlock['autobot_ai_begin'] = function (block: Blockly.Block) {
        Library.AutOBotAI = true;
        return `Serial2.begin(115200, SERIAL_8N1, myAi.rx, myAi.tx);\nai.begin(myRobot);\n`;
    };

    generator.forBlock['autobot_ai_human'] = function (block: Blockly.Block) {
        const speed = generator.valueToCode(block, 'SPEED', Order.ATOMIC) || '0';
        const turn = generator.valueToCode(block, 'TURN', Order.ATOMIC) || '0.5';
        const box = generator.valueToCode(block, 'BOX', Order.ATOMIC) || '30000';
        const deadzone = generator.valueToCode(block, 'DEADZONE', Order.ATOMIC) || '5000';
        return `myAi.requestHuman(${speed}, ${turn}, ${box}, ${deadzone});\n`;
    };

    generator.forBlock['autobot_ai_line'] = function (block: Blockly.Block) {
        const color = block.getFieldValue('COLOR');
        const speed = generator.valueToCode(block, 'SPEED', Order.ATOMIC) || '0';
        const turn = generator.valueToCode(block, 'TURN', Order.ATOMIC) || '0.5';
        const thresh = generator.valueToCode(block, 'THRESH', Order.ATOMIC) || '100';
        const defs = generator.valueToCode(block, 'DEFS', Order.ATOMIC) || '0';
        const defd = generator.valueToCode(block, 'DEFD', Order.ATOMIC) || '0';
        const defa = generator.valueToCode(block, 'DEFA', Order.ATOMIC) || '0';
        return `myAi.requestLine(${speed}, ${turn}, ${thresh}, "${color}", ${defs}, ${defd}, ${defa});\n`;
    };

    generator.forBlock['autobot_ai_handle'] = function (block: Blockly.Block) {
        return `myAi.handle();\n`;
    };
}
