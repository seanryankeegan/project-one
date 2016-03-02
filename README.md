Pseudo Code/Brain Storming

Create a page with several divs to break it up.  
  - one row for the Header and instructions
  - one row to contain the game boards
      * within gameBoard row, have two columns to situate the game boards
  - one row with three buttons (player1 bingo, start/reset, player2 bingo)
  - one row with a container div to hold all of the numbers drawn.

For the gameboard, I'm thinking of creating a 6x5 table and designating each cell with an id such as p1r1c1 (this would be player1 board, row 1 column 1 cell.)
  - This would get populated by a series of random number generators running.  
  - To avoid repeats, I'm thinking of using an array that contains 1-10, shuffilng the numbers, and applying
      the first 5 elements in the array to the first column of the table.  And a similar process for the other columns.
  - Then have a function tht creates a random nubmer between 1-50.  It checks all elements in both gameboards to see if there's a match.  If there is a match, it should add a click event listener
      to a match that it finds, allowing it to be clicked.
  - A number on the gameboard being clicked will add a class that says "clicked" or something.  This will style the game in some way to show it's been clicked.  
  - After a random number is generated, it will appear in the "balls drawn" section, so that the user can check their board.
  - Create a "checkForWin" function. This will check the player who clicked's board.  Still working out the verifying win function.  I think for diagnoals it will be easy but tedious.
      * Diagonal check (if player1[0][0].classList == "clicked" && player1[1][1].classList == "clicked" && ... && player1[4][4].classList == "clicked") {return winner}
      * To check rows and columns, I'll have a series of for loops checking to see if what has classList of "clicked" and a counter to keep track of how many there are.  If counter = 5, winner!
  - If a winner is determined, have something pop up that says "Player x wins! Click restart to play again!"
