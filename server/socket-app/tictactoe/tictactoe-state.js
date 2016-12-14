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

        function togglePlayer() {
            if (playerTurn == 'X'){
                playerTurn = 'O';
                return;
            }
            playerTurn = 'X';
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
            isCurrentPlayerTurn: isCurrentPlayerTurn,
            gameFull: gameFull,
            processEvents: processEvents
        }
    };
};
