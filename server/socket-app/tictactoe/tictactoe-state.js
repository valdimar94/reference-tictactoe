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
            if (event.type=="MovePlaced"){
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
            }
            else {
                playerTurn = 'X';
            }
        }
        // If any of the three win conditions are met, this function returns true
        function winConditions(event) {
            return (horizontalWin(event) || diagonalWin(event) || verticalWin(event));
        }

        function horizontalWin(event) {

            for (var i = 0; i < board.length; i+=3){
                if (board[i] == event.side && board[i+1] == event.side && board[i+2] == event.side){
                    return true;
                }
            }
            return false;
        }

        function diagonalWin(event) {

            if (board[0] == event.side && board[4] == event.side && board[8] == event.side){
                return true;
            }
            if (board[2] == event.side && board[4] == event.side && board[6] == event.side){
                return true;
            }
            return false;
        }

        function verticalWin(event){

            for (var i = 0; i < board.length-6; i++){
                if (board[i] == event.side && board[i+3] == event.side && board[i+6] == event.side){
                    return true;
                }
            }
            return false;
        }
        // If any place in the board is null, it cannot be a draw
        function isDraw(event){

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
            if (side != playerTurn){
                return false;
            }
            return true;
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
