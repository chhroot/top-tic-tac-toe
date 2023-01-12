"use strict";

// THE PLAYER OBJECT
const player = (sign, name) => {
  this.sign = sign;
  this.name = name;

  const getSign = () => {
    return sign;
  };

  const getName = () => {
    return name;
  };

  return { getSign, getName };
};


// THE GAME BOARD
const gameBoard = () => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function addMark(x, y, mark) {
    if (board[x][y] === "") {
      board[x][y] = mark;
      return true;
    }
    return false;
  }

  function resetBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }

    const cellElements = document.querySelectorAll(".cell");
    cellElements.forEach((cell, index) => {
      cell.textContent = "";
    });
  }

  return { board, addMark, resetBoard };
};

const myBoard = gameBoard();
const player1 = player("X", "Joe");
const player2 = player("O", "Mama");
let currentPlayer = player1;


//CHECKS FOR THE WINNER - I couldn't come up with a better one ? 
const checkWinner = () => {
  //for rows
  for (let i = 0; i < 3; i++) {
    if (
      myBoard.board[i][0] === myBoard.board[i][1] &&
      myBoard.board[i][1] === myBoard.board[i][2] &&
      myBoard.board[i][0] != ""
    ) {

      return myBoard.board[i][0];
    }
  }

  //for columns
  for (let i = 0; i < 3; i++) {
    if (
      myBoard.board[0][i] === myBoard.board[1][i] &&
      myBoard.board[1][i] === myBoard.board[2][i] &&
      myBoard.board[0][i] != ""
    ) {

      return myBoard.board[0][i];
    }
  }

  //for diagnals
  if (
    myBoard.board[0][0] === myBoard.board[1][1] &&
    myBoard.board[1][1] === myBoard.board[2][2] &&
    myBoard.board[0][0] != ""
  ) {
    return myBoard.board[0][0];
  }

  if (
    myBoard.board[0][2] === myBoard.board[1][1] &&
    myBoard.board[1][1] === myBoard.board[2][0] &&
    myBoard.board[0][2] != ""
  ) {
    
    return myBoard.board[0][2];
  }

  //for draw
  if (!myBoard.board.flat().includes("")) {
    return "draw";
  }

  return null;
};

// HANDLES TURN
const handleTurn = (x, y, cell) => {
  if (currentPlayer === player1) {
    myBoard.addMark(x, y, player1.getSign());
    cell.textContent = String(myBoard.board[x][y]);
    currentPlayer = player2;
  } else {
    myBoard.addMark(x, y, player2.getSign());
    cell.textContent = String(myBoard.board[x][y]);
    currentPlayer = player1;
  }
};

// EVENT LISTENERS
const displayController = (() => {
  const cellElements = document.querySelectorAll(".cell");
  const winnerDisplay = document.querySelector(".winner-display");

  cellElements.forEach((cell, index) => {
    cell.addEventListener("click", (event) => {
      const x = Math.floor(index / 3);
      const y = index % 3;

      handleTurn(x, y, cell);

      if( typeof checkWinner() === 'string' ){
        if(checkWinner() === "X"){
            console.log(player1.getName());
        }else{
            console.log(player2.getName());
        }
      }else if(checkWinner() === "draw"){
        console.log("DRAW");
      }
    });
  });
})();
