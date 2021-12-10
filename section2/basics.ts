function add1(n1: number, n2: number, showResult: boolean, phrase: string) {
    const res = n1 + n2;
    if (showResult) {
        console.log(phrase + res);
    } else {
        return res;
    }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resPhrase = 'Result is: ';

const result = add1(number1,number2, printResult, resPhrase);
console.log(result);
