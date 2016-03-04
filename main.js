document.addEventListener("DOMContentLoaded", function(event) {
startGame();

var allNums = [[1,2,3,4,5,6,7,8,9,10], [11,12,13,14,15,16,17,18,19,20], [21,22,23,24,25,26,27,28,29,30], [31,32,33,34,35,36,37,38,39,40],[41,42,43,44,45,46,47,48,49,50]];

var player1nums = [];
var player2nums = [];

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
}


function removeBall() {
  var divContainingBall = document.querySelector('#placeBall');
  var ballToRemove = document.querySelector('.ball');
  divContainingBall.removeChild(ballToRemove);
}


function getNextBall() {
  var nextBall = document.querySelector('#startButton');
  nextBall.className = "";
  nextBall.addEventListener('click', function(){

  removeBall();
  showLastBall();
  });
}

// TODO WORKING ON THIS FUNCTION OF DISPLAYING ALL THE BALLS!

// function displayAllBalls(number) {
//
//   var ballBackground = document.createElement("div");
//   ballBackground.className = "smallBall";
//
//   var whereBallGoes = document.querySelector('#allBallsDisplayed');
//   whereBallGoes.appendChild(ballBackground);
//
//   var ballText = document.createElement("p");
//   ballText.innerHTML = number;
//   ballText.id = "smallBallPara";
//
//   ballBackground.appendChild(ballText);
//   console.log("ballText is: ", ballText)
//
// }



function getPlayerNums () {
  var playerNums = [[],[],[],[],[]];
  for (var i = 0; i < 5; i++) {
      for(var j = 0; j < 5; j++) {
            playerNums[i].push(allNums[i][j+1]);
            }
  }
    // console.log(playerNums);
    return playerNums;
}


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
  console.log("ballText is: ", ballText)

  // displayAllBalls(number);
  checkForMatch(number);
}


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


function getRandomBall() {
  return Math.floor(Math.random() * (50) + 1);
  }





function makeCards () {

// Shuffle the numbers arrays.
  for (var i =0; i < allNums.length; i++) {
    shuffle(allNums[i]);
  }
  player1nums = getPlayerNums();
  console.log(player1nums);



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
console.log(player2nums);

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


function makeClickable(player, row, column) {
  var found = document.querySelector('#p'+player+'r'+row+'c'+column);
  var listener = function() {
    found.removeEventListener('click', listener);
    found.className += " clicked";
  }
  found.addEventListener('click', listener);
}


//This function was copied from http://stackoverflow.com/questions/15585216/how-to-randomly-generate-numbers-without-repetition-in-javascript
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


});
