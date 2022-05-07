//game psuedo -

//on click should add square or cross

// find a way to change player1 player2

// random naughts and crosses, click on squares and add o or x

// if square contains x or o then return else add x or o

//computer player should choose random squares

///

// const items = document.querySelectorAll(".squares");

// let squares = Array.from(items);
// squares.forEach(
//   (
//     square,
//     index // HTML squares
//   ) =>
//     square.addEventListener("click", () => {
//       game.setHumanPlayer(square, index);
//     })
// );

document.querySelector("button").addEventListener("click", () => {
  game.gameStart();
});

class Game {
  constructor(cells, humanPlayer, computerPlayer, trackBoardCells) {
    this.cells = cells;
    this.humanPlayer = humanPlayer;
    this.computerPlayer = computerPlayer;
    this.trackBoardCells = trackBoardCells;
  }

  gameStart() {
    const items = document.querySelectorAll(".squares");
    let squares = Array.from(items);
    squares.forEach(
      (
        square,
        index // HTML squares
      ) =>
        square.addEventListener("click", () => {
          this.setHumanPlayer(squares, square, index);
        })
    );
  }

  setHumanPlayer(squares, square, index) {
    const human = this.humanPlayer; // x
    if (squares[index].innerHTML !== "") return;
    let removeTrackingNum = this.trackBoardCells.indexOf(index + 1); // starting at index 0-8 0 will pick 1 has to be +1 or the number would be 0 which doesn't exist in tracking
    this.trackBoardCells.splice(removeTrackingNum, 1); // if taken then remove it
    squares[index].innerHTML = human;
    this.setComputerPlayer(squares, human, square, index);
  }

  randomNumGen(array) {
    const randomNum = Math.floor(Math.random() * array.length); // generate random number
    return randomNum;
  }

  setComputerPlayer(squares, human, square, index) {
    const computer = this.computerPlayer;
    const random = this.randomNumGen(this.trackBoardCells);
    const computerIndex = this.trackBoardCells[random]; //use random number as index to pick from remaining available nums in trackboardcells array. This enables us to only pick available squares
    squares[computerIndex - 1].innerHTML = computer;

    this.trackBoardCells.splice(random, 1); // reduces length each time something is picked and removed
    this.winnerConditions(squares, human, computer);
  }

  winnerConditions(squares, human, computer) {
    let array = squares.map((item) => item);

    console.log(human);

    const waysToWin = [
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

    for (let i = 0; i < waysToWin.length; i++) {
      // console.log(array)
      const winner = waysToWin[i]; //breaks down to individual arrays
      const cellOne = array[winner[0]].innerHTML;
      const cellTwo = array[winner[1]].innerHTML;
      const cellThree = array[winner[2]].innerHTML;

      if (cellOne === human && cellTwo === human && cellThree === human) {
        alert(`${human} winner`);
        array[winner[0]].style.background = "white";
        array[winner[1]].style.background = "white";
        array[winner[2]].style.background = "white";
      } else if (
        cellOne === computer &&
        cellTwo === computer &&
        cellThree === computer
      ) {
        alert(`${computer} winner`);
      }
      //if the cells selected match any of the combos then win. So all 3 equal each other then announce game won by player n and reset board
    }
  }


  endGame() {
    // console.log("winner");
    //reset board here to start again
  }

  boardReset() {
    console.log("reset");
  }
}

//new object instance
let game = new Game(
  ["", "", "", "", "", "", "", "", ""],
  "x",
  "o",
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
); //this.cells,currentPlayer,active
