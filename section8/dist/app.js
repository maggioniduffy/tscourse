"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (ogConstructor) {
        return class extends ogConstructor {
            constructor(..._) {
                super();
                const elem = document.getElementById(hookId);
                if (elem) {
                    elem.innerHTML = template;
                    elem.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'max';
        console.log('create');
    }
    login() {
        console.log('logged');
    }
};
Person = __decorate([
    Logger('logginggggg'),
    WithTemplate('<h1> Hello there <b> .... </b> <br/> <h5> Faustino Maggioni </h5> </h1>', 'app')
], Person);
const person = new Person();
function Log(target, propName) {
    console.log('prop decorator', target, propName);
}
function Log2(target, name, descriptor) {
    console.log('prop decorator', target, name, descriptor);
}
function Log3(target, name, descriptor) {
    console.log('prop decorator', target, name, descriptor);
}
function Log4(target, name, position) {
    console.log('prop decorator', target, name, position);
}
class Product {
    constructor(title, _price) {
        this.title = title;
        this._price = this.price;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
function Autobind(_, _2, descriptor) {
    const ogMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = ogMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = 'works';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const button = document.querySelector('button');
const p = new Printer();
button.addEventListener('click', p.showMessage);
const validators = {};
function Required(target, propName) {
    var _a, _b;
    validators[target.constructor.name] = Object.assign(Object.assign({}, validators[target.constructor.name]), { [propName]: [...((_b = (_a = validators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    validators[target.constructor.name] = Object.assign(Object.assign({}, validators[target.constructor.name]), { [propName]: [...((_b = (_a = validators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validate(obj) {
    const objValidatorConfig = validators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.price = p;
        this.title = t;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElem = document.querySelector('#title');
    const pricElem = document.querySelector('#price');
    const title = titleElem.value;
    const price = +pricElem.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('invalid inputs');
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map