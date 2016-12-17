module.exports=function(injected){

    const io = require('socket.io-client');
    const RoutingContext = require('../../client/src/routing-context');
    const generateUUID = require('../../client/src/common/framework/uuid');

    var connectCount =0;

    function userAPI(){
        var waitingFor=[];
        var gameId = 0;
        var playerSide;

        var routingContext = RoutingContext(inject({
            io,
            env:"test"
        }));

        connectCount++;
        const me = {
            expectUserAck:(cb)=>{
                waitingFor.push("expectUserAck");
                routingContext.socket.on('userAcknowledged', function(ackMessage){
                    expect(ackMessage.clientId).not.toBeUndefined();
                    waitingFor.pop();
                });
                return me;
            },
            sendChatMessage:(message)=>{
                var cmdId = generateUUID();
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"chatCommand", message });
                return me;
            },
            expectChatMessageReceived:(message)=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('chatMessageReceived', function(chatMessage){
                    expect(chatMessage.sender).not.toBeUndefined();
                    if(chatMessage.message===message){
                        waitingFor.pop();
                    }
                });
                return me;
            },
            cleanDatabase:()=>{
                var cmdId = commandId++;
                routingContext.commandRouter.routeMessage({commandId:cmdId, type:"cleanDatabase"});
                return me;

            },
            waitForCleanDatabase:()=>{
                waitingFor.push("expectChatMessageReceived");
                routingContext.eventRouter.on('databaseCleaned', function(chatMessage){
                    waitingFor.pop();
                });
                return me;

            },
            createGame:()=>{
                me.gameId = generateUUID();
                var cmdId = generateUUID();
                me.playerSide = "X";
                routingContext.commandRouter.routeMessage({gameId:me.gameId, type:"CreateGame", commandId:cmdId});
                return me;
            },
            expectGameCreated:()=>{
                waitingFor.push("expectGameCreated");
                console.log("expectGameCreated")
                routingContext.eventRouter.on('GameCreated', function(){
                    waitingFor.pop();
                });
                return me;
            },

            expectGameJoined:()=>{
                waitingFor.push("expectGameJoined");
                console.log("expectgamejoined")
                routingContext.eventRouter.on('GameJoined', function(){
                    waitingFor.pop();
                });
                return me;
            },
            joinGame:(gameId)=>{
                var cmdId = generateUUID();
                me.playerSide = "O";
                me.gameId = gameId;
                console.log("joingame")
                routingContext.commandRouter.routeMessage({gameId:me.gameId, type:"JoinGame", commandId:cmdId});
                return me;
            },
            getGame:()=>{
              console.log("getgame")
                return me;
            },
            placeMove:(row, col)=>{
                var cord = row + col * 3;
                console.log(cord)
                var cmdId = generateUUID();
                console.log(me.playerSide)
                routingContext.commandRouter.routeMessage({gameId:me.gameId, type:"PlaceMove", commandId:cmdId, side:me.playerSide, placeAt:cord});
                return me;
            },
            expectMoveMade:()=>{
                waitingFor.push("expectMoveMade");
                console.log("expectmovemade")
                routingContext.eventRouter.on('MovePlaced', function(){
                    waitingFor.pop();
                });
                return me;
            },
            expectGameWon:()=>{
                //missing implementation
                waitingFor.push("expectGameWon");
                console.log("expectGameWon")
                routingContext.eventRouter.on('GameWon', function(){
                    waitingFor.pop();
                });
                return me;
            },
            then:(whenDoneWaiting)=>{
                function waitLonger(){
                    if(waitingFor.length>0){
                        setTimeout(waitLonger, 0);
                        return;
                    }
                    whenDoneWaiting();
                }
                waitLonger();
                return me;
            },
            disconnect:function(){
                routingContext.socket.disconnect();
            }

        };
        return me;

    }

    return userAPI;
};
