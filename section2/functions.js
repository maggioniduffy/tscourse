"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function printRes(num) {
    console.log('Result: ' + num);
}
function addAndHandle(n1, n2, cb) {
    const res = n1 + n2;
    cb(res);
}
printRes(add(2, 13));
let combValues;
combValues = add;
console.log(combValues(20, 8));
addAndHandle(2, 5, (res) => {
    console.log(res);
});
