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

  gameStart() {
    const squareContainer = document.querySelector(".squareContainer");
    let playerStartText = document.querySelector(".playStartText");
    playerStartText.classList.remove("hide");
    console.log(playerStartText.classList);
    button.classList.add("hide");
    squareContainer.classList.add("bounce");
    const items = document.querySelectorAll(".squares");
    let squares = Array.from(items);
    squares.forEach((square, index) =>
      square.addEventListener(
        "click",
        this.setHumanPlayers.bind(this, squares, square, index, playerStartText)
      )
    );
  }

  setHumanPlayers(squares, square, index, playerStartText) {
    if (squares[index].innerHTML !== "") return;
    squares[index].innerHTML = this.humanPlayer;
    playerStartText.classList.add("hide");
    const removeTrackingNum = this.trackBoardCells.indexOf(index + 1); // starting at index 0-8 0 will pick 1 has to be +1 or the number would be 0 which doesn't exist in tracking
    this.trackBoardCells.splice(removeTrackingNum, 1);
    this.winnerConditions(squares, this.humanPlayer);
  }

  SetComputerPlayers(squares) {
    const random = this.randomNumGen(this.trackBoardCells);
    const computerIndex = this.trackBoardCells[random]; //use random number as index to pick from remaining available nums in trackboardcells array. This enables us to only pick available squares
    squares[computerIndex - 1].innerHTML = this.computerPlayer;
    this.trackBoardCells.splice(random, 1);
    this.winnerConditions(squares);
  }

  randomNumGen(array) {
    const randomNum = Math.floor(Math.random() * array.length); // generate random number
    return randomNum;
  }

  winnerConditions(squares, player) {
    // setTimeout(() => {

    //   this.setComputerPlayer(squares); //// figure out where to call this
    // }, 500);
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

    for (let i = 0; i < waysToWin.length; i++) {
      const winner = waysToWin[i]; //breaks down to individual arrays
      const cellOne = array[winner[0]].innerHTML;
      const cellTwo = array[winner[1]].innerHTML;
      const cellThree = array[winner[2]].innerHTML;

      if (
        this.trackBoardCells.length >= 0 &&
        cellOne === cellTwo &&
        cellTwo === cellThree &&
        cellOne != "" // this is so that if all cells are empty they don't equal each other and will only equal once populated with x or o. By making it that one of the cells has to have something in it means all '' will not equal
      ) {
        this.boardStyles(winOrTie, squares, array, winner);

        this.winner = true;

        cellOne === "x" ? (this.playerCount += 1) : (this.computerCount += 1);

        setTimeout(() => {
          const players = cellOne === this.human ? "Human" : "Computer";
          winOrTie.textContent = `${players.toUpperCase()} WINS`;
        }, 1000);

       

        setTimeout(() => {
          this.updatePlayerScore(winOrTie);
          this.boardReset(winOrTie, squares);
        }, 900);
        return;
      }
    }

    if (!this.winner && this.trackBoardCells.length === 0) {
      setTimeout(() => {
        winOrTie.textContent = "IT'S A TIE";
      }, 1000);
      setTimeout(() => {
        this.boardReset(winOrTie, squares);
      }, 900);
      return;
    }
    if (player === this.humanPlayer) {
      setTimeout(() => {
        this.SetComputerPlayers(squares);
      }, 500);
    }
  }

  updatePlayerScore(winOrTie) {
    let playerText = document.querySelector(".score-human h2");
    playerText.textContent = `Human: ${this.playerCount} | Computer: ${this.computerCount}`;
    //  this.gameOver(winOrTie)
  }

  boardStyles(winOrTie, squares, array, winner) {
    const winningStyles = array.filter((item, i) =>
      i <= 2 ? (array[winner[i]].style.background = "white") : "none"
    );
  }

  boardReset(winOrTie, squares) {
    squares.forEach((square, index) =>
      square.removeEventListener(
        "click",
        this.setHumanPlayers.bind(this, squares, square, index)
      )
    );

    setTimeout(() => {
      winOrTie.innerText = "";
    }, 2000);
    this.winner = false;

    console.log(this.winner);
    this.trackBoardCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    squares.forEach((square, index) => {
      square.innerHTML = "";
      square.style.background = "#289d8f";
      square.classList.remove("hide");
    });
  }
  // gameOver(winOrTie){
  //   // this.playerCount === 3 || this.computerCount === 3
  //   // winOrTie.textContent =`GAME OVER`

  //   console.log(this.playerCount)
  // }
}

class Emoji extends Game{
  constructor(humanPlayer){
    super(humanPlayer)
    this.icon=icon
    console.log(super(humanPlayer))
   
  }
  get icon(){
    return this._icon

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
);


//this.cells,currentPlayer,active

// let emojis = new Game(
//   "x",
//   "o",
//   [1, 2, 3, 4, 5, 6, 7, 8, 9],
//   playerCount,
//   computerCount,
//   false
// );
///known bugs

//bug if everyone chooses in one line then both can win - fixed
//cannot remove event listener or stop squares being clicked on after win
//make responsive
//squares can be clicked on which increases score. seems to be if you click over winning cells numerous times
// need - fixed
