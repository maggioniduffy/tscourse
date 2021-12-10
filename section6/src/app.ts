//intersection type
type Admin = {
    name: string;
    privileges: string[],
}

type Employee = {
    name: string;
    startDate: Date;
}

type SuperEmployee = Admin & Employee //Intersection

const e1: SuperEmployee = {
    name: 'Max',
    privileges: ['aas'],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; //numbe? yes

function add(a: number, b: number): number; //FUNCTION OVERLOAD -- good to knows the exact return type for each parameter combination
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    if(typeof a === 'string' || typeof b === 'string' ) { //Type Guard
        return a.toString() + b.toString();
    }
    return a + b;   
}

const result = add(1,5);

//OPTIONAL CHAINING
// obj.subobj?.prop

//Nulish Coalescing

const userInput = ''; //falsy

const storeddata = userInput ?? 'default'; //if we wanna keep the empty string instead ||. ?? gives false only with null and undefined

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if ('privileges' in emp) { //type guard
        console.log('Privileges: ' + emp.privileges); //cant use typeof
    } 
}

class Car {
    drive() {
        console.log('driving')
    }
}

class Truck {
    drive() {
        console.log('driving a truck');
    }

    loadCargo(amount: number) {
        console.log("loading ", amount);
    }
}

type Vehicle = Car | Truck;

function useVehicle(veh: Vehicle) {
    veh.drive(); //OK
    /*if ('loadCargo' in veh) {
        veh.loadCargo(100);
    }*/
    if (veh instanceof Truck) { //Better way
        veh.loadCargo(100);
    }
    
}

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse'; //DISCRIMINATED UNION
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    //cant use instanceOf because of interfaces
    let speed;
    switch (animal.type) {
        case 'bird': 
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('moving with speed: ' + animal);
    
}

// const input = <HTMLInputElement>document.querySelector('#message-output'); //CASTEADO CON <>
const input = document.querySelector('#message-output')! as HTMLInputElement; //Otra forma de castear
// input.value ==> error because not knows the exact type: CAST 
input.value = 'Hola' //no da error

interface ErrorContainer { //flexible -- INDEX TYPES
    id: string;
    [prop: string]: string; //dont know the exactly prop name nor the exact quantity
}

