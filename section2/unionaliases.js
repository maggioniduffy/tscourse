"use strict";
function combine(input1, input2, result) {
    if (typeof input1 === 'number' && typeof input2 === 'number' || result === 'as-number') {
        return +input1 + +input2;
    }
    else {
        return input1.toString() + input2.toString();
    }
}
const combinedAges = combine(20, 15, 'as-number');
const combinedNames = combine('Faus', 'tino', 'as-text');
const combinedStringAges = combine('20', '15', 'as-number');
