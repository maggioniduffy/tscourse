function add (n1: number, n2: number): number { //not declare if not necesary
    return n1 + n2;
}

function printRes(num: number): void {
    console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (n: number) => void) { //doesnt catch the return on purpouse
    const res = n1 + n2;
    cb(res);
}
printRes(add(2,13));

let combValues: (a: number, b: number) => number;
combValues = add;

console.log(combValues(20,8));

addAndHandle(2, 5, (res) => {
    console.log(res)
})