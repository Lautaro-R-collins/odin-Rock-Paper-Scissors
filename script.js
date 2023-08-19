// Rock Paper Scissors Game
// This script handles the logic and UI interactions for a simple rock-paper-scissors game.
// It allows the player to choose between rock, paper, and scissors, plays rounds against

let playerScore = 0
let computerScore = 0
let roundWinner = ''

// Game Logic Functions

// playRound: Determines the winner of a game round and updates the scores.
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
      roundWinner = 'tie'
    }
    if (
      (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
      (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
      (playerSelection === 'PAPER' && computerSelection === 'ROCK')
    ) {
      playerScore++
      roundWinner = 'player'
    }
    if (
      (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
      (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
      (computerSelection === 'PAPER' && playerSelection === 'ROCK')
    ) {
      computerScore++
      roundWinner = 'computer'
    }
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
  }

  // getRandomChoice: Returns a random choice

  function getRandomChoice() {
    let randomNumber = Math.floor(Math.random() * 3)
    switch (randomNumber) {
      case 0:
        return 'ROCK'
      case 1:
        return 'PAPER'
      case 2:
        return 'SCISSORS'
    }
  }

  // isGameOver: Checks if the game is over 
  
  function isGameOver() {
    return playerScore === 5 || computerScore === 5
  }
  
  //Ui//
  
  const scoreInfo = document.getElementById('scoreInfo')
  const scoreMessage = document.getElementById('scoreMessage')
  const playerScorePara = document.getElementById('playerScore')
  const computerScorePara = document.getElementById('computerScore')
  const playerSign = document.getElementById('playerSign')
  const computerSign = document.getElementById('computerSign')
  const rockBtn = document.getElementById('rockBtn')
  const paperBtn = document.getElementById('paperBtn')
  const scissorsBtn = document.getElementById('scissorsBtn')
  const endgameModal = document.getElementById('endgameModal')
  const endgameMsg = document.getElementById('endgameMsg')
  const overlay = document.getElementById('overlay')
  const restartBtn = document.getElementById('restartBtn')
  
  rockBtn.addEventListener('click', () => handleClick('ROCK'))
  paperBtn.addEventListener('click', () => handleClick('PAPER'))
  scissorsBtn.addEventListener('click', () => handleClick('SCISSORS'))
  restartBtn.addEventListener('click', restartGame)
  overlay.addEventListener('click', closeEndgameModal)

  // Event Listeners

  // handleClick: Handles the player's button click and plays a game round.  
  function handleClick(playerSelection) {
    if (isGameOver()) {
      openEndgameModal()
      return
    }
  
    const computerSelection = getRandomChoice()
    playRound(playerSelection, computerSelection)
    updateChoices(playerSelection, computerSelection)
    updateScore()
  
    if (isGameOver()) {
      openEndgameModal()
      setFinalMessage()
    }
  }

  // updateChoices: Updates the chosen signs for the player and computer.
  function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
      case 'ROCK':
        playerSign.textContent = '✊🏼'
        break
      case 'PAPER':
        playerSign.textContent = '✋🏼'
        break
      case 'SCISSORS':
        playerSign.textContent = '✌🏼'
        break
    }
  
    switch (computerSelection) {
      case 'ROCK':
        computerSign.textContent = '✊🏼'
        break
      case 'PAPER':
        computerSign.textContent = '✋🏼'
        break
      case 'SCISSORS':
        computerSign.textContent = '✌🏼'
        break
    }
  }

  // updateScore: Updates the score information on the UI.
  
  function updateScore() {
    if (roundWinner === 'tie') {
      scoreInfo.textContent = "It's a tie!"
    } else if (roundWinner === 'player') {
      scoreInfo.textContent = 'You won!'
    } else if (roundWinner === 'computer') {
      scoreInfo.textContent = 'You lost!'
    }
  
    playerScorePara.textContent = `Player: ${playerScore}`
    computerScorePara.textContent = `Computer: ${computerScore}`
  }

  //final message//
  
  function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'player') {
      scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
      )} beats ${computerSelection.toLowerCase()}`
      return
    }
    if (winner === 'computer') {
      scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
      )} is beaten by ${computerSelection.toLowerCase()}`
      return
    }
  
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} ties with ${computerSelection.toLowerCase()}`
  }

  // capitalizeFirstLetter: Capitalizes the first letter of a string.
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  // openEndgameModal: Displays the endgame modal.
  function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
  }
  // closeEndgameModal: Closes the endgame modal.
  function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
  }
  // setFinalMessage
  function setFinalMessage() {
    return playerScore > computerScore
      ? (endgameMsg.textContent = 'You won!')
      : (endgameMsg.textContent = 'You lost...')
  }

  //reset game
  
  function restartGame() {
    playerScore = 0
    computerScore = 0
    scoreInfo.textContent = 'Choose your weapon'
    scoreMessage.textContent = 'First to score 5 points wins the game'
    playerScorePara.textContent = 'Player: 0'
    computerScorePara.textContent = 'Computer: 0'
    playerSign.textContent = '👤'
    computerSign.textContent = '💻'
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
  }