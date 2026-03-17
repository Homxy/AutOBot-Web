import * as Blockly from "blockly/core";

// Define Order locally or import if shared (assuming ATOMIC=0)
const Order = { ATOMIC: 0 };

export function initAutOBotGenerators(generator: any, Library: any) {
    generator.forBlock["autobot_begin"] = function (block: Blockly.Block) {
        Library.AutOBot = true; // Flag that we need headers and object declaration
        const driveType = block.getFieldValue('TYPE');
        const deviation = block.getFieldValue('DEV');
        return `myRobot.begin(${driveType}, ${deviation});\n`;
    };

    generator.forBlock["autobot_move_simple"] = function (block: Blockly.Block) {
        Library.AutOBot = true;
        const dir = block.getFieldValue('DIR');
        const speed = generator.valueToCode(block, 'SPEED', Order.ATOMIC) || '0';
        const time = generator.valueToCode(block, 'TIME', Order.ATOMIC) || '0';
        return `myRobot.${dir}(${speed}, ${time});\n`;
    };

    generator.forBlock["autobot_drive"] = function (block: Blockly.Block) {
        Library.AutOBot = true;
        const x = generator.valueToCode(block, 'X', Order.ATOMIC) || '0';
        const y = generator.valueToCode(block, 'Y', Order.ATOMIC) || '0';
        const w = generator.valueToCode(block, 'W', Order.ATOMIC) || '0';
        return `myRobot.drive(${x}, ${y}, ${w});\n`;
    };

    generator.forBlock["autobot_stop"] = function (block: Blockly.Block) {
        Library.AutOBot = true;
        return `myRobot.stop();\n`;
    };

    generator.forBlock["autobot_teleop"] = function (block: Blockly.Block) {
        Library.AutOBot = true;
        return `Serial.begin(115200);\nmyRobot.teleop();\n`;
    };
}
