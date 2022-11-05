const gameBoard = (() => {
    const board = [];

    return {board};
})();

const player = (name) => {
    return {name};
}


const gamePlay = (() => {
    let _squares = document.querySelectorAll(".square");

    const _populate = () => {
        for(move of gameBoard.board) {
            document.getElementById(move[2]).innerText = "x";
        }
    }

    const playerInput = () => {
        _squares.forEach((square) => {
            square.addEventListener("click", () => {
                const index = square.id;
                gameBoard.board.push(`X:${index}`);
                _populate();
            });
        })
    }

    return {playerInput}
    
})();

gamePlay.playerInput();