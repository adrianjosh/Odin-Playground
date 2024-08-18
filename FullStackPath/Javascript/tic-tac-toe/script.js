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

    return {
        getBoard,
        resetBoard,
    };
})();