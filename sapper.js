let bombFrequency = 0.2;

const board = document.querySelectorAll('.board')[0];
const restartBtn = document.querySelectorAll('.minesweeper-btn')[0];
const endscreen = document.querySelectorAll('.endscreen')[0]
const difficultyBtns = document.querySelectorAll('.difficulty');

let cells;
let boardSize = 10;
let bombs = [];
let numbers = [];
let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
let endscreenContent = { win: '<span>Вы выиграли!</span>', loose: '💣 БУМ! Конец игры.' };

let overGame = false;



const setup = function () {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
  cells = document.querySelectorAll('.cell');

  let x = 0;
  let y = 0;
  cells.forEach((cell, i) => {
    cell.setAttribute('data-cell', `${x},${y}`);

    let random_boolean = Math.random() < bombFrequency;
    if (random_boolean) {
      bombs.push(`${x},${y}`);
      if (x > 0) numbers.push(`${x - 1},${y}`);
      if (x < boardSize - 1) numbers.push(`${x + 1},${y}`);
      if (y > 0) numbers.push(`${x},${y - 1}`);
      if (y < boardSize - 1) numbers.push(`${x},${y + 1}`);

      if (x > 0 && y > 0) numbers.push(`${x - 1},${y - 1}`);
      if (x < boardSize - 1 && y < boardSize - 1) numbers.push(`${x + 1},${y + 1}`);

      if (y > 0 && x < boardSize - 1) numbers.push(`${x + 1},${y - 1}`);
      if (x > 0 && y < boardSize - 1) numbers.push(`${x - 1},${y + 1}`);
    }

    x++;
    if (x >= boardSize) {
      x = 0;
      y++;
    }

    cell.oncontextmenu = function (eve) {
      eve.preventDefault();
      flag(cell);
    }

    cell.addEventListener('click', function (eve) {
      clickCell(cell);
    });
    cell.addEventListener('dblclick', function (eve) {
      doubleClick(cell);
    });
  });

  numbers.forEach(num => {
    let coords = num.split(',');
    let cell = document.querySelectorAll(`[data-cell="${parseInt(coords[0])},${parseInt(coords[1])}"]`)[0];
    let dataNum = parseInt(cell.getAttribute('data-num'));
    if (!dataNum) dataNum = 0;
    cell.setAttribute('data-num', dataNum + 1);
  });
}


function flag(cell) {
  if (overGame) return;
  if (!cell.classList.contains('cell--checked')) {
    if (!cell.classList.contains('cell--flagged')) {
      cell.innerHTML = '🚩';
      cell.classList.add('cell--flagged');
    } else {
      cell.innerHTML = '';
      cell.classList.remove('cell--flagged');
    }
  }
}


const clickCell = function (cell) {
  if (overGame) return;
  if (cell.classList.contains('cell--checked') || cell.classList.contains('cell--flagged')) return;
  let coordinate = cell.getAttribute('data-cell');
  if (bombs.includes(coordinate)) {
    endGame(cell);
  } else {

    let num = cell.getAttribute('data-num');
    if (num != null) {
      cell.classList.add('cell--checked');
      cell.innerHTML = num;
      cell.style.color = numberColors[num - 1];
      setTimeout(() => {
        checkVictory();
      }, 100);
      return;
    }

    checkCell(cell, coordinate);
  }
  cell.classList.add('cell--checked');
}

const doubleClick = function (cell) {
  if (overGame) return;
  if (cell.classList.contains('cell--flagged')) return;
  if (cell.classList.contains('cell--checked')) {

  }
}

const checkCell = function (cell, coordinate) {
  let coords = coordinate.split(',');
  let x = parseInt(coords[0]);
  let y = parseInt(coords[1]);

  setTimeout(() => {
    if (x > 0) {
      let targetW = document.querySelectorAll(`[data-cell="${x - 1},${y}"`)[0];
      clickCell(targetW, `${x - 1},${y}`);
    }
    if (x < boardSize - 1) {
      let targetE = document.querySelectorAll(`[data-cell="${x + 1},${y}"`)[0];
      clickCell(targetE, `${x + 1},${y}`);
    }
    if (y > 0) {
      let targetN = document.querySelectorAll(`[data-cell="${x},${y - 1}"]`)[0];
      clickCell(targetN, `${x},${y - 1}`);
    }
    if (y < boardSize - 1) {
      let targetS = document.querySelectorAll(`[data-cell="${x},${y + 1}"]`)[0];
      clickCell(targetS, `${x},${y + 1}`);
    }

    if (x > 0 && y > 0) {
      let targetNW = document.querySelectorAll(`[data-cell="${x - 1},${y - 1}"`)[0];
      clickCell(targetNW, `${x - 1},${y - 1}`);
    }
    if (x < boardSize - 1 && y < boardSize - 1) {
      let targetSE = document.querySelectorAll(`[data-cell="${x + 1},${y + 1}"`)[0];
      clickCell(targetSE, `${x + 1},${y + 1}`);
    }

    if (y > 0 && x < boardSize - 1) {
      let targetNE = document.querySelectorAll(`[data-cell="${x + 1},${y - 1}"]`)[0];
      clickCell(targetNE, `${x + 1},${y - 1}`);
    }
    if (x > 0 && y < boardSize - 1) {
      let targetSW = document.querySelectorAll(`[data-cell="${x - 1},${y + 1}"`)[0];
      clickCell(targetSW, `${x - 1},${y + 1}`);
    }
  }, 10);
}


function endGame(cell) {
  endscreen.innerHTML = endscreenContent.loose;
  endscreen.classList.add('show');
  overGame = true;
  cells.forEach(cell => {
    let coordinate = cell.getAttribute('data-cell');
    if (bombs.includes(coordinate)) {
      cell.classList.remove('cell--flagged');
      cell.classList.add('cell--checked', 'cell--bomb');
      cell.innerHTML = '💣';
    }
  });
}

function checkVictory() {
  let win = true;
  cells.forEach(cell => {
    let coordinate = cell.getAttribute('data-cell');
    if (!cell.classList.contains('cell--checked') && !bombs.includes(coordinate)) win = false;
  });
  if (win) {
    endscreen.innerHTML = endscreenContent.win;
    endscreen.classList.add('show');
    overGame = true;
  }
}

function clear() {
    overGame = false;
    bombs = [];
    numbers = [];
    endscreen.innerHTML = '';
    endscreen.classList.remove('show');
    cells.forEach(cell => {
    cell.remove();
  });
  setup();
}

setup();

restartBtn.addEventListener('click', function (eve) {
  eve.preventDefault();
  clear();
});


difficultyBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    bombFrequency = this.value;
    clear();
  });
});