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
            _roundWinner();
            _reset();
        } else if (_draw()) {
            over = true;
            _reset();
        }
    }

    const _reset = () => {
        for(let i =0; i < _board.length; i++) {
            _board[i] = null;
            document.getElementById(i).innerText = null;
        }
    }

    const _score1 = document.getElementById("p1Score");
    let _p1Count = 0;
    const _score2 = document.getElementById("p2Score");
    let _p2Count = 0;

    const _roundWinner = () => {


        if(!player1.turn) {
            _p1Count++;
            _score1.innerText = _p1Count;
        } else if (!player2.turn) {
            _p2Count++;
            _score2.innerText = _p2Count;
        }

        _gameWinner();
    }

    const _endScore = document.getElementById("endScore");
    const _winner = document.getElementById("winner");

    const _gameWinner = () => { 
        if(_p1Count == 3) {
            _endScore.setAttribute("style", "display: block;");
            _winner.innerText = "Congratulations! You've beat the bot!"
        } else if (_p2Count == 3) {
            _endScore.setAttribute("style", "display: block;");
            _winner.innerText == "You have been defeated! better luck next time"
        }
    }

    return {playerInput}
    
})();

gamePlay.playerInput();