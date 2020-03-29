function generate(size) {
    if (size <= 2) {return null;}
    let board = setBoarders([...Array(size)].map(i => Array(size).fill(0)));
    let n = size * size;
    let pos = [Math.round(Math.random() * (size - 1)), Math.round(Math.random() * (size - 1))];
    // let wallDropRate = 0.5;
    let opp = [];

    
    while(size > 0) {
        if (pos[0] - 1 > 0) {opp.push([pos[0] - 1, pos[1]]);}
        if (pos[0] + 1 < board.length) {opp.push([pos[0] + 1, pos[1]]);}
        if (pos[1] - 1 > 0) {opp.push([pos[0], pos[1] - 1]);}
        if (pos[1] + 1 < board.length) {opp.push([pos[0], pos[1] + 1]);}

        board[pos[0][pos[1]]] = 1;
        let next = opp.pop();
        if (!board[next[0]][next[1]]) {
            pos = next;
            n -= 1;
        } else {
            
        }
    }
}

function setBoarders(board) {
    for (let col = 0; col < board.length; col++){
        board[0][col] = -1;
        board[board.length - 1][col] = -1;
    }
    
    for (let row = 0; row < board.length; row++){
        board[row][0] = -1;
        board[row][board.length - 1] = -1;
    }
    return board;
}

function randomDirection() {
    switch (Math.round(Math.random() * 3)) {
        case 0:
            return [1, 0]; //right
            break;
    
        case 1:
            return [0, 1]; //up
            break;

        case 2:
            return [-1, 0]; //left
            break;

        case 3:
            return [0, -1]; //down
            break;

        default:
            return null;
            break;
    }
}

generate(4);