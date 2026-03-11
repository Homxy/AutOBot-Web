import * as Blockly from "blockly/core";

export function initAutOBotAIBlocks() {
    Blockly.Blocks["autobot_ai_begin"] = {
        init: function () {
            this.appendDummyInput().appendField("Initialize AutoBotAI");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#FF5757");
        },
    };

    Blockly.Blocks["autobot_ai_human"] = {
        init: function () {
            this.appendDummyInput().appendField("AI Follow Human");
            this.appendValueInput("SPEED")
                .setCheck("Number")
                .appendField("Base Speed");
            this.appendValueInput("TURN").setCheck("Number").appendField("Turn Gain");
            this.appendValueInput("BOX").setCheck("Number").appendField("Box Size");
            this.appendValueInput("DEADZONE").setCheck("Number").appendField("Deadzone");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#FF5757");
        },
    };

    Blockly.Blocks["autobot_ai_line"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("AI: Follow Line")
                .appendField(
                    new Blockly.FieldDropdown([
                        ["Black", "black"],
                        ["White", "white"],
                    ]),
                    "COLOR"
                );
            this.appendValueInput("SPEED")
                .setCheck("Number")
                .appendField("Base Speed");
            this.appendValueInput("TURN")
                .setCheck("Number")
                .appendField("Turn Gain");
            this.appendValueInput("THRESH")
                .setCheck("Number")
                .appendField("Threshold");
            this.appendValueInput("DEFS")
                .setCheck("Number")
                .appendField("Fallback Speed");
            this.appendValueInput("DEFD")
                .setCheck("Number")
                .appendField("Fallback Dir");
            this.appendValueInput("DEFA")
                .setCheck("Number")
                .appendField("Fallback Ang");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#FF5757");
        },
    };

    Blockly.Blocks["autobot_ai_handle"] = {
        init: function () {
            this.appendDummyInput().appendField("AI: Update/Handle Tasks");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#FF5757");
        },
    };
}
