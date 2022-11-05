const gameboard = (() => {
    const board = [];

    return {board};
})();

const player = (name) => {
    return {name};
}

const person = player("David"); 

console.log(person.name);