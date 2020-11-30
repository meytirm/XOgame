// your code here...
let gameContainer = document.querySelector(".game--container");
let gameStatus = document.querySelector(".game--status");
let gameRestart = document.querySelector(".game--restart");
let cells = document.querySelectorAll(".cell");

let saveStatus = ["", "", "", "", "", "", "", "", ""];
let winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let status = "O";

function fillGameTable() {
  saveStatus.forEach((status, index) => {
    cells[index].innerHTML = status;
  });
  let draw = "yes";
  for (
    let counterWinIndexes = 0;
    counterWinIndexes < winCondition.length;
    counterWinIndexes++
  ) {
    let win = ["", "", ""];

    for (
      let counterWinIndex = 0;
      counterWinIndex < winCondition[counterWinIndexes].length;
      counterWinIndex++
    ) {
      if (status === "X") {
        if (
          saveStatus[winCondition[counterWinIndexes][counterWinIndex]] == "O"
        ) {
          win[counterWinIndex] = "O";
        } else if (
          saveStatus[winCondition[counterWinIndexes][counterWinIndex]] == ""
        ) {
          win[counterWinIndex] = "S";
        } else {
          win[counterWinIndex] = "X";
        }
      } else {
        if (
          saveStatus[winCondition[counterWinIndexes][counterWinIndex]] == "X"
        ) {
          win[counterWinIndex] = "X";
        } else if (
          saveStatus[winCondition[counterWinIndexes][counterWinIndex]] == ""
        ) {
          win[counterWinIndex] = "S";
        } else {
          win[counterWinIndex] = "O";
        }
      }
      if (saveStatus[winCondition[counterWinIndexes][counterWinIndex]] == "") {
        draw = "no";
      }
    }
    if (win[0] === status && win[1] === status && win[2] === status) {
      gameStatus.innerHTML = "Player " + status + " has won";
      status = "end";
      break;
    }
  }
  if (draw === "yes" && status !== "end") {
    gameStatus.innerHTML = "Game ended in a draw";
  }
}

gameStatus.innerHTML = "It's X's turn";
gameContainer.onclick = function (event) {
  if (event.target.innerHTML !== "") return false;
  if (status === "end") return false;
  if (status == "O") {
    status = "X";
    saveStatus[event.target.dataset.cellIndex] = status;
    gameStatus.innerHTML = "It's O's turn";
  } else {
    status = "O";
    saveStatus[event.target.dataset.cellIndex] = status;
    gameStatus.innerHTML = "It's X's turn";
  }
  fillGameTable();
};

gameRestart.onclick = function () {
  saveStatus.forEach((status, index) => {
    saveStatus[index] = "";
    cells[index].innerHTML = "";
  });
  status = "O";
  gameStatus.innerHTML = "It's X's turn";
};
