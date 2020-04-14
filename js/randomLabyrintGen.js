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

function getPlusBoard() {
    let b = getBorderedBoard();
    b[SIZE/2][1] = 1;
    b[SIZE/2 - 1][1] = 1;
    b[SIZE/2][SIZE - 2] = 1;
    b[SIZE/2 - 1][SIZE - 2] = 1;
    b[1][SIZE/2] = 1;
    b[1][SIZE/2 - 1] = 1;
    b[SIZE - 2][SIZE/2] = 1;
    b[SIZE - 2][SIZE/2 - 1] = 1;
    return b;
}

function isBrakingContinuity(board, node) { //too many cpu operations
    function neibPaths(board, node){
        let neibs = [];
        for (let row = -1; row < 2; row++){
            for (let col = -1; col < 2; col++){
                if (col === 0 && row == 0){
                    //pass
                }
                else if (board[node.row + row][node.col + col] === 0){
                    neibs.push({'row': node.row + row, 'col': node.col + col});
                }
            }
        }
        return neibs;
    }
    board[node.row][node.col] = 1;
    let trace = [];
    let stack = [node];    
    while (stack.length > 0) {
        neibPaths(board, stack.pop()).forEach(e => {
            if (trace.includes(e) || stack.includes(e)){
                //pass
            } else {
                stack.push(e);
                trace.push(e);
            }
        });
    }
    for (let row = 1; row < board.length - 1; row++) {
        for (let col = 1; col < board.length - 1; col++) {
            if (board[row][col] === 0 && !trace.includes({'row': row, 'col': col})){
                return true;
            }
        }
    }
    return false;
}

function rankNode(board, row, col) { // TODO: if node brake continuity then 1
    if (board[row][col] === 1) {
        return 1;
    }
    /* if (isBrakingContinuity(board, {'row': row, 'col': col})){
        return 1;
    } */
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
        for (let col = 0; col < board.length; col++) {
            rB[row][col] = rankNode(board, row, col);
        }
    }
    return rB;
}

function getRandomMinCoord(rB) {
    let min = 1;
    let minList = [];
    for (let row = 1; row < rB.length - 1; row++) {
        for (let col = 1; col < rB.length - 1; col++) {
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
        for (let col = 0; col < rB.length; col++) {
            line += board[row][col] == 1 ? 'x' : ' ';
        }
        console.log(line);
        line = '';
    }
}

function generateLabyrinth(THRESHOLD, type) {
    let board;
    switch (type) {
        case 'bordered':
            board = getBorderedBoard(SIZE);
            break;
        case 'plus':
            board = getPlusBoard();
            break;
        default:
            board = getBorderedBoard(SIZE);
            break;
    }
    let boardMin = 0;
    let rB;
    while (boardMin <= THRESHOLD) {
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
    renderBoard(generateLabyrinth(
        document.getElementById('input-threshold').value,
        document.getElementById('input-type').value)
    );
}

// start
window.addEventListener('load', newBoard());