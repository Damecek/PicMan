let width = 600;
let height = 600;
let blockSize = 30;
let nmbOfBlocks = width/blockSize;
let nmbOfTargets = 6;
let limit = 60000;

let ctx = canvas.getContext('2d');
let score = document.getElementById('score');
let time = document.getElementById('time');
let startBlock = document.getElementById('start');
let endBlock = document.getElementById('end');
let msg = document.getElementById('message');
let btn_playAgain = document.getElementById('btn-playAgain');

let timer = new Date(limit);

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

let hero = new Image();
hero.src = '../src/down.png';

let targetsImg = [
    new Image(),new Image(),new Image(),
    new Image(),new Image(),new Image(), new Image()
];

targetsImg[0].src = '../src/pill1.png';
targetsImg[1].src = '../src/pill2.png';
targetsImg[2].src = '../src/pill3.png';
targetsImg[3].src = '../src/pill4.png';
targetsImg[4].src = '../src/fruit1.png';
targetsImg[5].src = '../src/fruit2.png';
targetsImg[6].src = '../src/tea.png';

let player = getInitPlayerPosition();

let targets = createTargets(nmbOfTargets);

function getInitPlayerPosition() {
    let p;
    do {
        p = {
            x: Math.floor(Math.random() * board.length),
            y: Math.floor(Math.random() * board.length)
        };
    } while (board[p.x][p.y] === 1);
    return p;
};

let keys = [];

function init() {
    draw();
}

function startGame() {
    targets = createTargets(nmbOfTargets);
    timer = new Date(limit);
    time.textContent = `${timer.getMinutes()}:${timer.getSeconds()}`;
    score.textContent = `0/${nmbOfTargets}`;
    draw();
    drawTargets();
    startTimer();
}

function setValues(numbTrgts, timeLimit) {
    nmbOfTargets = numbTrgts;
    limit = timeLimit;
    startBlock.style.display = 'none';
    startGame();
}

function renderBoard() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++){
            board[row][col] === 1 ? ctx.drawImage(wall, row * blockSize, col * blockSize, blockSize, blockSize):null;    
        }
    }
};

function renderScore() {
    score.textContent = (nmbOfTargets - targets.length).toString() + '/' + nmbOfTargets.toString();
}

function startTimer() {
    let countDown = setInterval(function () {
        timer = new Date(timer.getTime() - 1000);
        time.textContent = `${timer.getMinutes()}:${timer.getSeconds()}`;
        if (targets.length === 0) {
            clearInterval(countDown);
            endGame('win');
        }
        if (timer <= 0) {
            clearInterval(countDown);
            endGame('lose');
        }
    },1000);
}

function endGame(state) {
    if (state === 'win') {
        endBlock.style.display = 'block';
        msg.textContent = 'Vyhrál jsi ty fageto-bageto-rageto!¡!';
        msg.classList.add('text-success');
        btn_playAgain.classList.add('btn-success');
    } else if (state === 'lose') {
        endBlock.style.display = 'block';
        msg.textContent = 'Jsi jouda-bouda!!!';
        msg.classList.add('text-danger');
        btn_playAgain.classList.add('btn-danger');
    } else {
        console.log('wrong state');
    }
}

function draw() {
    ctx.clearRect(player.x * blockSize, player.y * blockSize, blockSize, blockSize);
    renderBoard();
    movement();
    collect();
    ctx.drawImage(hero, player.x * blockSize, player.y * blockSize, blockSize, blockSize);
};

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
};

function canMove(row, col) {
    return row > 0 && col > 0 && (row < board.length - 1) && (col < board.length - 1) && board[row][col] != 1;
};

function collect() {
    for (let i = 0; i < targets.length; i++) {
        if (player.x === targets[i].x && player.y === targets[i].y) {
            targets.splice(i, 1);
            renderScore();
        }
    }
}

function createTargets(n) {
    let trg = [];
    for (let i = 0; i < n; i++) {
        trg.push(getTarget());
    }
    return trg;
};

function getTarget() {
    let singleTarget;
    do {
        singleTarget = {
            x: Math.floor(Math.random() * board.length),
            y: Math.floor(Math.random() * board.length),
            img: targetsImg[Math.floor(Math.random() * targetsImg.length)]
        };
    } while (board[singleTarget.x][singleTarget.y] === 1 || (player.x === singleTarget.x && player.y === singleTarget.y));
    return singleTarget;
};

function drawTargets() {
    targets.forEach(t => {
        ctx.drawImage(t.img, t.x * blockSize, t.y * blockSize, blockSize, blockSize);
    });
}

// window.addEventListener('load', startGame);
window.addEventListener('load', init);
window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
    draw();
});
window.addEventListener('keyup', function(e){
    keys[e.keyCode] = false;
    draw();
});
