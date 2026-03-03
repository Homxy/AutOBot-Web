import * as Blockly from "blockly/core";

enum DriveType {
    DIFFERENTIAL = "DRIVE_DIFFERENTIAL",
    OMNI_3W = "DRIVE_OMNI_3W",
    MECANUM = "DRIVE_MECANUM"
}

export function initAutOBotBlocks() {
    Blockly.Blocks["autobot_begin"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("AutOBot setup drive")
                .appendField(
                    new Blockly.FieldDropdown([
                        ["Differential", DriveType.DIFFERENTIAL],
                        ["Omni 3-Wheel", DriveType.OMNI_3W],
                        ["Mecanum", DriveType.MECANUM],
                    ]),
                    "TYPE"
                )
                .appendField("deviation")
                .appendField(new Blockly.FieldNumber(0), "DEV");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#BC3FDC");
        },
    };

    Blockly.Blocks["autobot_move_simple"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("AutOBot")
                .appendField(
                    new Blockly.FieldDropdown([
                        ["forward", "goForward"],
                        ["backward", "goBackward"],
                        ["slide left", "slideLeft"],
                        ["slide right", "slideRight"],
                        ["rotate CW", "rotateCW"],
                        ["rotate CCW", "rotateCCW"],
                    ]),
                    "DIR"
                );
            this.appendValueInput("SPEED").setCheck("Number").appendField("speed");
            this.appendValueInput("TIME")
                .setCheck("Number")
                .appendField("time (ms)");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#BC3FDC");
        },
    };

    Blockly.Blocks["autobot_drive"] = {
        init: function () {
            this.appendDummyInput().appendField("AutOBot drive");
            this.appendValueInput("X").setCheck("Number").appendField("X");
            this.appendValueInput("Y").setCheck("Number").appendField("Y");
            this.appendValueInput("W").setCheck("Number").appendField("W");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#BC3FDC");
        },
    };

    Blockly.Blocks["autobot_stop"] = {
        init: function () {
            this.appendDummyInput().appendField("AutOBot stop");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#BC3FDC");
        },
    };

    Blockly.Blocks["autobot_teleop"] = {
        init: function () {
            this.appendDummyInput().appendField("AutOBot start Teleop (Bluetooth)");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("#BC3FDC");
        },
    };
}
