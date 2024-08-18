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
        {name: 'Player', marker:'X'},
        {name: 'Computer', marker:'O'},
    ];

    const getParticipants = () => participant;

    return {
        getParticipants,
    }
})();


const GameController = (function() {
    const board = Gameboard.getBoard();
    const participants = Participants.getParticipants();

    let currentPlayer = participants[0];

    const switchTurn = () => {
        currentPlayer = currentPlayer === participants[0] ? participants[1] : participants[0];
    };

    function currentTurn(idx) {
        console.log(`${currentPlayer.name}'s turn`);

        if (board[idx] !== currentPlayer.marker) {
            board[idx] = currentPlayer.marker;

            const winner = Gameboard.checkWinner();
            const draw = Gameboard.isBoardFull();

            if (winner) {
                console.log(`${currentPlayer.name} wins!`);
            } else if (draw) {
                console.log(`It's a tie!`);
            } else {
                switchTurn();
            }
        }
        else {
            console.log('Tanga meron na dyan');
        }
    }

    return {
        currentTurn,
    }
})();