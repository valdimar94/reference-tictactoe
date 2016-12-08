## Test Examples for tictactoe

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

# Example 4 - legal player move

* **Given** that a game exists, player X and player O have joined and game board is clear
* **When** player X places at [0, 0]
* **Then** X is placed at the specified coordinates

# Example 5 - illegal player move

* **Given** that a game exists, player X and player O have joined and X has been placed at [0, 0]
* **When** player O places at [0, 0]
* **Then** O is not placed at the given coordinates, player O is notified that this is an illegal move and will be prompted to place O again

# Example 6 - out of turn player move

* **Given** that a game exists, player X and player O have joined and X has been placed at [0, 0]
* **When** player X places at [0, 1] before O has made his move
* **Then** X is not placed at the given coordinates, player X is notified that he is trying to make a move out of turn and will need to wait until player O has made his move

# Example 7 - player win move horizontal

* **Given** that a game exists, player X and player O have joined and X occupies [0, 0], [0, 1] and O occupies [2, 2], [1, 0]
* **When** player X places at [0, 2]
* **Then** X is placed at the specified coordinates and player X wins the game

# Example 8 - player win move vertical

* **Given** that a game exists, player X and player O have joined and X occupies [0, 0], [0, 1], [1, 1] and O occupies [2, 2], [2, 1]
* **When** player O places at [2, 0]
* **Then** O is placed at the specified coordinates and player O wins the game

# Example 9 - player win move across

* **Given** that a game exists, player X and player O have joined and X occupies [0, 0], [1, 1] and O occupies [1, 2], [1, 0]
* **When** player X places at [2, 2]
* **Then** X is placed at the specified coordinates and player X wins the game

# Example 10 - game is draw

* **Given** that a game exists, player X and player O have joined and X occupies [1, 0], [1, 1], [0, 2], [2, 2] and O occupies [0, 0], [0, 2], [0, 1], [1, 2]
* **When** player X places at [2, 1]
* **Then** X is placed at the specified coordinates and the game is draw
