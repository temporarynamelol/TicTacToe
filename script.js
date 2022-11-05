const gameBoard = (() => {
    const board = [[], [], [], [], [], [], [], [], []];

    return {board};
})();

const player = (name) => {
    return {name};
}


const gamePlay = (() => {
    let _squares = document.querySelectorAll(".square");

    const _populate = () => {
        let board = gameBoard.board;
        for(let i = 0; i < board.length; i++) {
            let position = board[i];
            if(position.length == 1) {
                let square = document.getElementById(i);
                square.innerText = position[0];
            } 
        }
    }

    const playerInput = () => {
        _squares.forEach((square) => {
            square.addEventListener("click", () => {
                const index = square.id;
                if(gameBoard.board[index] <= 1) {
                    gameBoard.board[index].push("X");
                }
                _populate();
            });
        })
    }

    return {playerInput}
    
})();

gamePlay.playerInput();