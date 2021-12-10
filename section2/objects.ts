/* const person: {
    name: string,
    age: number, //interface
} = { */
/* const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string]; //TUPLA
} = {
    name: 'Faus',
    age: 20,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'] //tuple
}; *///object type name,age infered by typescript

//person.nickname --> ERROR

//person.role.push is allowed but person.role.push = [0,'a','b'] (length 3) is not allowed

/* let favoriteActivities: string [];
favoriteActivities = ['sports']

for (const hobby of person.hobbies) { //infer hobby: string
    console.log(hobby.toLocaleLowerCase())
}
*/

enum Role { ADMIN, READ_ONLY, AUTHOR } //0,1,2
//enum Role { ADMIN = 5, READ_ONLY, AUTHOR } 5,6,7

const person = {
    name: 'Faus',
    age: 20,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN //enum
};

if(person.role === Role.ADMIN) {
    console.log('is admin')
}