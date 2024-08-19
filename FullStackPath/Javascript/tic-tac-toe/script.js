const Gameboard = (function() {
    const board = [
        '','','',
        '','','',
        '','',''
    ];

    const getBoard = () => board;

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
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

const GameController = (function() {
    const board = Gameboard.getBoard();
    const participants = Participants.getParticipants();

    let currentPlayer;
    let gameState;

    function init() {
        Gameboard.resetBoard();
        currentPlayer = participants[0];
        gameState = 'playing';
    }

    const switchTurn = () => {
        currentPlayer = currentPlayer === participants[0] ? participants[1] : participants[0];
    };
    
    function currentTurn(idx, cell) {

        if (board[idx] === '' && gameState === 'playing') {
            board[idx] = currentPlayer.marker;
            cell.textContent = currentPlayer.marker;

            if (Gameboard.checkWinner()) {
                console.log(`${currentPlayer.name} wins!`);
                gameState = 'win';
            } else if (Gameboard.isBoardFull()) {
                console.log(`It's a tie!`);
                gameState = 'tie';
            } else {
                switchTurn();
            }
        }
    }

    return {
        currentTurn,
        init,
    }
})();

(function(){
    const buttonsContainer = document.querySelector('.buttons-container');

    buttonsContainer.addEventListener('click', function(event) {
        const cell = event.target;
        const idx = cell.getAttribute('data-index');

        if (idx !== null) {
            GameController.currentTurn(idx, cell);
        }
    });
})();

GameController.init();