import * as Blockly from "blockly/core";

export function initArduinoBlocks() {
    Blockly.Blocks["pin_set"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("turns")
                .appendField(
                    new Blockly.FieldDropdown([
                        ["D0", "0"],
                        ["D1", "1"],
                        ["D2", "2"],
                        ["D3", "3"],
                        ["D4", "4"],
                        ["D5", "5"],
                        ["D6", "6"],
                        ["D7", "7"],
                        ["D8", "8"],
                        ["D9", "9"],
                        ["D10", "10"],
                        ["D11", "11"],
                        ["D12", "12"],
                        ["D13", "13"],
                        ["D14", "14"],
                        ["D15", "15"],
                        ["D16", "16"],
                        ["D17", "17"],
                        ["D18", "18"],
                        ["D19", "19"],
                        ["D20", "20"],
                        ["D21", "21"],
                        ["D22", "22"],
                        ["D23", "23"],
                    ]),
                    "PIN"
                )
                .appendField("to")
                .appendField(
                    new Blockly.FieldDropdown([
                        ["ON", "1"],
                        ["OFF", "0"],
                    ]),
                    "STATE"
                );

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("Set a digital pin to ON (HIGH) or OFF (LOW)");
        },
    };

    Blockly.Blocks["pin_out"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("set pin")
                .appendField(
                    new Blockly.FieldDropdown([
                        ["D0", "0"],
                        ["D1", "1"],
                        ["D2", "2"],
                        ["D3", "3"],
                        ["D4", "4"],
                        ["D5", "5"],
                        ["D6", "6"],
                        ["D7", "7"],
                        ["D8", "8"],
                        ["D9", "9"],
                        ["D10", "10"],
                        ["D11", "11"],
                        ["D12", "12"],
                        ["D13", "13"],
                        ["D14", "14"],
                        ["D15", "15"],
                        ["D16", "16"],
                        ["D17", "17"],
                        ["D18", "18"],
                        ["D19", "19"],
                        ["D20", "20"],
                        ["D21", "21"],
                        ["D22", "22"],
                        ["D23", "23"],
                    ]),
                    "PIN"
                )
                .appendField("to")
                .appendField(
                    new Blockly.FieldDropdown([
                        ["OUTPUT", "OUTPUT"],
                        ["INPUT", "INPUT"],
                    ]),
                    "STATE"
                );

            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(230);
            this.setTooltip("Set a digital pin to OUTPUT or INPUT");
        },
    };

    Blockly.Blocks["wait_ms"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("wait")
                .appendField(new Blockly.FieldNumber(1000, 0), "DURATION")
                .appendField("ms");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip("Wait for specified milliseconds");
        },
    };

    Blockly.Blocks["on_start"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("on setup(start)");
            this.appendStatementInput("DO")
                .setCheck(null)
                .appendField("do");
            this.setColour(210);
            this.setTooltip("Run once when the program starts.");
            this.setHelpUrl("");
            this.setDeletable(false);
            this.setNextStatement(true, null);
        },
    };

    Blockly.Blocks["on_loop"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("on loop");
            this.appendStatementInput("DO")
                .setCheck(null)
                .appendField("do");
            this.setColour(210);
            this.setTooltip("Repeat continuously while the program runs.");
            this.setHelpUrl("");
            this.setDeletable(false);
            this.setPreviousStatement(true, null);
        },
    };

}
