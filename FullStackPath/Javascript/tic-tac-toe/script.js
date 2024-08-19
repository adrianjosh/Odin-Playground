const Gameboard = (function() {
    const board = [
        '','','',
        '','','',
        '','',''
    ];

    const getBoard = () => board;

    function resetBoard() {
        const cells = document.querySelectorAll('.buttons-container div');

        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    }

    function isBoardFull() {
        return board.every(cell => cell !== '');
    }

    return {
        getBoard,
        resetBoard,
        checkWinner,
        isBoardFull,
    };
})();

const Participants = (function() {
    const participant = [
        {name: 'Player 1', marker:'X'},
        {name: 'Player 2', marker:'O'},
    ];

    const getParticipants = () => participant;

    return {
        getParticipants,
    }
})();

const scoreBoard = (function() {
    const playerOneElement = document.querySelector('#player-one-score');
    const drawElement = document.querySelector('#draw-score');
    const playerTwoElement = document.querySelector('#player-two-score');

    let playerOneScore = 0;
    let drawScore = 0;
    let playerTwoScore = 0;

    function updateScore(winner) {
        if (winner === 'X') {
            playerOneScore++;
            playerOneElement.textContent = playerOneScore;
        } else if (winner === 'O') {
            playerTwoScore++;
            playerTwoElement.textContent = playerTwoScore;
        } else if (winner === 'tie') {
            drawScore++;
            drawElement.textContent = drawScore;
        }
    }

    function resetScores() {
        playerOneScore = 0;
        drawScore = 0;
        playerTwoScore = 0;
        playerOneElement.textContent = playerOneScore;
        drawElement.textContent = drawScore;
        playerTwoElement.textContent = playerTwoScore;
    }

    return {
        updateScore,
        resetScores,
    }
})();

const GameController = (function() {
    const board = Gameboard.getBoard();
    const participants = Participants.getParticipants();

    let currentPlayer;
    let gameState;

    function init() {
        Gameboard.resetBoard();
        currentPlayer = participants[0];
        commentator(`${currentPlayer.name}'s Turn`);
        gameState = 'playing';
    }

    const switchTurn = () => {
        currentPlayer = currentPlayer === participants[0] ? participants[1] : participants[0];
    };
    
    function currentTurn(idx, cell) {

        if (board[idx] === '' && gameState === 'playing') {
            board[idx] = currentPlayer.marker;
            cell.textContent = currentPlayer.marker;

            const winner = Gameboard.checkWinner();
            if (winner) {
                scoreBoard.updateScore(winner);
                commentator(`${currentPlayer.name} Won!`);
                gameState = 'not_playing';
            } else if (Gameboard.isBoardFull()) {
                scoreBoard.updateScore('tie');
                gameState = 'not_playing';
                commentator(`It's a Tie!`);
            } else {
                switchTurn();
                commentator(`${currentPlayer.name}'s Turn`);
            }
        }
    }

    function commentator(message) {
        const p = document.querySelector('#commentator');
        p.textContent = `${message}`;
    }

    return {
        currentTurn,
        init,
    }
})();

(function Actions(){
    const btnsContainer = document.querySelector('.buttons-container');
    const btnResetBoard = document.querySelector('#reset-board');
    const btnResetScores = document.querySelector('#reset-scores');

    btnsContainer.addEventListener('click', function(event) {
        const cell = event.target;
        const idx = cell.getAttribute('data-index');

        if (idx !== null) {
            GameController.currentTurn(idx, cell);
        }
    });

    btnResetBoard.addEventListener('click', GameController.init);
    btnResetScores.addEventListener('click', scoreBoard.resetScores);
})();

GameController.init();