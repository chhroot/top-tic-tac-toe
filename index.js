"use strict";


let turn = 1;


// THE GAME BOARD
const gameBoard = () => {

    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    function addMark(x, y, mark) {
        if(board[x][y] === ""){
            board[x][y] = mark;
            return true
        }
        return false;
    }

    return {board, addMark};
};


const myBoard = gameBoard();



// EVENT LISTENERS

const cellElements = document.querySelectorAll('.cell');

cellElements.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const x = Math.floor(index/3);
        const y = index % 3;

        if(turn === 1){
            myBoard.addMark(x,y, "X");
        cell.textContent = "X";
        turn--;
        }
        else if(turn === 0){
            myBoard.addMark(x,y, "O");
        cell.textContent = "O";
        turn++;
        }

        
        
    })
});
