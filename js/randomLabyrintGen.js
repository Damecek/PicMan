function generateLabyrinth(size, threshold) {
    function getBoard(size) {
        return [...Array(size)].map(i => Array(size).fill(0));
    }

    function getBorderedBoard(size) {
        let b = getBoard(size);
        for (let col = 0; col < size; col++){
            b[0][col] = 1;
            b[size - 1][col] = 1;
        }
        
        for (let row = 0; row < size; row++){
            b[row][0] = 1;
            b[row][size - 1] = 1;
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
        for (let row = 0; row < board.length; row++){
            for (col = 0; col < board.length; col++){
                rB[row][col] = rankNode(board, row, col);
            }
        }
        return rB;
    }
    
    function getRandomMinCoord(rB){
        let min = 1;
        let minList = [];
        for (let row = 1; row < rB.length - 1; row++){
            for (col = 1; col < rB.length - 1; col++){
                if (min > rB[row][col]) {
                    min = rB[row][col];
                    minList = [{'row': row, 'col': col}];
                } else if (min === rB[row][col]) {
                    minList.push({row, col});
                }
            }
        }    
        return minList[Math.floor(Math.random() * minList.length)];
    }
    // start

    let board = getBorderedBoard(size);
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

function printBoard(board){
    let line = '';
    for (let row = 0; row < rB.length; row++){
        for (col = 0; col < rB.length; col++){
            line += board[row][col] == 1 ? 'x' : ' ';
        }
        console.log(line);
        line = '';
    }    
}

function newBoard() {
    renderBoard(generateLabyrinth(20, 0.5));
}

let width = 600;
let height = 600;
canvas.width = width;
canvas.height = height;
let blockSize = 30;
let ctx = canvas.getContext('2d');

let wall = new Image();
wall.src =  '../src/wall.png'

function renderBoard(board) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++){
            ctx.clearRect(row * blockSize, col * blockSize, blockSize, blockSize);    
            board[row][col] === 1 ? ctx.drawImage(wall, row * blockSize, col * blockSize, blockSize, blockSize):null;    
        }
    }
}

window.addEventListener('load', renderBoard(generateLabyrinth(20, 0.3)));
