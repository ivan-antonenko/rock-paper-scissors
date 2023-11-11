function game() {
  const totalRrounds = 5;
  const score = {
    player: 0,
    computer: 0,
  };

  for (let round = 1; round <= totalRrounds; round += 1) {
    const playerSelection = playerMove();
    const roundResults = singleRound(playerSelection);

    updateScore(score, roundResults);
    showRoundInfo(round, score, roundResults);
    if (isDraw(roundResults)) {
      round -= 1;
    }
  }
  theWinnerIs(score);
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
      roundResult: "Draw",
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

function playerMove() {
  const playerSelection = prompt("What's your chose?").toLowerCase();
  if (
    playerSelection === "rock" ||
    playerSelection === "paper" ||
    playerSelection === "scissors"
  ) {
    return playerSelection;
  }
  return playerMove();
}

function isDraw(roundResults) {
  if (roundResults.playerScore === 0 && roundResults.computerScore === 0) {
    return true;
  }
  return false;
}

function updateScore(score, roundResults) {
  score.player += roundResults.playerScore;
  score.computer += roundResults.computerScore;

  return score;
}

function showRoundInfo(round, score, roundResults) {
  console.log(`Round #: ${round}`);
  console.log(roundResults.roundResult);
  console.log(`Your Score: ${score.player}`);
  console.log(`Computer Score: ${score.computer}`);
  console.log("-------------------------------------");
}

function theWinnerIs(score) {
  console.log("=====================================");
  if (score.player === score.computer) {
    return console.log("Draw!");
  } else if (score.player > score.computer) {
    return console.log("Congrats! You won the game!");
  }
  return console.log("You lost! Computer won! Ha-ha!!");
}
