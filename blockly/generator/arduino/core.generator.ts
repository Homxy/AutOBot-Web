import * as Blockly from "blockly/core";

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

export function initCoreGenerators(generator: Blockly.Generator) {
    // If/Else Condition
    generator.forBlock['controls_if'] = function (block) {
        let n = 0;
        let code = '';
        do {
            const conditionCode = generator.valueToCode(block, 'IF' + n, Order.ATOMIC) || 'false';
            const branchCode = generator.statementToCode(block, 'DO' + n);
            code += (n > 0 ? 'else ' : '') + `if (${conditionCode}) {\n${branchCode}}\n`;
            n++;
        } while (block.getInput('IF' + n));

        if (block.getInput('ELSE')) {
            const branchCode = generator.statementToCode(block, 'ELSE');
            code += `else {\n${branchCode}}\n`;
        }
        return code;
    };

    // Comparison (x == y, x < y, etc.)
    generator.forBlock['logic_compare'] = function (block) {
        const OPERATORS: { [key: string]: string } = {
            'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='
        };
        const operator = OPERATORS[block.getFieldValue('OP')];
        const argument0 = generator.valueToCode(block, 'A', Order.RELATIONAL) || '0';
        const argument1 = generator.valueToCode(block, 'B', Order.RELATIONAL) || '0';
        return [`${argument0} ${operator} ${argument1}`, Order.RELATIONAL];
    };

    // Boolean (true/false)
    generator.forBlock['logic_boolean'] = function (block) {
        const code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
        return [code, Order.ATOMIC];
    };

    // Repeat X times
    generator.forBlock['controls_repeat_ext'] = function (block) {
        const repeats = generator.valueToCode(block, 'TIMES', Order.ASSIGNMENT) || '0';
        const branch = generator.statementToCode(block, 'DO');
        const loopVar = "i"; // In a production app, use a unique variable name
        return `for (int ${loopVar} = 0; ${loopVar} < ${repeats}; ${loopVar}++) {\n${branch}}\n`;
    };

    // While / Until
    generator.forBlock['controls_whileUntil'] = function (block) {
        const until = block.getFieldValue('MODE') === 'UNTIL';
        let condition = generator.valueToCode(block, 'BOOL', Order.ATOMIC) || 'false';
        if (until) condition = '!' + condition;
        const branch = generator.statementToCode(block, 'DO');
        return `while (${condition}) {\n${branch}}\n`;
    };

    // -- Math --
    generator.forBlock["math_number"] = function (block) {
        const code = Number(block.getFieldValue("NUM"));
        return [code.toString(), Order.ATOMIC];
    };

    generator.forBlock["math_arithmetic"] = function (block) {
        const OPERATORS: { [key: string]: [string, number] } = {
            'ADD': [' + ', Order.ATOMIC],
            'MINUS': [' - ', Order.ATOMIC],
            'MULTIPLY': [' * ', Order.ATOMIC],
            'DIVIDE': [' / ', Order.ATOMIC],
        };

        const opField = block.getFieldValue('OP');
        const tuple = OPERATORS[opField];

        const operator = tuple[0];
        const order = tuple[1];

        const argument0 = generator.valueToCode(block, 'A', order) || '0';
        const argument1 = generator.valueToCode(block, 'B', order) || '0';

        const code = argument0 + operator + argument1;
        return [code, order];
    };

    generator.forBlock['text'] = function (block) {
        const code = JSON.stringify(block.getFieldValue('TEXT'));
        return [code, Order.ATOMIC];
    };

    generator.forBlock['text_print'] = function (block) {
        const msg = generator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
        return `Serial.println(${msg});\n`;
    };
}
