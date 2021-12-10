const names: Array<string> = ['max', 'faus']; //an array is a generic 

const promise = new Promise<string> ((resolve,reject) => {
    setTimeout(() => {
        resolve('done')
    }, 2000)
})

//Create my own

/*function merge(objA, objB) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'faus'}, {age: 20}); //mergeObj: object
// mergedObj.name or mergedObj.age -- cant access neather */

function merge<T extends object, U extends object> (objA: T, objB: U) { //Generic. Constraint: extends object
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'faus'}, {age: 20}); //mergeObj: T & U intersection
// mergedObj.name or mergedObj.age -- can access both
console.log(mergedObj.name, mergedObj.age);

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]; //does this key exists in obj? -- keyof solve this
}

//Generic Class

class DataStorage<T> { 
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}