const game = (function () {
    const _board = document.querySelector("#board");
    const _out = document.querySelector("#out");
    const _reset = document.querySelector("#reset");

    const _player = function (symbol) {
        return { symbol };
    };

    const _playerX = _player("X");
    const _playerO = _player("O");
    let _won;
    let _playerXsTurn;

    const _gameBoard = (function () {
        let _board = [];
        const resetBoard = function () {
            _board = ["", "", "", "", "", "", "", "", ""];
        };
        const getBoard = function () {
            return _board;
        };
        const setBoard = function (idx, symbol) {
            _board[idx] = symbol;
        };
        resetBoard();
        return { resetBoard, getBoard, setBoard };
    })();

    const displayBoard = function () {
        _board.textContent = "";
        const board = _gameBoard.getBoard();
        for (let idx in board) {
            const div = document.createElement("div");
            div.setAttribute("data-idx", idx);
            div.textContent = board[idx];
            if (board[idx] !== "") {
                div.classList.add("filled");
            }
            if (_won === "") {
                div.addEventListener("click", (e) => {
                    const i = e.target.getAttribute("data-idx");
                    _makeMove(i);
                });
            } else {
                div.classList.add("disable");
            }
            _board.append(div);
        }
    };

    const _checkWin = function () {
        const board = _gameBoard.getBoard();
        if (
            (board[0] !== "" &&
                board[0] === board[1] &&
                board[1] === board[2]) ||
            (board[3] !== "" &&
                board[3] === board[4] &&
                board[4] === board[5]) ||
            (board[6] !== "" &&
                board[6] === board[7] &&
                board[7] === board[8]) ||
            (board[0] !== "" &&
                board[0] === board[3] &&
                board[3] === board[6]) ||
            (board[1] !== "" &&
                board[1] === board[4] &&
                board[4] === board[7]) ||
            (board[2] !== "" &&
                board[2] === board[5] &&
                board[5] === board[8]) ||
            (board[0] !== "" &&
                board[0] === board[4] &&
                board[4] === board[8]) ||
            (board[2] !== "" && board[2] === board[4] && board[4] === board[6])
        ) {
            _won = _playerXsTurn ? _playerX.symbol : _playerO.symbol;
        } else if (!board.includes("")) {
            _won = "tie";
        }
    };

    const _setCurrentPlayer = function () {
        _out.textContent = `Current player: ${
            _playerXsTurn ? _playerX.symbol : _playerO.symbol
        }`;
    };

    const _checkMove = function (idx) {
        return _gameBoard.getBoard()[idx] == "";
    };

    const _makeMove = function (idx) {
        if (!_checkMove(idx)) {
            return;
        }
        _reset.removeAttribute("disabled");
        _gameBoard.getBoard()[idx] = _playerXsTurn
            ? _playerX.symbol
            : _playerO.symbol;
        _checkWin();
        displayBoard();
        if (_won === "") {
            _playerXsTurn = !_playerXsTurn;
            _setCurrentPlayer();
        } else {
            _out.textContent =
                _won === _playerX.symbol
                    ? `Player ${_playerX.symbol} has won!`
                    : _won === _playerO.symbol
                    ? `Player ${_playerO.symbol} has won!`
                    : "It's a tie!";
        }
    };

    const _init = function () {
        _won = "";
        _playerXsTurn = true;
        _setCurrentPlayer();
        _gameBoard.resetBoard();
        displayBoard();
    };

    _reset.addEventListener("click", (e) => {
        _init();
    });
    _init();
    return { displayBoard };
})();
