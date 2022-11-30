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



const gamePlay = (() => {

    let _squares = document.querySelectorAll(".square");
    const _board = gameBoard.board;
    let over = false;

    const playerInput = () => {
        
        _squares.forEach((square) => {
            square.addEventListener("click", () => {
                const index = square.id;

                let spot;
                let botMove;

                if(_board[index] == null) {

                    spot = document.getElementById(index);
                    _board[index] = "X";
                    spot.innerText = "X";
                    _gameOver("p1");
                    if(over) {
                        over = false;
                        return;
                    }

                    botMove = bestMove.bestMove();


                    spot = document.getElementById(botMove);
                    _board[botMove] = "O";
                    spot.innerText = "O";

                    _gameOver("p2");
                    if(over) {
                        over = false;
                        return;
                    }
                    
                }                

            });
        })

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
        let j = 0;
        for(let i = 0; i <= _board.length; i++) {
            if(_board[i] != null) {
                j++;
                if(j == 9) {
                    over = true;
                    return true;
                }
            }
        }
    }

    const _gameOver = (player) => {
        if(_diagonal() || _vertical() || _horizontal()) {
            _roundWinner(player);
            setTimeout(() => {
                _reset()
            }, 800);
            over = true;
        } else if (_draw()) {
            setTimeout(() => {
                _reset()
            }, 800);
            over = true;
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

    const _roundWinner = (player) => {

        if(player == 'p1') {
            _p1Count++;
            _score1.innerText = _p1Count;
        } else if (player == 'p2') {
            
            _p2Count++;
            _score2.innerText = _p2Count;
        }
        player1.turn = true;
        _gameWinner();
    }

    const _endScore = document.getElementById("endScore");
    const _winner = document.getElementById("winner");
    const _refreshButton = document.getElementById("refreshButton");

    const _gameWinner = () => { 
        if(_p1Count == 3) {
            _endScore.setAttribute("style", "display: block;");
            _winner.innerText = "Congratulations! You've beat the bot!";
            _refreshButton.addEventListener("click", () => {_gameRefresh();});
            _squares.forEach((square) => {square.disabled = true;});
        } else if (_p2Count == 3) {
            _endScore.setAttribute("style", "display: block;");
            _winner.innerText = "You have been defeated! better luck next time";
            _refreshButton.addEventListener("click", () => {_gameRefresh();});
            _squares.forEach((square) => {square.disabled = true;});
        }
    }

    const _gameRefresh = () => {
        _p1Count = 0;
        _p2Count = 0;
        _score1.innerText = _p1Count;
        _score2.innerText = _p2Count;
        _endScore.setAttribute("style", "display: none;");
        _squares.forEach((square) => {square.disabled = false;});
    }

    return {playerInput}
    
})();

gamePlay.playerInput();

miniMax = (() => {
    const miniMax = (board) => {
        return 1;
    }

    return {miniMax}
})();

bestMove = (() => {

    const _board = gameBoard.board;

    const bestMove = () => {

        let bestScore = -Infinity;
        let bestMove;

        for(let i = 0; i < _board.length; i++) {
            
            if(_board[i] == null) {
                console.log(i);
                _board[i] = 'O';
                let score = miniMax.miniMax(_board);
                _board[i] = null;

                if(score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;


    }

    return {bestMove}

})();