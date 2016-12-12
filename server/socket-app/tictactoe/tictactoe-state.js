var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var isFull = false;

        function processEvent(event) {
          if (event.type=="GameJoined"){
              isFull = true;
          }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull() {
            return isFull;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            processEvents: processEvents
        }
    };
};
