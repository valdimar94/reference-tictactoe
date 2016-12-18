
module.exports = function(injected){
    var TictactoeState = injected('TictactoeState');

    return function(history){

        var gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){

                var cmdHandlers = {
                    "CreateGame": function (cmd) {
                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.gameFull()){
                            eventHandler( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    // For the move functions, both the move and win conditions are checked here.
                    // This is because win conditions are technically checked before either X or
                    // O are placed.
                    // winConditions checks all three functions that check if the player has won
                    // the game, horizontal, vertical and diagonally.
                    // If none of the if statements are performed, MovePlaced is performed.
                    "PlaceMove": function(cmd){

                        if(!gameState.isCurrentPlayerTurn(cmd.side)){
                            eventHandler( [{
                                gameId: cmd.gameId,
                                type: "OutOfTurnMoveAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                side: cmd.side
                            }]);
                            return;
                        }
                        if(gameState.isOccupied(cmd.placeAt)){
                            eventHandler( [{
                                gameId: cmd.gameId,
                                type: "IllegalMoveIsOccupied",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                side: cmd.side
                            }]);
                            return;
                        }

                        var event = [{
                            gameId: cmd.gameId,
                            type: "MovePlaced",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            placeAt: cmd.placeAt,
                            side: cmd.side
                        }];
                        gameState.processEvents(event);

                        if(gameState.winConditions(cmd)){
                            event.push({
                                gameId: cmd.gameId,
                                type: "GameWon",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp,
                                side: cmd.side
                            });
                        }
                        else if(gameState.isDraw(cmd)){
                            event.push({
                                gameId: cmd.gameId,
                                type: "GameDraw",
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            });
                        }
                        eventHandler(event);
                    }
                };

                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};
