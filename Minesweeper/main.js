let board = [];
let rows = 8;
let cols = 8;

let minesCount = 5;
let minesLocation = [];

let tilesClicked = 0;
let flagEnabled = false;

let gameOver = false;

window.onload = function() {
    startGame();
}

function setMines() {
    // minesLocation.push("2-2");
    // minesLocation.push("2-3");
    // minesLocation.push("5-6");
    // minesLocation.push("3-4");
    // minesLocation.push("1-1");
    let minesLeft = minesCount;
    while (minesLeft >0) {
        let i = Math.floor(Math.random()*rows);
        let j = Math.floor(Math.random()*cols);
        let id = i.toString() + '-' + j.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame() {
    document.getElementById('mines-count').innerHTML = minesCount;
    document.getElementById('flag-button').addEventListener('click', setFlag);
    setMines();
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let tile = document.createElement('div');
            tile.id = i.toString() + '-' + j.toString();
            tile.addEventListener('click', clickTile);
            document.getElementById('board').append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById('flag-button').style.backgroundColor = 'lightgray';
    } else {
        flagEnabled = true;
        document.getElementById('flag-button').style.backgroundColor = 'darkgray';
    }
}

function clickTile() {
    if (gameOver || this.classList.contains('tile-clicked')) {
        return;
    }
    let tile = this;
    if (flagEnabled) {
        if (tile.innerHTML == '') {
            tile.innerHTML = '🚩';
        } else if (tile.innerHTML == '🚩') {
            tile.innerHTML = '';
        }
        return;
    }
    if (minesLocation.includes(tile.id)) {
        alert('GAME OVER');
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split('-');
    let i = parseInt(coords[0]);
    let j = parseInt(coords[1]);
    checkMines(i, j);
}

function revealMines() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let tile = board[i][j];
            if (minesLocation.includes(tile.id)) {
                tile.innerHTML = '💣'
                tile.style.backgroundColor = 'red';
            }
        }
    }
}

function checkMines(i, j) {
    if (i < 0 || i >= rows || j < 0 || j >= cols) {
        return;
    }
    if (board[i][j].classList.contains('tile-clicked')) {
        return;
    }
    board[i][j].classList.add('tile-clicked');
    tilesClicked += 1;

    let minesFound = 0;

    minesFound += checkTile(i - 1, j - 1);  // top left
    minesFound += checkTile(i - 1, j);  // top
    minesFound += checkTile(i - 1, j + 1);  // top right

    minesFound += checkTile(i, j - 1);  // left
    minesFound += checkTile(i, j + 1);  // right

    minesFound += checkTile(i + 1, j - 1);  // bottom left
    minesFound += checkTile(i + 1, j);  // bottom
    minesFound += checkTile(i + 1, j + 1);  // bottom right

    if (minesFound > 0) {
        board[i][j].innerHTML = minesFound;
        board[i][j].classList.add('x' + minesFound.toString());
    } else {
        board[i][j].innerHTML = '';

        checkMines(i - 1, j - 1);  // top left
        checkMines(i - 1, j);  // top
        checkMines(i - 1, j + 1);  // top right

        checkMines(i, j - 1);  // left
        checkMines(i, j + 1);  // right

        checkMines(i + 1, j - 1);  // bottom left
        checkMines(i + 1, j);  // bottom
        checkMines(i + 1, j + 1);  // bottom right
    }
    if (tilesClicked == rows * cols - minesCount) {
        document.getElementById('mines-count').innerHTML = Cleared;
        gameOver = true;
    }
}

function checkTile(i, j) {
    if (i < 0 || i >= rows || j < 0 || j >= cols) {
        return 0;
    }
    if (minesLocation.includes(i.toString() + '-' + j.toString())) {
        return 1;
    }
    return 0;
}