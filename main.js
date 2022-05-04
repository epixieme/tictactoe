//game variables -

//on click should add square or cross
// find a way to change player1 player2

// , random naughts and crosses, click on sqaures and add o or x

// if square contains x or o then return else add x or o

//chaage player

///

// Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.
// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.
// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.
// Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)
// Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
// Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!
// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!
// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
// Start by just getting the computer to make a random legal move.
// Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)
// If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!
const squares = document.querySelectorAll(".squares");

squares.forEach((square, index) =>
  square.addEventListener("click", () => {
    // HTML squares
    game.setPlayer(square, index);
  })
);

class Game {
  constructor(cells, currentPlayer, isGameActive, playerTurn) {
    this.cells = cells;
    this.currentPlayer = currentPlayer;
    this.isGameActive = isGameActive;
    this.playerTurn = playerTurn;
    const PlayerXWin = "PlayerXWin";
    const PlayerOWin = "PlayerOWin";
    const draw = "draw";
  }

  checkBoardIsFull(boardSquare, index) {
    // console.log(this.cells);
    if (this.cells.includes("")) {
      this.winnerConditions();
    }
    // } else {
    //   this.winnerConditions();
    // }
  }

  // if array is full then end the game

  endGame() {
    console.log("winner");
    //reset board here to start again
  }

  setPlayer(boardSquare, index) {
    const displayPlayer = document.querySelector(".display-player");
    this.currentPlayer = this.currentPlayer === "x" ? "o" : "x"; //if current player is x then chnage to o

    if (boardSquare.innerText != "") return; // if square is already taken
    boardSquare.innerText = this.currentPlayer; // board square shows current player

    boardSquare.innerText === "o"
      ? (displayPlayer.innerText = "x")
      : (displayPlayer.innerText = "o"); // player turn is displayed
    /// change the board square according to player
    this.boardArrayUpdate(index); // pass the index from squares forEach
    this.checkBoardIsFull(); //pass each item and index from squares to checkboard
  }

  boardArrayUpdate(index) {
    this.cells[index] = this.currentPlayer; // update empty array with current player
  }

  winnerConditions() {
    let winnerCombinations = [
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
      let winner = winnerCombinations[i]; //breaks down to individual arrays
  
      let cellOne = this.cells[winner[0]];// breaks down all the array to numbers
    
      let cellTwo = this.cells[winner[1]];// breaks down all the array to numbers
      let cellThree = this.cells[winner[2]];// breaks down all the array to numbers
      if (cellOne === cellTwo && cellTwo === cellThree) {
        console.log(`this is cell 1 ${cellOne} this is cell 2 ${cellTwo}  this is cell 3 ${cellThree}`)
      }
    }
  }
}
//new object instance
let game = new Game(["", "", "", "", "", "", "", "", ""], "x", true); //this.cells,currentPlayer,active
