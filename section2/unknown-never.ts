let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'aaaa';

// userName = userInput; //error pero con any no daria

function generateError(message: string, code: number): never {
    throw { message, errorCode: code}
}