/*function Logger(constructor: Function) {
    console.log('creating');
    console.log(constructor);
}*/

// Decorator Factory: 

function Logger(logString: string) { //THIS ALLOWS US TO USES PARAMETERS
    return function(constructor: Function) { //THIS IS THE DECORATOR
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) { //THIS ALLOWS US TO USES PARAMETERS
    return function< T extends {new(...args: any[]): {name: string}} >(ogConstructor: T) { // the underscore tells TS that you dont use the parameter
        return class extends ogConstructor {
            constructor(..._: any[]) { //So this wat the template it's only added to the DOM if we create an instance of the class
                super();
                const elem = document.getElementById(hookId);
                if (elem) {
                    elem.innerHTML = template;
                    elem.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

@Logger('logginggggg') // this second, but this factory executes before
@WithTemplate('<h1> Hello there <b> .... </b> <br/> <h5> Faustino Maggioni </h5> </h1>', 'app') // this executes first
class Person {
    name = 'max';
    
    constructor() {
        console.log('create');
    }

    login() {
        console.log('logged');
    }
}

const person = new Person();

function Log(target: any, propName: string | Symbol) {
    console.log('prop decorator', target, propName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('prop decorator', target, name, descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('prop decorator', target, name, descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('prop decorator', target, name, position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    constructor(title: string, _price: number) {
        this.title = title;
        this._price = this.price
    }

    @Log2
    set price(val: number) {
        if (val>0) {
            this._price = val;
        }
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
    const ogMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
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
    message = 'works';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const button = document.querySelector('button')!;
const p = new Printer();

// button.addEventListener('click', p.showMessage); not works because 'this' in this case doesn't refers to object p.
// button.addEventListener('click', p.showMessage.bind(p)); // one solution

button.addEventListener('click', p.showMessage);

// Validator decorator
// EXISTS class-validator package to do this
interface ValidatorConfig {
    [property: string] : {
        [validatableProp: string] : string[]
    }
}

const validators: ValidatorConfig = {}

function Required(target: any, propName: string) {
    validators[target.constructor.name] = {
        ...validators[target.constructor.name],
        [propName]: [...(validators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}
 
function PositiveNumber(target: any, propName: string) {
    validators[target.constructor.name] = {
        ...validators[target.constructor.name],
        [propName]: [...(validators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(obj: any) {
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
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.price = p;
        this.title = t;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElem = document.querySelector('#title') as HTMLInputElement;
    const pricElem = document.querySelector('#price') as HTMLInputElement;

    const title = titleElem.value;
    const price = +pricElem.value;

    const createdCourse = new Course(title, price);

    if(!validate(createdCourse)) {
        alert('invalid inputs');
        return;
    }

    console.log(createdCourse)
})