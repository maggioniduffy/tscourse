"use strict";
let userInput;
let userName;
userInput = 5;
userInput = 'aaaa';
// userName = userInput; //error pero con any no daria
function generateError(message, code) {
    throw { message, errorCode: code };
}
