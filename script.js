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
    const _board = gameBoard.board;

    const playerInput = () => {
        _squares.forEach((square) => {
            square.addEventListener("click", () => {
                const index = square.id;
                if(_board[index] <= 1) {
                    if(player1.turn) {
                        _board[index].push("X");
                        player1.turn = false;
                        player2.turn = true;
                    } else if (player2.turn) {
                        _board[index].push("O");
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
        for(let i = 0; i < _board.length; i++) {
            let position = _board[i];
            if(position.length == 1) {
                let square = document.getElementById(i);
                square.innerText = position[0];
            } 
        }
    }

    const _diagonal = () => { 
        if(_board[4][0] != null && _board[0][0] == _board[4][0] && _board[4][0] == _board[8][0]) {
            return true;
        } else if (_board[4][0] != null && _board[2][0] == _board[4][0] && _board[4][0] == _board[6][0]) {
            return true;
        } else {
            return false;
        }
    }

    const _vertical = () => {
        if(_board[3][0] != null && _board[0][0] == _board[3][0] && _board[3][0] == _board[6][0]) {
            return true;
        } else if (_board[4][0] != null && _board[1][0] == _board[4][0] && _board[4][0] == _board[7][0]) {
            return true;
        } else if (_board[5][0] != null && _board[2][0] == _board[5][0] && _board[5][0] == _board[8][0]) {
            return true;
        } else {
            return false;
        }
    }

    const _horizontal = () => {
        if(_board[1][0] != null && _board[0][0] == _board[1][0] && _board[1][0] == _board[2][0]) {
            return true;
        } else if (_board[4][0] != null && _board[3][0] == _board[4][0] && _board[4][0] == _board[5][0]) {
            return true;
        } else if (_board[7][0] != null && _board[6][0] == _board[7][0] && _board[7][0] == _board[8][0]) {
            return true;
        } else {
            return false;
        }
    }

    const _draw = () => {
        let draw = false;
        for(let item of _board) {
            if(item[0] == null) {
                draw = false;
                break;
            } else if (item[0] != null && _gameOver.over != true) {
                draw = true;
            }
        }
        
        return draw;
    }

    const _gameOver = () => {
        if(_diagonal()) {
            let over = false;
            alert("Game over this worked diaganol");
            over = true;
        } else if (_vertical()) {
            alert("Vertical");
            over = true;
        } else if (_horizontal()) {
            alert("Horizontal");
            over = true;
        } else if (_draw()) {
            alert('Draw');
        }
    }


    return {playerInput}
    
})();

gamePlay.playerInput();