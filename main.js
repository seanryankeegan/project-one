document.addEventListener("DOMContentLoaded", function(event) {

var allNums = [[1,2,3,4,5,6,7,8,9,10], [11,12,13,14,15,16,17,18,19,20], [21,22,23,24,25,26,27,28,29,30], [31,32,33,34,35,36,37,38,39,40],[41,42,43,44,45,46,47,48,49,50]];

var player1nums = [];
var player2nums = [];

startGame();

// This function allows you to click the start button and populate the cards with random numbers.
function startGame() {
  var advanceButton = document.querySelector('#startButton');

  var listener =function() {
    makeCards();
    var buttonsArray = document.querySelectorAll('.inactive');
    for (var i = 0; i <buttonsArray.length; i++) {
      buttonsArray[i].className = "";
    }
    advanceButton.removeEventListener('click', listener);
    advanceButton.innerText ='Get next ball!';
    getNextBall();
  }
  advanceButton.addEventListener('click', listener);
  bingoButtonsInit();
}

// This function sets off the process of checking for a winner when the user clicks "Bingo" button.
function bingoButtonsInit () {
  var p1Button = document.querySelector('#p1button');
  p1Button.addEventListener('click', function() {
    horizontalWinner(1);
  })
  var p2Button = document.querySelector('#p2button');
  p2Button.addEventListener('click', function() {
    horizontalWinner(2);
  })
}


//This function stores the numbers of each players cards in arrays.
//These arrays are parsed through later to find out which of the users boxes
//should be made clickable.
function getPlayerNums () {
  var playerNums = [[],[],[],[],[]];
  for (var i = 0; i < 5; i++) {
      for(var j = 0; j < 5; j++) {
            playerNums[i].push(allNums[i][j+1]);
            }
  }
    return playerNums;
}

//This function removes the previous main ball display to allow for the
//most recent ball to be the only one that shows up in the main display.
function removeBall() {
  var divContainingBall = document.querySelector('#placeBall');
  var ballToRemove = document.querySelector('.ball');
  divContainingBall.removeChild(ballToRemove);
}


// This function allows the user to push the next ball button and have a new one pop up.
function getNextBall() {
  var nextBall = document.querySelector('#startButton');
  nextBall.className = "";
  nextBall.addEventListener('click', function(){

  removeBall();
  showLastBall();
  });
}


// This function places the most recent main ball in a display at the bottom so users can see all the balls
// that have popped up to that point.
function displayAllBalls(number) {
  var ballBackground = document.createElement("div");
  ballBackground.className = "smallBall";

  var whereBallGoes = document.querySelector('#allBallsDisplayed');
  whereBallGoes.appendChild(ballBackground);

  var ballText = document.createElement("p");
  ballText.innerHTML = number;
  ballText.id = "smallBallPara";

  ballBackground.appendChild(ballText);
}


// This function places the most recent randomly generated ball in the main ball display.  It also calls the
// check for match function which makes the users boxes clickable if there's a match.
function showLastBall() {
  var number = getRandomBall();
  var ballBackground = document.createElement("div");
  ballBackground.className = "ball";

  var whereBallGoes = document.querySelector('#placeBall');
  whereBallGoes.appendChild(ballBackground);

  var ballText = document.createElement("p");
  ballText.innerHTML = number;
  ballText.id = "ballPara";

  ballBackground.appendChild(ballText);

  displayAllBalls(number);
  checkForMatch(number);
}

// This functin parses through each players arrays of data to see if there's a match between the main ball
// and one of their numbers.  If there is, it finds the corresponding id of the div the user's number is in
// and makes that box clickable for the user.
function checkForMatch(ballValue) {
  for(var i = 0; i < 5; i++) {
    for(j = 0; j < 5; j++) {

      if (player1nums[i][j] === ballValue) {
          makeClickable(1,j+1,i+1);
        }

        if (player2nums[i][j] === ballValue) {
          makeClickable(2,j+1,i+1);
        }
    }
  }
}

// This function provides the players with a randomly generated number from 1-50;
function getRandomBall() {
  return Math.floor(Math.random() * (50) + 1);
  }




// This function shuffles the original set of 50 numbers and places them into the users cards.  It shuffles the
// numbers a second time before assigning player 2's card numbers.  This ensures the players have different cards.
function makeCards () {

// Shuffle the numbers arrays.
  for (var i =0; i < allNums.length; i++) {
    shuffle(allNums[i]);
  }
  player1nums = getPlayerNums();


// Assign random numbers to player 1's cards.
  for (var i = 1; i < 6; i++) {
    for(var j = 1; j < 6; j++) {
    newNum = document.createElement("p");
    newNum.innerText = allNums[i-1][j]
    var box = document.querySelector('#p1r' + [j] + 'c'+[i]);
    box.appendChild(newNum);
    }
  }

  // Shuffle the numbers arrays again.  This is so there can be some overlapping numbers.
    for (var i = 0; i < allNums.length; i++) {
      shuffle(allNums[i]);
    }
    player2nums = getPlayerNums();

  // Assign random numbers to player 2's cards.
    for (var i = 1; i < 6; i++) {
      for(var j = 1; j < 6; j++) {
      newNum = document.createElement("p");
      newNum.innerText = allNums[i-1][j]
      var box = document.querySelector('#p2r' + [j] + 'c'+[i]);
      box.appendChild(newNum);
      }
    }
  showLastBall();
}

// This function makes the correct players box clickable if a match is found.
function makeClickable(player, row, column) {
  var found = document.querySelector('#p'+player+'r'+row+'c'+column);
  var listener = function() {
    found.removeEventListener('click', listener);
    found.className += " clicked";
  }
  found.addEventListener('click', listener);
}

// This function checks whichever player clicked "BINGO" to see if they have a horizontal Bingo.  If not, the function
// calls on the verticalWinner function to check for vertical Bingos.
function horizontalWinner(num) {
  var count = 0;
  for (var j = 1; j < 6; j++) {
    for (var i = 1; i < 6; i++) {
      var row = document.querySelector('#p'+num+'r'+j+'c'+i);
      var classes = row.classList;
        if (classes[3] == "clicked"){
          count += 1;

          if(count == 5) {
            gameOver(num);
            return;
          }
        }
      }
      count = 0;
    }
    verticalWinner(num);
  }

// Checks for a vertical bingo if a horizontal bingo is not found.  If no vertical Bingo is found,
// this function calls the last search for a bingo, the diagonalWinner function.
function verticalWinner(num) {
  var count = 0;
  for (var j = 1; j < 6; j++) {
    for (var i = 1; i < 6; i++) {
      var col = document.querySelector('#p'+num+'r'+i+'c'+j);
      var colClasses = col.classList;
      if (colClasses[3] == 'clicked') {
        count += 1;
        if(count == 5) {
          gameOver(num);
          return;
        }
      }
    }
  count = 0;
  }
  diagonalWinner(num);
}

// This function checks for both types of diagonal bingos.  If none is found, it alerts the user they need
// to relax and they don't have Bingo.
function diagonalWinner(num) {

  // TESTING FOR TOP LEFT --> BOTTOM RIGHT BINGO
  var count = 0;
  for(var i = 1; i < 6; i++) {
    var diag = document.querySelector('#p'+num+'r'+i+'c'+i);
    var diagClasses = diag.classList;
    if (diagClasses[3] == 'clicked') {
      count += 1;
      if(count == 5) {
        gameOver(num);
        return;
      }
    }
  }

  // TESTING FOR BOTTOM LEFT --> TOP RIGHT BINGO
  var count = 0;
  for(var j = 5, i = 1; j > 0; i++, j--) {
    var diag = document.querySelector('#p'+num+'r'+i+'c'+j);
    var diagClasses = diag.classList;
    if (diagClasses[3] == 'clicked') {
      count += 1;
      if(count == 5) {
        gameOver(num);
        return;
      }
    }
  }
  alert("You don't have Bingo yet, relax....")
}


function gameOver (player) {
  if (player == 1) {
    var winMessage = document.querySelector('#player1');
    winMessage.innerText = "Player " + player +" wins!";
    var loseMessage = document.querySelector('#player2');
    loseMessage.innerText = "Player 2 loses!";
  } else {
    var winMessage = document.querySelector('#player2');
    winMessage.innerText = "Player 2 wins!";
    var loseMessage = document.querySelector('#player1');
    loseMessage.innerText = "Player 1 loses!";
  }

  var resetButton = document.querySelector('#startButton');
  resetButton.innerText = "Play again?";
  resetButton.addEventListener("click", function() {
    window.location.reload();
  })

}




//This function was copied from http://stackoverflow.com/questions/15585216/how-to-randomly-generate-numbers-without-repetition-in-javascript
// It shuffles the arrays of numbers to allow for randomness.
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


});
