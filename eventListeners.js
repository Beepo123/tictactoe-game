const startButton = document.querySelector(".start-button");

runEventListeners();

function runEventListeners() {
  startButton.addEventListener("click", toggleGameplay);
  startButton.addEventListener("click", playAgain);

  const main = document.querySelector(".main");
  main.addEventListener("click", handleClick);
}
