const BlocklyToolBoxAppearence = {
        kind: 'categoryToolbox',
        contents: [
        {
            kind: 'category',
            name: 'Logic',
            colour: '#5757FF',
            contents: [
            { kind: 'block', type: 'controls_if' },
            { kind: 'block', type: 'logic_compare' },
            { kind: 'block', type: 'logic_operation' },
            { kind: 'block', type: 'logic_negate' },
            { kind: 'block', type: 'logic_boolean' }
            ]
        },
        {
            kind: 'category',
            name: 'Loops',
            colour: '#74CC00',
            contents: [
            {
                kind: 'block',
                type: 'controls_repeat_ext',
                inputs: { TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } } }
            },
            { kind: 'block', type: 'controls_whileUntil' },
            {
                kind: 'block',
                type: 'controls_for',
                inputs: {
                FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                TO: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
                BY: { shadow: { type: 'math_number', fields: { NUM: 1 } } }
                }
            }
            ]
        },
        {
            kind: 'category',
            name: 'Math',
            colour: '#BC3FDC',
            contents: [
            { kind: 'block', type: 'math_number', fields: { NUM: 123 } },
            { kind: 'block', type: 'math_arithmetic' },
            {
                kind: 'block',
                type: 'math_random_int',
                inputs: {
                FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
                TO: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
                }
            }
            ]
        },
        {
            kind: 'category',
            name: 'Text',
            colour: '#FF5757',
            contents: [
            { kind: 'block', type: 'text' },
            { kind: 'block', type: 'text_print' }
            ]
        },
        { kind: 'category', name: 'Variables', custom: 'VARIABLE', colour: '#FFBD59' },
        {
            kind: 'category',
            name: 'Arduino',
            colour: '#5757FF',
            contents: [
            { kind: 'block', type: 'pin_out' },
            { kind: 'block', type: 'pin_set' },
            { kind: 'block', type: 'wait_ms', fields: { DURATION: 1000 } }
            ]
        },
        {
            kind: 'category',
            name: 'AutOBot',
            colour: '#BC3FDC',
            contents: [
            { kind: 'block', type: 'autobot_begin', fields: { TYPE: 'mecanum', DEV: 0 } },
            {
                kind: 'block',
                type: 'autobot_move_simple',
                inputs: {
                SPEED: { shadow: { type: 'math_number', fields: { NUM: 1.0 } } },
                TIME: { shadow: { type: 'math_number', fields: { NUM: 1000 } } }
                }
            },
            {
                kind: 'block',
                type: 'autobot_drive',
                inputs: {
                X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                W: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
                }
            },
            { kind: 'block', type: 'autobot_stop' },
            { kind: 'block', type: 'autobot_teleop' }
            ]
        },
        {
            kind: 'category',
            name: 'AutOBotAI',
            colour: '#FF5757',
            contents: [
            { kind: 'block', type: 'autobot_ai_begin' },
            { kind: 'block', type: 'autobot_ai_handle' },
            { kind: 'sep', gap: 20 },
            {
                kind: 'block',
                type: 'autobot_ai_human',
                inputs: {
                SPEED: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
                TURN: { shadow: { type: 'math_number', fields: { NUM: 0.5 } } }
                }
            },
            {
                kind: 'block',
                type: 'autobot_ai_line',
                inputs: { SPEED: { shadow: { type: 'math_number', fields: { NUM: 50 } } } }
            }
            ]
        }
    ]
};

export default BlocklyToolBoxAppearence;