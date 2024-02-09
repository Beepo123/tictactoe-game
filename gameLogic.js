const xImage =
  "images/white-symbols-icons-croix-white-x-mark-png-clipart-thumbnail.jpg";
const oImage = "images/png-transparent-white-neon-circle-thumbnail.png";

let xTurn = true;
let enableGameplay = false;

function toggleGameplay() {
  enableGameplay = !enableGameplay;
  startButton.innerHTML = enableGameplay ? "click to pause" : "click to start";
}

function handleClick(event) {
  if (!enableGameplay) return;

  const div = event.target.closest(".slot");
  if (!div || div.classList.contains("locked")) return;

  const shape = xTurn ? "x" : "o";
  const imageSrc = xTurn ? xImage : oImage;

  div.innerHTML = `<img src="${imageSrc}">`;
  div.setAttribute("data-shape", shape);
  div.classList.add("locked");

  xTurn = !xTurn;
  checkWinner();
}

const winningMoves = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const slots = document.querySelectorAll(".slot");

function checkWinner() {
  for (const move of winningMoves) {
    if (isWinningMove(move)) {
      return;
    }
  }
  console.log("No winner yet");
}

function isWinningMove(move) {
  const [index1, index2, index3] = move;
  const slot1 = slots[index1 - 1];
  const slot2 = slots[index2 - 1];
  const slot3 = slots[index3 - 1];

  if (
    slot1.hasAttribute("data-shape") &&
    slot2.hasAttribute("data-shape") &&
    slot3.hasAttribute("data-shape")
  ) {
    console.log("has attribute");
    if (
      slot1.dataset.shape === slot2.dataset.shape &&
      slot2.dataset.shape === slot3.dataset.shape
    ) {
      document.querySelector(
        ".result"
      ).innerHTML = `winner is: ${slot1.dataset.shape}`;
      enableGameplay = false;
      return true;
    }
  }
  return false;
}

// test comment
