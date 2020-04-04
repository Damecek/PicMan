let width = 600;
let height = 600;
let blockSize = 30;
let nmbOfBlocks = width/blockSize;

let ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

let board = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let wall = new Image();
wall.src =  '../src/wall.png'

let player ={
    x: 8,
    y: 1
};

let hero = new Image();
hero.src = '../src/down.png';

let keys = [];

function renderBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++){
            board[row][col] === 1 ? ctx.drawImage(wall, row * blockSize, col * blockSize, blockSize, blockSize):null;    
        }
    }
}

function draw() {
    ctx.clearRect(player.x * blockSize, player.y * blockSize, blockSize, blockSize);
    renderBoard();
    movement();
    ctx.drawImage(hero, player.x * blockSize, player.y * blockSize, blockSize, blockSize);
}

function movement() {
    if (keys[39]) {
        // šipka doprava
        hero.src = "../src/right.png";
        canMove(player.x + 1, player.y) ? player.x++:null;
    }
 
    if (keys[37]) {
        // šipka doleva
        hero.src = "../src/left.png";
        canMove(player.x - 1, player.y) ? player.x--:null;
    }
 
    if (keys[38]) {
        // šipka nahoru
        hero.src = "../src/up.png";
        canMove(player.x, player.y - 1) ? player.y--:null;
    }
 
    if (keys[40]) {
        // šipka dolů
        hero.src = "../src/down.png";
        canMove(player.x, player.y + 1) ? player.y++:null;
    }
}

function canMove(row, col) {
    return row > 0 && col > 0 && (row < board.length - 1) && (col < board.length - 1) && board[row][col] != 1;
}

window.addEventListener('load', draw);
window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    draw();
});
window.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
    draw();
});
