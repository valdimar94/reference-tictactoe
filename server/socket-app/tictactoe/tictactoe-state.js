var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var isFull = false;
        var playerTurn = 'X';
        var board = new Array(9);

        function processEvent(event) {
            if (event.type=="GameJoined"){
                isFull = true;
            }
            if (event.type=="PlaceMove"){
                board[parseInt(event.placeAt, 10)] = event.side;
                togglePlayer();
            }

        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function isOccupied(placeAt) {
            return board[placeAt] != null;
        }

        function togglePlayer() {
            if (playerTurn == 'X'){
                playerTurn = 'O';
                return;
            }
            playerTurn = 'X';
        }

        function horizontalWin(event) {
            board[event.placeAt] = event.side;

            for (var i = 0; i < board.length; i+=3){
                if (board[i] == playerTurn && board[i+1] == playerTurn && board[i+2] == playerTurn){
                    return true;
                }
            }
            return false;
        }

        function diagonalWin(event) {
            board[event.placeAt] = event.side;

            if (board[0] == playerTurn && board[4] == playerTurn && board[8] == playerTurn){
                return true;
            }
            if (board[2] == playerTurn && board[4] == playerTurn && board[6] == playerTurn){
                return true;
            }
            return false;
        }

        function gameFull() {
            return isFull;
        }

        function isCurrentPlayerTurn(side) {
            if (side == playerTurn){
                return true;
            }
            return false;
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            isCurrentPlayerTurn: isCurrentPlayerTurn,
            isOccupied: isOccupied,
            horizontalWin: horizontalWin,
            diagonalWin: diagonalWin,
            processEvents: processEvents
        }
    };
};
