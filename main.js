//game psuedo -

//on click should add square or cross

// find a way to change player1 player2

// random naughts and crosses, click on squares and add o or x

// if square contains x or o then return else add x or o

//computer player should choose random squares

// on win flash up win

///

const button = document.querySelector("button");
button.addEventListener("click", () => {
  game.gameStart();
});

class Game {
  constructor(
    humanPlayer,
    computerPlayer,
    trackBoardCells,
    playerCount,
    computerCount,
    winner
  ) {
    this.playerCount = playerCount;
    this.computerCount = computerCount;
    this.humanPlayer = humanPlayer;
    this.computerPlayer = computerPlayer;
    this.trackBoardCells = trackBoardCells; //  presets
    this.winner = winner;
  }

  updatePlayerScore(cellOne) {
    let playerText = document.querySelector(".score-human h2");
    playerText.textContent = `Human ${this.playerCount} | Computer ${this.computerCount}`;
  }

  gameStart() {
    const squareContainer = document.querySelector(".squareContainer");
    let playerStartText = document.querySelector(".playStartText");
    button.classList.add("hide");
    playerStartText.classList.remove("hide");

    squareContainer.classList.add("bounce");
    const items = document.querySelectorAll(".squares");
    let squares = Array.from(items);
    squares.forEach(
      (
        square,
        index // HTML squares
      ) =>
        square.addEventListener("click", () => {
          playerStartText.classList.add("hide");
          this.setHumanPlayer(squares, square, index);
        })
    );
  }

  setHumanPlayer(squares, square, index) {
    const human = this.humanPlayer; // x
    if (squares[index].innerHTML !== "") return;
    let removeTrackingNum = this.trackBoardCells.indexOf(index + 1); // starting at index 0-8 0 will pick 1 has to be +1 or the number would be 0 which doesn't exist in tracking
    this.trackBoardCells.splice(removeTrackingNum, 1); // if taken then remove it
    squares[index].innerHTML =
      squares[index].innerHTML === human ? this.computer : human;
    setTimeout(() => {
      console.log(this.trackBoardCells.length);
      this.setComputerPlayer(squares, human, square, index);
    }, 1000);
  }

  randomNumGen(array) {
    const randomNum = Math.floor(Math.random() * array.length); // generate random number
    return randomNum;
  }

  setComputerPlayer(squares, human, square, index) {
    const computer = this.computerPlayer;
    const random = this.randomNumGen(this.trackBoardCells);
    const computerIndex = this.trackBoardCells[random]; //use random number as index to pick from remaining available nums in trackboardcells array. This enables us to only pick available squares
    if (this.trackBoardCells.length > 0) {
      squares[computerIndex - 1].innerHTML = computer;
    }
    this.trackBoardCells.splice(random, 1);
    this.winnerConditions(squares, human, computer);
  }

  winnerConditions(squares, human, computer) {
    let array = squares.map((item) => item);

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

    let winOrTie = document.querySelector(".winOrTie h2");
    waysToWin.forEach((_, i) => {
      const winner = waysToWin[i]; //breaks down to individual arrays
      const cellOne = array[winner[0]].innerHTML;
      const cellTwo = array[winner[1]].innerHTML;
      const cellThree = array[winner[2]].innerHTML;

      if (
        this.trackBoardCells.length >= 0 &&
        cellOne === cellTwo &&
        cellTwo === cellThree &&
        cellOne != ""
      ) {
       
        winOrTie.textContent = `${cellOne} winner`;
        this.winner = true;
        cellOne==='x'?this.playerCount += 1:this.computerCount+=1;
        this.boardStyles(squares, array, winner);
        this.updatePlayerScore();
      }

      if (!this.winner && this.trackBoardCells.length === 0) {
        winOrTie.textContent = "tie";
        setTimeout(() => {
          // this.boardReset(squares);
          this.boardReset(squares);
        }, 2000);
      }
    });
  }

  boardStyles(squares, array, winner) {
    const winningStyles = array.filter((item, i) =>
      i <= 2 ? (array[winner[i]].style.background = "white") : "none"
    );
    setTimeout(() => {
      this.boardReset(squares);
    }, 2000);
  }

  boardReset(squares) {
    this.winner = false;
    console.log(this.winner);
    this.trackBoardCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    squares.forEach((square, index) => {
      square.innerHTML = "";
      square.style.background = "#289d8f";
      // square.removeEventListener("click", this.setHumanPlayer(squares, square, index));
      // button.classList.remove("hide");
    });
  }
}

let playerCount = 0;
let computerCount = 0;
//new object instance
let game = new Game(
  "x",
  "o",
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  playerCount,
  computerCount,
  false
); //this.cells,currentPlayer,active


///know bugs

//bug if everyone chooses in one line then both can win
//cannot remove event listener
//squares can be clicked on whihc increases score. seems to be if you click over winning cells numerous times
