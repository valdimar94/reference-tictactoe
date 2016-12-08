## Test Examples for tictactoe

# Board placement explanation
The board for the examples below use this explanation for the board:
  __0 1 2__
0|__
1|
2|

# Example 1 - create game

* **Given** that a game has not been created
* **When** create game command is entered
* **Then** new game event is created

# Example 2 - join game

* **Given** that a game exists and is not full(room for new player)
* **When** player enters join game command
* **Then** player joins game

# Example 3 - join game

* **Given** that a game exists and is full(no room for player)
* **When** player enters join game command
* **Then** player will not join game and game will display to the player that the game is full

# Example 4 - player move

* **Given** that a game exists, player X and player O have joined and game board is clear
* **When** player X places []
* **Then** new game event is created
