const xImage =
  "images/white-symbols-icons-croix-white-x-mark-png-clipart-thumbnail.jpg";
const oImage = "images/png-transparent-white-neon-circle-thumbnail.png";

let xTurn = true;
let enableGameplay = false;

function toggleGameplay() {
  if (startButton.innerHTML !== "Play again?") {
    enableGameplay = !enableGameplay;
    startButton.innerHTML = enableGameplay ? "click to pause" : "click to start";
  }
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

let slots = document.querySelectorAll(".slot");

function checkWinner() {
  for (const move of winningMoves) {
    if (isWinningMove(move)) {
      startButton.innerHTML = "Play again?";
    }
  }
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

    if (
      slot1.dataset.shape === slot2.dataset.shape &&
      slot2.dataset.shape === slot3.dataset.shape
    ) {
      document.querySelector(".result").
        innerHTML = `winner is: ${slot1.dataset.shape}`;
      enableGameplay = false;
      return true;
    }
  }
  return false;
}

function playAgain() {
  if (startButton.innerHTML === "Play again?") {
    startButton.innerHTML = "click to pause"
    enableGameplay = true;

    document.querySelector(".main").innerHTML = `
      <div class="slot">1</div>
      <div class="slot">2</div>
      <div class="slot">3</div>
      <div class="slot">4</div>
      <div class="slot">5</div>
      <div class="slot">6</div>
      <div class="slot">7</div>
      <div class="slot">8</div>
      <div class="slot">9</div>
    `;
    document.querySelector(".result").innerHTML = ``;
    slots = document.querySelectorAll(".slot");
    runEventListeners();
  }
}