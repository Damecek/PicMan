const SIZE = 20;
const THRESHOLD = 0.3;
const WIDTH = 600;
const HEIGHT = 600;
const BLOCK_SIZE = 30;

let nmbOfBlocks = WIDTH/BLOCK_SIZE;

let ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

let wall = new Image();
wall.src =  '../src/wall.png'
