// 1) Créer trois tableaux pour les colonnes et les lignes 
// 2) Créer variable pour le joueur (X)
// 3) Créer une fonction makeMove : 
// 4) Créer une fonction checkWin 
// 5) Créer une fonction checkDraw
// 6) Créer une fonction qui va créer le tableau avec des cells et des divs
// 7) Créer une fonction resetGame à la fin des parties

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

let player = "X";
let gameOver = false;
let playingAgainstComputer = false;

function makeMove(row, col) {
  if (board[row][col] === '' && !gameOver) {
    board[row][col] = player;

    displayBoard();

    if (checkWin(player)) {
      setTimeout(() => {
      }, 100);
      displayMessage(`Le joueur ${player} gagne la partie !`)
      showReplayButton();
      gameOver = true;
      return
    }

    if (checkDraw()) {
      setTimeout(() => {
      }, 100)
      displayMessage("Match nul");
      showReplayButton();
      gameOver = true;
      return;

    }

    if (player === "X") {
      player = "O";
    } else {
      player = "X";
    }
    if (playingAgainstComputer && player === "O" && !gameOver) {
      cpuTurn();
    }
  }
}

function checkWin(gamePlayer) {
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === gamePlayer && board[row][1] === gamePlayer && board[row][2] === gamePlayer) {
      return true;
    }
  }
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === gamePlayer && board[1][col] === gamePlayer && board[2][col] === gamePlayer) {
      return true;
    }

  }
  if (board[0][0] === gamePlayer && board[1][1] === gamePlayer && board[2][2] === gamePlayer) {
    return true;
  }
  if (board[0][2] === gamePlayer && board[1][1] === gamePlayer && board[2][0] === gamePlayer) {
    return true;
  }
  return false
}

function checkDraw() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === '') {
        return false
      }
    }
  }
  return true;
}

function displayBoard() {
  const boardContainer = document.querySelector("#board")
  boardContainer.innerHTML = '';

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement('div');
      cell.classList.add("cell");
      cell.textContent = board[row][col];

      cell.addEventListener("click", function () {
        makeMove(row, col)
      });

      boardContainer.appendChild(cell) // ajouter la cellule dans le board

    }

  }
}

function displayMessage(message) {
  const messageContainer = document.querySelector("#message");
  messageContainer.textContent = message

}

function showReplayButton() {
  const replayButton = document.querySelector("#replayButton");
  replayButton.style.display = "block"
}


function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  player = "X";
  gameOver = false; // réinitialise l'état de la partie
  displayMessage(""); // Effacer le message
  const replayButton = document.querySelector("#replayButton");
  
  displayBoard() // réafficher le board
  playingAgainstComputer = false
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cpuGame() {
  resetGame();
  playingAgainstComputer = true
}

function cpuTurn() {
  if (!gameOver) {
    let emptyCells = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === '') {
          emptyCells.push({ row, col });
        }
      }
    }
    if (emptyCells.length > 0) {
      let randomIndex = randomize(0, emptyCells.length - 1);
      const { row, col } = emptyCells[randomIndex];
      makeMove(row, col)
    }
  }
}

displayBoard();

// faire une fonction qui va montrer le puissance 4 et va cacher le morpion 

let puissance4Board = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
]

let playerOne = "X";
let gameOverPuissance4 = false;

function showPuissance4() {
  document.getElementById('morpionContainer').style.display = 'none';
  document.getElementById('puissance4Container').style.display = 'block';
  document.querySelector('h1').textContent = 'Puissance 4';
  document.querySelector('#replayButton').style.display = 'none'
  document.querySelector('#cpuButton').style.display = 'none'
  document.querySelector('#puissance4Button').style.display = 'none'
  resetPuissance4()
}

function resetPuissance4() {
  puissance4Board = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
  ];
  playerOne = "X";
  gameOverPuissance4 = false; // réinitialise l'état de la partie
  displayMessageP4(""); // Effacer le message
  displayPuissance4Board(); // réafficher le board
  const replayButton = document.querySelector("#replayButton");
  replayButton.style.display = "none";
}

function displayPuissance4Board() {
  const puissance4BoardContainer = document.querySelector("#puissance4Board");
  puissance4BoardContainer.innerHTML = '';

  for (let row = 0; row < puissance4Board.length; row++) {
    for (let col = 0; col < puissance4Board[row].length; col++) {
      const cell = document.createElement('div');
      cell.classList.add('p4-cell');
      cell.textContent = puissance4Board[row][col];
      cell.addEventListener('click', () => makeMovePuissance4(col));
      puissance4BoardContainer.appendChild(cell);
    }
  }
}


function makeMovePuissance4(col) {
  if (!gameOverPuissance4) {
    // Trouver la première case vide dans la colonne
    for (let row = 5; row >= 0; row--) {
      if (puissance4Board[row][col] === '') {
        puissance4Board[row][col] = playerOne;
        break;
      }
    }
    displayPuissance4Board();

    if (checkWinPuissance4(playerOne)) {
      setTimeout(() => {
        displayMessageP4(`Le joueur ${playerOne} gagne la partie !`);
        
      }, 100);
      gameOverPuissance4 = true;
      return;
    }

    if (checkDrawPuissance4()) {
      setTimeout(() => {
        displayMessageP4("Match nul");
      }, 100);
      gameOverPuissance4 = true;
      return;
    }
    if (playerOne === "X") {
      playerOne = "O";
    } else {
      playerOne = "X";
    }
  }
}

function checkWinPuissance4(gamePlayer) {
  // Vérification horizontale
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col <= 3; col++) {
      if (puissance4Board[row][col] === gamePlayer &&
          puissance4Board[row][col + 1] === gamePlayer &&
          puissance4Board[row][col + 2] === gamePlayer &&
          puissance4Board[row][col + 3] === gamePlayer) {
        return true;
      }
    }
  }

  // Vérification verticale
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= 2; row++) {
      if (puissance4Board[row][col] === gamePlayer &&
          puissance4Board[row + 1][col] === gamePlayer &&
          puissance4Board[row + 2][col] === gamePlayer &&
          puissance4Board[row + 3][col] === gamePlayer) {
        return true;
      }
    }
  }

  // Vérification diagonale ascendante (/)
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col <= 3; col++) {
      if (puissance4Board[row][col] === gamePlayer &&
          puissance4Board[row - 1][col + 1] === gamePlayer &&
          puissance4Board[row - 2][col + 2] === gamePlayer &&
          puissance4Board[row - 3][col + 3] === gamePlayer) {
        return true;
      }
    }
  }

  // Vérification diagonale descendante (\)
  for (let row = 0; row <= 2; row++) {
    for (let col = 0; col <= 3; col++) {
      if (puissance4Board[row][col] === gamePlayer &&
          puissance4Board[row + 1][col + 1] === gamePlayer &&
          puissance4Board[row + 2][col + 2] === gamePlayer &&
          puissance4Board[row + 3][col + 3] === gamePlayer) {
        return true;
      }
    }
  }

  return false;
}

function checkDrawPuissance4() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (puissance4Board[row][col] === '') {
        return false; // il reste une case vide donc pas de match nul
      }
    }
  }
  return true; // toutes les cases sont remplies
}

function displayMessageP4(message) {
  const messageContainer = document.querySelector("#messageP4");
  messageContainer.textContent = message;
}



// Bouton pour afficher Puissance 4
document.querySelector("#puissance4Button").addEventListener('click', showPuissance4);
displayPuissance4Board();

function showMorpion(){
  document.getElementById('puissance4Container').style.display = 'none';
  document.getElementById('morpionContainer').style.display = 'block';
  document.querySelector('h1').textContent = 'Le morpion';
  document.querySelector('#replayButton').style.display = 'none';
  document.querySelector('#cpuButton').style.display = 'inline-block';
  document.querySelector('#puissance4Button').style.display = 'inline-block';
  resetGame();
}
