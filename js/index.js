const refs = {
  gameTitle: document.querySelector(".game__title"),
  playerScore: document.querySelector("#player-score"),
  computerScore: document.querySelector("#computer-score"),
  playerChoice: document.querySelector("#player-choice"),
  computerChoice: document.querySelector("#computer-choice"),
  gameButtons: document.querySelector(".game__buttons-list"),
  playButtons: document.querySelectorAll(".game__buttons-list-button"),
  winnerTitle: document.querySelector(".game__winner-title"),
  restartButton: document.querySelector(".game__restart-button"),
};

const scores = {
  player: 0,
  computer: 0,
};

refs.gameButtons.addEventListener("click", onPlayButtonClick);

function onPlayButtonClick(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  const userData = {
    choice: e.target.id,
    icon: e.target.getAttribute("data-href"),
  };
  const roundResults = singleRound(userData.choice);
  updateScore(scores, roundResults);
  displayRoundResults(refs, scores, roundResults, userData);

  if (scores.player === 5 || scores.computer === 5) {
    endTheGame(refs, scores);
  }
}

function getComputerChoice() {
  switch (Math.floor(Math.random() * (3 - 1 + 1) + 1)) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    default:
      return "scissors";
  }
}
function singleRound(playerSelection, computerSelection = getComputerChoice()) {
  if (computerSelection === playerSelection) {
    return {
      playerSelection,
      computerSelection,
      playerScore: 0,
      computerScore: 0,
      roundResult: "It's a tie!",
    };
  } else if (computerSelection === "rock") {
    switch (playerSelection) {
      case "paper":
        return {
          playerSelection,
          computerSelection,
          playerScore: 1,
          computerScore: 0,
          roundResult: "You Won! Paper beats Rock",
        };
      default:
        return {
          playerSelection,
          computerSelection,
          playerScore: 0,
          computerScore: 1,
          roundResult: "You Lose! Rock beats Scissors",
        };
    }
  } else if (computerSelection === "paper") {
    switch (playerSelection) {
      case "rock":
        return {
          playerSelection,
          computerSelection,
          playerScore: 0,
          computerScore: 1,
          roundResult: "You Lose! Paper beats Rock",
        };
      default:
        return {
          playerSelection,
          computerSelection,
          playerScore: 1,
          computerScore: 0,
          roundResult: "You Won! Scissors beats Paper",
        };
    }
  } else {
    switch (playerSelection) {
      case "rock":
        return {
          playerSelection,
          computerSelection,
          playerScore: 1,
          computerScore: 0,
          roundResult: "You Won! Rock beats Scissors",
        };
      default:
        return {
          playerSelection,
          computerSelection,
          playerScore: 0,
          computerScore: 1,
          roundResult: "You Lose! Scissors beats Paper",
        };
    }
  }
}
function updateScore(scores, roundResults) {
  scores.player += roundResults.playerScore;
  scores.computer += roundResults.computerScore;

  return scores;
}
function displayRoundResults(refs, scores, roundResults, userData) {
  highlightWinner(roundResults);
  refs.gameTitle.textContent = roundResults.roundResult;
  refs.playerScore.textContent = scores.player;
  refs.computerScore.textContent = scores.computer;
  refs.playerChoice.firstElementChild.setAttribute("href", userData.icon);
  refs.computerChoice.firstElementChild.setAttribute(
    "href",
    `./img/icons.svg#icon-hand-${roundResults.computerSelection}-solid`
  );
}

function highlightWinner(roundResults) {
  refs.playerChoice.classList.remove("winner");
  refs.computerChoice.classList.remove("winner");

  if (roundResults.playerScore) {
    refs.playerChoice.classList.add("winner");
  }
  if (roundResults.computerScore) {
    refs.computerChoice.classList.add("winner");
  }
}

function endTheGame(refs, scores) {
  refs.playButtons.forEach((element) => {
    element.setAttribute("disabled", "disabled");
    element.style.backgroundColor = "gray";
  });

  setTimeout(() => {
    refs.gameTitle.textContent = "Game Over!";
  }, 1500);
}
