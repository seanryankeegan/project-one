window.onload = function () {

startGame();

var allNums = [[1,2,3,4,5,6,7,8,9,10], [11,12,13,14,15,16,17,18,19,20], [21,22,23,24,25,26,27,28,29,30], [31,32,33,34,35,36,37,38,39,40],[41,42,43,44,45,46,47,48,49,50]];



function startGame() {
  var startButton = document.querySelector('#startButton');
  var listener =function() {
    console.log(startButton);
    makeCards();
    var buttonsArray = document.querySelectorAll('.inactive');
    for (var i = 0; i <buttonsArray.length; i++) {
      buttonsArray[i].className = "";
    }
    startButton.removeEventListener('click', listener);
    startButton.className ='inactive';
  }
  startButton.addEventListener('click', listener);
}

function getPlayerNums () {
  var playerNums = [[],[],[],[],[]];
  for (var i = 0; i < allNums.length; i++) {
      for(var j = 0; j < allNums.length; j++) {
            playerNums[i].push(allNums[i][j]);
            }
  }
    return playerNums;
}




function getRandomBall() {
  Math.floor(Math.random() * (9) + 1);
}


function makeCards () {

// Shuffle the numbers arrays.
  for (var i = 0; i < allNums.length; i++) {
    shuffle(allNums[i]);
  }

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

  // Assign random numbers to player 2's cards.
    for (var i = 1; i < 6; i++) {
      for(var j = 1; j < 6; j++) {
      newNum = document.createElement("p");
      newNum.innerText = allNums[i-1][j]
      var box = document.querySelector('#p2r' + [j] + 'c'+[i]);
      box.appendChild(newNum);
      }
    }

}

var player1nums = [];
var player2nums = [];



function makeCards () {

// Shuffle the numbers arrays.
  for (var i = 0; i < allNums.length; i++) {
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
    console.log(player1nums);
    console.log(player2nums);
}



function getNumber () {
  Math.floor(Math.random() * (50) + 1);
}


//This function was copied from http://stackoverflow.com/questions/15585216/how-to-randomly-generate-numbers-without-repetition-in-javascript
function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


}
