interface AddFn { // interface as function type
    (a: number, b:number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name: string;
    outputName?: string; //optional, also methods can be optional
}

interface Greetable extends Named { //or pass both to the class and inheritance can be multiple
    greet(phrase: string): void; 
}

class Person implements Greetable {
    name: string;
    constructor(name: string){
        this.name = name;
    }

    greet(p: string) {
        console.log(this.name, p)
    }
}

let user1 = new Person('Faus');

user1.greet('Hola');
