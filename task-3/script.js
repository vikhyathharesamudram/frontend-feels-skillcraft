const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let cells = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function checkWin() {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      statusText.textContent = `${cells[a]} Wins! 🎉`;
      highlightCells(pattern);
      return;
    }
  }

  if (!cells.includes("")) {
    gameActive = false;
    statusText.textContent = "Draw! 🤝";
  }
}

function highlightCells(indices) {
  indices.forEach(i => {
    const cell = board.children[i];
    cell.classList.add("win-glow");
  });
}

board.addEventListener("click", e => {
  const index = e.target.dataset.index;
  if (!gameActive || !index || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer === "X" ? "red" : "green");
  checkWin();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Current Turn: ${currentPlayer}`;
  }
});

resetBtn.onclick = () => {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Current Turn: X";
  Array.from(board.children).forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("red", "green", "win-glow");
    cell.style.background = "rgba(255, 255, 255, 0.05)";
  });
};
