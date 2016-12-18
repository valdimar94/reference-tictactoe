const io = require('socket.io-client');
const RoutingContext = require('../client/src/routing-context');
var UserAPI = require('./fluentapi/user-api');
var TestAPI = require('./fluentapi/test-api');

const userAPI = UserAPI(inject({
    io,
    RoutingContext
}));

const testAPI = TestAPI(inject({
    io,
    RoutingContext
}));

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('User tictactoe game loadtest', function(){


    beforeEach(function(done){
        var testapi = testAPI();
        testapi.waitForCleanDatabase().cleanDatabase().then(()=>{
            testapi.disconnect();
            done();
        });
    });

    const count = 100;
    const timelimit = 30000;

    it('should play ' + count + ' games of tictactoe within '+ timelimit +'ms',function(done){

        var startMillis = new Date().getTime();

        var userA;
        var userB;
        var users=[];
        for(var i=0; i<count; i++){
            userA = userAPI("User#" + i);
            userB = userAPI("User#" + i);
            users.push(userA);
            users.push(userB);
            userA.createGame().then(()=> {
                    userB.joinGame(userA.getGame().gameId).then(function () {
                        userA.placeMove(0, 0).then(()=> {
                            userB.placeMove(1, 0).then(()=> {
                                userA.placeMove(1, 1).then(()=> {
                                    userB.placeMove(0, 2).then(()=> {
                                        userA.placeMove(2, 2); // Winning move
                                    })
                                })
                            });
                        })
                    })
                }
            );
        }

        userA = userAPI("Final userA");
        userB = userAPI("Final userB");
        userA.expectGameCreated().createGame().then(()=> {
                userB.expectGameJoined().joinGame(userA.getGame().gameId).then(function () {
                    userA.expectMoveMade().placeMove(0, 0).then(()=> {
                        userA.expectMoveMade();
                        userB.expectMoveMade().placeMove(1, 0).then(()=> {
                            userB.expectMoveMade(); // By other user
                            userA.expectMoveMade().placeMove(1, 1).then(()=> {
                                userA.expectMoveMade(); // By other user
                                userB.expectMoveMade().placeMove(0, 2).then(()=> {
                                    userB.expectMoveMade(); // By other user
                                    userA.expectMoveMade().placeMove(2, 2)
                                        .expectGameWon().then(function(){
                                            userA.disconnect();
                                            userB.disconnect();
                                            _.each(users, function(usr){
                                                usr.disconnect();
                                            });

                                            var endMillis = new Date().getTime();
                                            var duration = endMillis - startMillis;
                                            console.log(duration);
                                            if(duration > timelimit){
                                                done.fail(duration + " exceeds limit " + timelimit);
                                            } else {
                                                done();

                                            }
                                        });
                                })
                            })
                        });
                    })
                })
            }
        );
    });
});
