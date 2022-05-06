//game psuedo -

//on click should add square or cross

// find a way to change player1 player2

// random naughts and crosses, click on squares and add o or x

// if square contains x or o then return else add x or o

//computer player should choose random squares

///

const items = document.querySelectorAll(".squares");

let squares = Array.from(items);
squares.forEach(
  (
    square,
    index // HTML squares
  ) =>
    square.addEventListener("click", () => {
      game.setHumanPlayer(square, index);
    })
);

class Game {
  constructor(cells, humanPlayer, computerPlayer, trackBoardCells) {
    this.cells = cells;
    this.humanPlayer = humanPlayer;
    this.computerPlayer = computerPlayer;
    this.trackBoardCells = trackBoardCells;
  }

  setHumanPlayer(square, index) {
    /// on click

    const human = this.humanPlayer; // x

    if (squares[index].innerHTML !== "") return;
    let removeTrackingNum = this.trackBoardCells.indexOf(index + 1); // starting at index 0-8 0 will pick 1 has to be +1 or the number would be 0 which doesn't exist in tracking

    this.trackBoardCells.splice(removeTrackingNum, 1); // if taken then remove it

    squares[index].innerHTML = human;
    this.setComputerPlayer(human, square, index);

    //  this.boardArrayUpdate(square,index)
  }

  randomNumGen(array) {
    const randomNum = Math.floor(Math.random() * array.length); // generate random number
    return randomNum;
  }

  setComputerPlayer(human, square, index) {
    const computer = this.computerPlayer;
    const random = this.randomNumGen(this.trackBoardCells);
    const computerIndex = this.trackBoardCells[random]; //use random number as index to pick from remaining available nums in trackboardcells array. This enables us to only pick available squares
    squares[computerIndex - 1].innerHTML = computer;

    this.trackBoardCells.splice(random, 1); // reduces length each time something is picked and removed
    this.winnerConditions(human, computer);
  }

  boardReset() {
    console.log("reset");
  }

  // boardArrayUpdate(square, index) {
  //   // this.cells[index] = square; // update empty array with current player x
  // }

  winnerConditions(human, computer) {
    let array = squares.map((item) => item.innerHTML);

    console.log(human);

    let winnerCombinations = [
      // different winning combinations moves
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // console.log(this.cells[winnerCombinations[0]])

    for (let i = 0; i < winnerCombinations.length; i++) {
      // console.log(array)
      let winner = winnerCombinations[i]; //breaks down to individual arrays
      console.log(array);
      let cellOne = array[winner[0]];
      console.log("this is cellone " + cellOne);
      let cellTwo = array[winner[1]];
      console.log("this is celltwo " + cellTwo);
      let cellThree = array[winner[2]];
      console.log("this is cellthree " + cellThree);
      
      if (
        (cellOne === human && cellTwo === human && cellThree === human) ||
        (cellOne === computer && cellTwo === computer && cellThree === computer)
      ) {
        alert("winner");
        //if the cells selected match any of the combos then win. So all 3 equal each other then announce game won by player n and reset board
      }
    }
  }
  endGame() {
    // console.log("winner");
    //reset board here to start again
  }
}
//new object instance
let game = new Game(
  ["", "", "", "", "", "", "", "", ""],
  "x",
  "o",
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
); //this.cells,currentPlayer,active
