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
        for(let i = 0; i < gameBoard.board.length; i++) {
            move = gameBoard.board[i];
            document.getElementById(move[2]).innerText = "x";
        }
    }

    const playerInput = () => {
        _squares.forEach((square) => {
            square.addEventListener("click", () => {
                const index = square.id;
                gameBoard.board.push(`X:${index}`);
                return _populate();
            });
        })
    }

    return {playerInput}
    
})();

gamePlay.playerInput();