const gameBoard = (() => {
    const board = new Array(9);

    return {board};
})();

const player = (name) => {
    let turn;
    return {name, turn};
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

                if(_board[index] == null) {
                    if(player1.turn) {
                        _board[index] = "X";
                        player1.turn = false;
                        player2.turn = true;
                    } else if (player2.turn) {
                        _board[index] = "O";
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
            if(_board[i] != null) {
                let square = document.getElementById(i);
                square.innerText = _board[i];
            } 
        }
    }

    const _diagonal = () => { 
        if(_board[4] != null && _board[0] == _board[4] && _board[4] == _board[8]) {
            return true;
        } else if (_board[4] != null && _board[2] == _board[4] && _board[4] == _board[6]) {
            return true;
        } else {
            return false;
        }
    }

    const _vertical = () => {
        if(_board[3] != null && _board[0] == _board[3] && _board[3] == _board[6]) {
            return true;
        } else if (_board[4] != null && _board[1] == _board[4] && _board[4] == _board[7]) {
            return true;
        } else if (_board[5] != null && _board[2] == _board[5] && _board[5] == _board[8]) {
            return true;
        } else {
            return false;
        }
    }

    const _horizontal = () => {
        if(_board[1] != null && _board[0] == _board[1] && _board[1] == _board[2]) {
            return true;
        } else if (_board[4] != null && _board[3] == _board[4] && _board[4] == _board[5]) {
            return true;
        } else if (_board[7] != null && _board[6] == _board[7] && _board[7] == _board[8]) {
            return true;
        } else {
            return false;
        }
    }

    const _draw = () => {
        let draw = false;
        for(let item of _board) {
            if(item == null) {
                draw = false;
                break;
            } else if (item != null && _gameOver.over != true) {
                draw = true;
            }
        }
        
        return draw;
    }

    const _gameOver = () => {
        let over = false;
        if(_diagonal() || _vertical() || _horizontal()) {
            over = true;
            _winner("winner");
            _reset();
        } else if (_draw()) {
            alert('Draw');
            over = true;
            _winner("draw");
            _reset();
        }
    }

    const _reset = () => {
        for(let i =0; i < _board.length; i++) {
            _board[i] = null;
            document.getElementById(i).innerText = null;
        }
    }

    const _winner = (outcome) => {
        const message = document.createElement("div");
        message.setAttribute("id", "winner");
        const body = document.querySelector("body");

        if(!player1.turn) {
            outcome == "draw" ? message.innerText = "Draw!" : message.innerText = "Player 1 wins!";
        } else if (!player2.turn) {
            outcome == "draw" ? message.innerText = "Draw!" : message.innerText = "Player 2 wins!";
        }
        body.appendChild(message);
    }

    return {playerInput}
    
})();

gamePlay.playerInput();