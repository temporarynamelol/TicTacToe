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
const player2 = player("player2");
player1.turn = true;


const gamePlay = (() => {

    let _squares = document.querySelectorAll(".square");

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
                _gameOver();
            });
        })

    }

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

    const _diagonal = () => { 
        const board = gameBoard.board;
        if(board[4][0] != null && board[0][0] == board[4][0] && board[4][0] == board[8][0]) {
            return true;
        } else if (board[4][0] != null && board[2][0] == board[4][0] && board[4][0] == board[6][0]) {
            return true;
        } else {
            return false;
        }
    }

    const _vertical = () => {
        const board = gameBoard.board;
        if(board[3][0] != null && board[0][0] == board[3][0] && board[3][0] == board[6][0]) {
            return true;
        } else if (board[4][0] != null && board[1][0] == board[4][0] && board[4][0] == board[7][0]) {
            return true;
        } else if (board[5][0] != null && board[2][0] == board[5][0] && board[5][0] == board[8][0]) {
            return true;
        } else {
            return false;
        }
    }

    const _horizontal = () => {
        const board = gameBoard.board;
        if(board[1][0] != null && board[0][0] == board[1][0] && board[1][0] == board[2][0]) {
            return true;
        } else if (board[4][0] != null && board[3][0] == board[4][0] && board[4][0] == board[5][0]) {
            return true;
        } else if (board[7][0] != null && board[6][0] == board[7][0] && board[7][0] == board[8][0]) {
            return true;
        } else {
            return false;
        }
    }

    const _gameOver = () => {
        if(_diagonal()) {
            alert("Game over this worked diaganol");
        } else if (_vertical()) {
            alert("Vertical");
        } else if (_horizontal()) {
            alert("Horizontal");
        }
    }


    return {playerInput}
    
})();

gamePlay.playerInput();