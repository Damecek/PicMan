function getBoard() {
    return [...Array(SIZE)].map(i => Array(SIZE).fill(0));
}

function getBorderedBoard() {
    let b = getBoard();
    for (let col = 0; col < SIZE; col++) {
        b[0][col] = 1;
        b[SIZE - 1][col] = 1;
    }

    for (let row = 0; row < SIZE; row++) {
        b[row][0] = 1;
        b[row][SIZE - 1] = 1;
    }
    return b; //with boarders
}


function rankNode(board, row, col) { // TODO: if node brake continuity than 1
    if (board[row][col] === 1) {
        return 1;
    }
    let neib = 0;
    neib += board[row + 1][col - 1];
    neib += board[row + 1][col];
    neib += board[row + 1][col + 1];
    neib += board[row][col - 1];
    neib += board[row][col + 1];
    neib += board[row - 1][col - 1];
    neib += board[row - 1][col];
    neib += board[row - 1][col + 1];
    return neib / 8;
}

function rankBoard(board) {
    rB = getBoard(board.length);
    for (let row = 0; row < board.length; row++) {
        for (col = 0; col < board.length; col++) {
            rB[row][col] = rankNode(board, row, col);
        }
    }
    return rB;
}

function getRandomMinCoord(rB) {
    let min = 1;
    let minList = [];
    for (let row = 1; row < rB.length - 1; row++) {
        for (col = 1; col < rB.length - 1; col++) {
            if (min > rB[row][col]) {
                min = rB[row][col];
                minList = [{ 'row': row, 'col': col }];
            } else if (min === rB[row][col]) {
                minList.push({ row, col });
            }
        }
    }
    return minList[Math.floor(Math.random() * minList.length)];
}

function printBoard(board) {
    let line = '';
    for (let row = 0; row < rB.length; row++) {
        for (col = 0; col < rB.length; col++) {
            line += board[row][col] == 1 ? 'x' : ' ';
        }
        console.log(line);
        line = '';
    }
}

function generateLabyrinth(threshold) {
    let board = getBorderedBoard(SIZE);
    let boardMin = 0;
    let rB;
    while (boardMin <= threshold) {
        rB = rankBoard(board);
        minCoord = getRandomMinCoord(rB);
        board[minCoord.row][minCoord.col] = 1;
        boardMin = rB[minCoord.row][minCoord.col];
    }
    return board;
}

function renderBoard(board) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            ctx.clearRect(row * BLOCK_SIZE, col * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            board[row][col] === 1 ? ctx.drawImage(wall, row * BLOCK_SIZE, col * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE) : null;
        }
    }
}

function newBoard() {
    renderBoard(generateLabyrinth(THRESHOLD));
}

// SETTINGS
const SIZE = 20;
const THRESHOLD = 0.3;
const WIDTH = 600;
const HEIGHT = 600;
const BLOCK_SIZE = 30;

canvas.width = WIDTH;
canvas.height = HEIGHT;
let ctx = canvas.getContext('2d');

let wall = new Image();
wall.src = '../src/wall.png';

// start
window.addEventListener('load', newBoard());
