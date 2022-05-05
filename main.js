//game psuedo -

//on click should add square or cross

// find a way to change player1 player2

// random naughts and crosses, click on squares and add o or x

// if square contains x or o then return else add x or o

//computer player should choose random squares

///


const squares = document.querySelectorAll(".squares");

squares.forEach((square, index) =>
  square.addEventListener("click", () => {
    // HTML squares
    game.setPlayer(square, index);
  })
);

class Game {
  constructor(cells, human,computer) {
    this.cells = cells;
    this.human = human;
    this.computer = computer;
  }

  endGame() {
    console.log("winner");
    //reset board here to start again
  }

  setPlayer(boardSquare, index) {

    const displayPlayer = document.querySelector(".display-player");
    let computer = this.computer
    let human = this.human
    // if(boardSquare.innerText != "") return; // if square is already taken
    boardSquare.innerText = human; // board square shows current player
    this.boardArrayUpdate(index); // pass the index from squares forEach
    const random =  Math.ceil(Math.random() * squares.length)-1
  
    if(squares[random].innerText==='') {
      
    squares[random].innerText = computer
   

    }else if(squares[random].innerText!==''){
   
        this.setPlayer(boardSquare, index)

      
      // squares[random].innerText = computer
     
 

    }

  //Gabriel (Monkious) — Today at 16:10
// Hello, @Kirstie ! What i see in your code is that the AI is choosing a random square and, if it's empty, it fills it with the AI sign, else, it does nothing. This conditional will not prevent picking occupied squares, it will just ignore it!
// Needle
//  changed the channel name: 
// Kirstie (2022-05-05)
//  — Today at 16:10
// Gabriel (Monkious) — Today at 16:13
// I can see two fast approaches to this: 

// 1. call the function again if the picked square is filled

// or

// 2. keep track of the empty squares with an array

  this.winnerConditions();
  }
  
  // computerPlayer(boardSquare) {
  //   console.log("computer move");
  //   const random = Math.floor(Math.random() * this.cells.length);
  //   console.log(random)
  //   squares[random].innerText = this.currentPlayer
  //   // items[computerIndex - 1].classList.add("computer");

  //   // Splicing out the move from the tracking list
  //   // tracking.splice(random, 1);
  // }

  boardArrayUpdate(index) {
    this.cells[index] = this.currentPlayer; // update empty array with current player
  }

  winnerConditions() {
   
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
      let winner = winnerCombinations[i]; //breaks down to individual arrays

      let cellOne = this.cells[winner[0]]; // breaks down all the array to numbers vertically

      let cellTwo = this.cells[winner[1]]; // breaks down all the array to numbers vertically
      let cellThree = this.cells[winner[2]]; // breaks down all the array to numbers vertically
      if (cellOne === cellTwo && cellTwo === cellThree) {
        //if the cells selected match any of the combos then win. So all 3 equal each other then announce game won by player n and reset board
       
      }
    }
  }
}
//new object instance
let game = new Game(["", "", "", "", "", "", "", "", ""], "x","o"); //this.cells,currentPlayer,active
