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

function game() {
  const totalRrounds = 5;
  const score = {
    player: 0,
    computer: 0,
  };
  const playerSelection = playerMove();
  console.log(playerSelection);

  for (let round = 1; round <= totalRrounds; round += 1) {
    const roundResults = singleRound(playerSelection);
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
