const gameBoard = (() => {
    const board = new Array(9);

    return {board};
})();


const gamePlay = (() => {

    let counter = 0;
    let _squares = document.querySelectorAll(".square");
    const _board = gameBoard.board;


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
                    if(_gameOver('p1') == 'p1') {
                        _roundWinner('p1');
                        setTimeout(() => {
                            _reset()
                        }, 800);

                        return;
                    } else if (_gameOver('p1') == 'tie') {
                        setTimeout(() => {
                            _reset()
                        }, 800);

                        return;
                    }

                    if(counter == 2) {
                        botMove = bestMove.randMove();
                    } else {
                        botMove = bestMove.bestMove();
                    }



                    spot = document.getElementById(botMove);
                    _board[botMove] = "O";
                    spot.innerText = "O";

                    if(_gameOver('p2') == 'p2') {
                        _roundWinner('p2');
                        setTimeout(() => {
                            _reset()
                        }, 800);
                        return;
                    } else if (_gameOver('p2') == 'tie') {
                        setTimeout(() => {
                            _reset()
                        }, 800);
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
                    return true;
                }
            }
        }
    }

    const increment = () => {
        if(counter == 2) {
            counter = 0;
        } else {
            counter++;
        }
    }

    const _gameOver = (player) => {
        if(_diagonal() || _vertical() || _horizontal()) {
            return player;
        } else if (_draw()) {
            return 'tie';
        } else {
            return null;
        }


    }

    const _reset = () => {
        console.log(counter);
        increment();
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
        _gameWinner();
    }

    const _endScore = document.getElementById("endScore");
    const _winner = document.getElementById("winner");
    const _refreshButton = document.getElementById("refreshButton");

    const _gameWinner = () => { 
        if(_p1Count == 3) {
            _endScore.setAttribute("style", "display: block;");
            _winner.innerText = "Congratulations - You have conquered the machine";
            _refreshButton.addEventListener("click", () => {_gameRefresh();});
            _squares.forEach((square) => {square.disabled = true;});
        } else if (_p2Count == 3) {
            _endScore.setAttribute("style", "display: block;");
            _winner.innerText = "You have been defeated by the machine";
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

    return {playerInput, _gameOver, counter}
    
})();

gamePlay.playerInput();

miniMax = (() => {
    const miniMax = (board, depth, isMaximising) => {

        let scores = {
            p1: 1,
            p2: -1,
            tie: 0
        }

        let result;
        
        if(!isMaximising) {
            result = gamePlay._gameOver('p1');
        } else {
            result = gamePlay._gameOver('p2');
        }
        


        if(result != null) {
            return scores[result];

        }

        if(isMaximising) {

            let bestScore = -Infinity;
    
            for(let i = 0; i < board.length; i++) {
                
                if(board[i] == null) {
                    board[i] = 'X';
                    let score = miniMax(board, depth + 1, false);
                    board[i] = null;
    
                    if(score > bestScore) {
                        bestScore = score;
                    }
                }
            }

            return bestScore;
        } else {
            let bestScore = Infinity;
    
            for(let i = 0; i < board.length; i++) {
                if(board[i] == null) {
                    board[i] = 'O';
                    let score = miniMax(board, depth + 1, true);
                    board[i] = null;
                    if(score < bestScore) {
                        bestScore = score;
                    }
                }
            }
    
            return bestScore;
        }
    }

    return {miniMax}
})();

bestMove = (() => {

    const _board = gameBoard.board;

    const bestMove = () => {

        let bestScore = Infinity;
        let bestMove;

        for(let i = 0; i < _board.length; i++) {
            
            if(_board[i] == null) {
                _board[i] = 'O';
                let score = miniMax.miniMax(_board, 0, true);
                _board[i] = null;

                if(score < bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;


    }

    const randMove = () => {
        let randMove = Math.floor(Math.random()*_board.length);
        if(_board[randMove] != null) {
            for(let i = 0; i < _board.length; i++) {
                randMove = Math.floor(Math.random()*_board.length);
                if(_board[randMove] == null) {
                    break;
                }
            }
        }
        return randMove;
    }

    return {bestMove, randMove}

})();