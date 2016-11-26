module.exports=function(injected){
    const socketIo = injected('io');
    const messageRouter = injected('messageRouter');
    return {
        dispatchThroughIo(routingKey, socketVerb, conditionFn){
            socketVerb = socketVerb || 'eventIssued';
            conditionFn = conditionFn || function(){
                return true;
            };
            messageRouter.on(routingKey, (messageObj)=>{
                if(conditionFn(messageObj)){
//                    console.debug("Emitting " + socketVerb + " ->", messageObj);
                    socketIo.emit(socketVerb, messageObj);
                }
            })
        }
    };
};

