const gameBoard = (() => {
    const board = [];

    return {board};
})();

const player = (name) => {
    return {name};
}

const gamePlay = (() => {

    let _selection = document.querySelectorAll(".square");

    playerInput = () => {
        _selection.forEach((square) => {
            square.addEventListener("click", () => {square.innerHTML = "<p>x</p>"});
            })
        }

        return {playerInput}
    
})();

gamePlay.playerInput();