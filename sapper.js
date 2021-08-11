let size = 10;
let bombFrequency = 0.2;
let cellSize = 50;

const board = document.querySelectorAll('.board')[0];

const restartBtn = document.querySelectorAll('.minesweeper-btn')[0];
const endscreen = document.querySelectorAll('.endscreen')[0]

const boardSizeBtn = document.getElementById('boardSize');
const cellsSizeBtn = document.getElementById('cellSize');
const difficultyBtns = document.querySelectorAll('.difficulty');

let cells;
let boardSize;
let bombs = [];
let numbers = [];
let numberColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];
let endscreenContent = { win: '<span>Вы выиграли!</span>', loose: '💣 БУМ! Конец игры.' };

let gameOver = false;