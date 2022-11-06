const gameBoard = (() => {
    const board = [[], [], [], [], [], [], [], [], []];

    return {board};
})();

const player = (name) => {
    let turn;
    let turns = 0;
    return {name, turn, turns};
}

const player1 = player("player1");
player1.turn = true;

const player2 = player("player2");


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
                    if(player1.turn) {
                        gameBoard.board[index].push("X");
                        player1.turn = false;
                        player2.turn = true;
                    } else if (player2.turn) {
                        gameBoard.board[index].push("O");
                        player1.turn = true;
                        player2.turn = false;
                    }

                }
                _populate();
            }, {once: true});
        })

    }


    return {playerInput}
    
})();

gamePlay.playerInput();