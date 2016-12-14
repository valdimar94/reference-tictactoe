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
                board[event.placeAt] = event.side;
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
        // If any of the three win conditions are met, this function returns true
        function winConditions(event) {
            return (horizontalWin(event) || diagonalWin(event) || verticalWin(event));
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

        function verticalWin(event){
            board[event.placeAt] = event.side;

            for (var i = 0; i < board.length-6; i++){
                if (board[i] == playerTurn && board[i+3] == playerTurn && board[i+6] == playerTurn){
                    return true;
                }
            }
            return false;
        }
        // If any place in the board is null, it cannot be a draw
        function isDraw(event){
            board[event.placeAt] = event.side;

            for (var i = 0; i < board.length; i++){
                if (board[i] == null){
                    return false;
                }
            }
            return true;
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
            winConditions: winConditions,
            isDraw: isDraw,
            processEvents: processEvents
        }
    };
};
