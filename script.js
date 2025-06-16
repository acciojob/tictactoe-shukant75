//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const messageDiv = document.querySelector(".message");
const gameBoard = document.querySelector(".game-board");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();
  if (player1 && player2) {
    currentPlayer = player1;
    document.querySelector(".player-inputs").style.display = "none";
    gameBoard.style.display = "block";
    messageDiv.textContent = `${currentPlayer}, you're up`;
  } else {
    alert("Please enter both player names.");
  }
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index]) return;

    const symbol = currentPlayer === player1 ? "X" : "O";
    cell.textContent = symbol;
    board[index] = symbol;

    if (checkWin(symbol)) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
    } else if (board.every(cell => cell)) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      messageDiv.textContent = `${currentPlayer}, you're up`;
    }
  });
});

function checkWin(symbol) {
  return winningCombinations.some(combo => {
    return combo.every(index => board[index] === symbol);
  });
}
