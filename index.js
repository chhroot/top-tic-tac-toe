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

  //for diagonals 
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
    console.log("draw");
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
  const turnMessage = document.getElementById("turn");  
  const cellElements = document.querySelectorAll(".cell");
  const winnerDisplay = document.querySelector(".winner-display");
  const winnerMessage = document.createElement("p");
  const restartButton = document.createElement("button");
  restartButton.textContent = "RESTART";
  restartButton.classList.add("restart");

  turnMessage.textContent = "Player " + currentPlayer.getSign() + "'s turn"


  let winner = "";

  cellElements.forEach((cell, index) => {
    cell.addEventListener("click", (event) => {
      const x = Math.floor(index / 3);
      const y = index % 3;

      handleTurn(x, y, cell);
      switchTurn();
      cell.classList.add("cell-disabled");

      //im just hard coding everything, needs improvement
      if( typeof checkWinner() === 'string' ){
        if(checkWinner() === "X"){
            console.log(player1.getName());
            winner = player1.getName();
            winnerMessage.textContent = `The Winner is ${winner}`;
            winnerDisplay.appendChild(winnerMessage);
            winnerDisplay.appendChild(restartButton);
            disableBoard();

        }else if(checkWinner() === "O"){
            console.log(player2.getName());
            winner = player2.getName();
            winnerMessage.textContent = `The Winner is ${winner}`;
            winnerDisplay.appendChild(winnerMessage);
            winnerDisplay.appendChild(restartButton);
            disableBoard();
        }else if(checkWinner() === "draw"){
            winnerMessage.textContent = "Its a draw";
            winnerDisplay.appendChild(winnerMessage);
            winnerDisplay.appendChild(restartButton);
            disableBoard();
          }
      }
      
    });
  });

  restartButton.addEventListener("click", (event) => {
    restart();
    winnerDisplay.removeChild(winnerMessage);
    winnerDisplay.removeChild(restartButton);
  });

  //the message on the top ? yes thats the one
  const switchTurn = () => {
    turnMessage.textContent = "Player " + currentPlayer.getSign() + "'s turn";
  };

  //disables the stupid ass board
  const disableBoard = () => {
    const cellElements = document.querySelectorAll(".cell");
    cellElements.forEach((cell) => {
      cell.classList.add('disabled');
    });
  };

  //enables the stupid ass board
  const enableBoard = () => {
    const cellElements = document.querySelectorAll(".cell");
    cellElements.forEach((cell) => {
      cell.classList.remove('disabled')
    });
  };

  //restarts the game
const restart = () => {
    myBoard.resetBoard();
    enableBoard();


};

let currentTheme = "light-theme";

document.getElementById("checkbox").addEventListener("click", () => {
  if (currentTheme === "light-theme") {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    currentTheme = "dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    currentTheme = "light-theme";
  }
});



})();



