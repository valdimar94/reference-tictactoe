var should = require('should');
var _ = require('lodash');

var TictactoeState = require('./tictactoe-state')(inject({}));

var tictactoe = require('./tictactoe-handler')(inject({
    TictactoeState
}));

describe('move game command', function() {

  var given, when, then;

  beforeEach(function () {
      given = undefined;
      when = undefined;
      then = undefined;
  });

  afterEach(function () {
      tictactoe(given).executeCommand(when, function (actualEvents) {
          should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
      });
  });


  it('should place X at [0, 0]', function () {

      given = [
      {
          type: "GameCreated",
          user: {
              userName: "TheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29"
      },
      {
          type: "GameJoined",
          user: {
              userName: "NotTheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:29:29",
          side:'O'
      }
      ];
      when =
      {
          type: "PlaceMove",
          user: {
              userName: "TheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          placeAt: "[0, 0]",
          side:'X'
      };
      then = [
          {
              type: "MovePlaced",
              user: {
                  userName: "TheDude"
              },
              name: "TheFirstGame",
              timeStamp: "2014-12-02T11:30:29",
              placeAt: "[0, 0]",
              side:'X'
          }
      ];

  });

});
