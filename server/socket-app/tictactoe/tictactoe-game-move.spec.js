var should = require("should");
var _ = require("lodash");

var TictactoeState = require("./tictactoe-state")(inject({}));

var tictactoe = require("./tictactoe-handler")(inject({
    TictactoeState
}));

describe("move game command", function() {

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


  it("should place X at [0, 0]", function () {

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
          side:"O"
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
          placeAt: "0",
          side:"X"
      };
      then = [
      {
          type: "MovePlaced",
          user: {
              userName: "TheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          placeAt: "0",
          side:"X"
      }
      ];

  });

  it("should place O at [1, 1]", function () {

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
          side:"O"
      },
      {
          type: "PlaceMove",
          user: {
              userName: "TheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          placeAt: "0",
          side:"X"
      }
      ];
      when =
      {
          type: "PlaceMove",
          user: {
              userName: "NotTheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:31:29",
          placeAt: "4",
          side:"O"
      };
      then = [
      {
          type: "MovePlaced",
          user: {
              userName: "NotTheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:31:29",
          placeAt: "4",
          side:"O"
      }
      ];

  });


    it("should give OutOfTurnMoveAttempted", function () {

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
            side:"O"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "0",
            side:"X"
        }
        ];
        when =
        {
            type: "PlaceMove",
            user: {
                userName: "NotTheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            placeAt: "4",
            side:"X"
        };
        then = [
        {
            type: "OutOfTurnMoveAttempted",
            user: {
                userName: "NotTheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side:"X"
        }
        ];

    });

  it("should give IllegalMoveIsOccupied", function () {

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
          side:"O"
      },
      {
          type: "PlaceMove",
          user: {
              userName: "TheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:30:29",
          placeAt: "0",
          side:"X"
      }
      ];
      when =
      {
          type: "PlaceMove",
          user: {
              userName: "NotTheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:31:29",
          placeAt: "0",
          side:"O"
      };
      then = [
      {
          type: "IllegalMoveIsOccupied",
          user: {
              userName: "NotTheDude"
          },
          name: "TheFirstGame",
          timeStamp: "2014-12-02T11:31:29",
          side:"O"
      }
      ];
    });


    it("should give GameWon as player wins horizontally", function () {

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
            side:"O"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "0",
            side:"X"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "NotTheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "3",
            side:"O"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "1",
            side:"X"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "NotTheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "4",
            side:"O"
        }
        ];
        when =
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            placeAt: "2",
            side:"X"
        };
        then = [
        {
            type: "GameWon",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side:"X"
        }
        ];
    });

    it("should give GameWon as player wins diagonally", function () {

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
            side:"O"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "0",
            side:"X"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "NotTheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "1",
            side:"O"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "4",
            side:"X"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "NotTheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "5",
            side:"O"
        }
        ];
        when =
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            placeAt: "8",
            side:"X"
        };
        then = [
        {
            type: "GameWon",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side:"X"
        }
        ];
    });

    it("should give GameWon as player wins vertically", function () {

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
            side:"O"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "0",
            side:"X"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "NotTheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "1",
            side:"O"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "3",
            side:"X"
        },
        {
            type: "PlaceMove",
            user: {
                userName: "NotTheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29",
            placeAt: "5",
            side:"O"
        }
        ];
        when =
        {
            type: "PlaceMove",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            placeAt: "6",
            side:"X"
        };
        then = [
        {
            type: "GameWon",
            user: {
                userName: "TheDude"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:31:29",
            side:"X"
        }
        ];
    });
});
