let board = [];
let rows = 20;
let cols = 20;

let wallLocation = [];

let selectSD = false;
let sourceCell = null;
let destinationCell = null;

let playGame = false;

window.onload = function () {
    startGame();
}

window.addEventListener('keydown', moveSourceCell);

function setWalls(probability) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let isWall = Math.random() < 0.3;
            if (isWall) {
                let id = i.toString() + '-' + j.toString();
                wallLocation.push(id);
            }
        }
    }
}

function isInsideGrid(id) {
    let i = parseInt(id.split('-')[0]);
    let j = parseInt(id.split('-')[1]);
    if (i < 0 || i >= rows || j < 0 || j >= cols) {
        return false;
    }
    return true;
}
function check(root, cell ) {
    let first =
}

function createWall() {
    let randomIndexSource = Math.floor(Math.random() * 3);
    let stack = [];

    stack.push(0 + '-' + randomIndexSource.toString());
    while (stack.length > 0) {
        let id = stack.pop();
        let gcandidate = [
            (id.split('-')[0] + '-' + (parseInt(id.split('-')[1]) - 2)),
            ((parseInt(id.split('-')[0]) - 2) + '-' + id.split('-')[1]),
            ((parseInt(id.split('-')[0]) + 2) + '-' + id.split('-')[1]),
            (id.split('-')[0] + '-' + (parseInt(id.split('-')[1]) + 2))
        ]

        let neighbors = [];
        for (let i = 0; i < gcandidate.length; i++) {
            if (isInsideGrid(id) && check(id, gcandidate[i])) {
                neighbors.push(gcandidate[i]);
            }
        }
        while (neighbors.length > 0) {

        }
    }


}

function startGame() {
    document.getElementById('selectSD-button').addEventListener('click', setButton);
    document.getElementById('selectP-button').addEventListener('click', setButton);
    setWalls(50);
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.id = i.toString() + '-' + j.toString();
            if (wallLocation.includes(cell.id)) {
                cell.classList.add('wall');
            }
            cell.addEventListener('click', clickCell);
            document.getElementById('board').append(cell);
            row.push(cell);
        }
        board.push(row);
    }
}

function setButton() {
    if (selectSD) {
        selectSD = false;
        playGame = true;
        document.getElementById('mode').innerHTML = 'Playing';
        document.getElementById('selectSD-button').innerHTML = `<img src="Elements/redS.png" width="150">`;
        document.getElementById('selectP-button').innerHTML = `<img src="Elements/greenP.png" width="150">`;
    } else {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (board[i][j].classList.contains('path')) {
                    board[i][j].classList.remove('path');
                }
            }
        }
        selectSD = true;
        playGame = false;
        document.getElementById('mode').innerHTML = 'Selecting source & destination';
        document.getElementById('selectSD-button').innerHTML = `<img src="Elements/greenS.png" width="150">`;
        document.getElementById('selectP-button').innerHTML = `<img src="Elements/redP.png" width="150">`;
    }
}

function clickCell() {
    let cell = this;
    if (!wallLocation.includes(cell.id)) {
        if (selectSD) {
            if (sourceCell) {
                if (destinationCell) {
                    // if(cell.classList.contains('path')) {
                    //     cell.classList.remove('path');
                    // }
                    sourceCell.classList.remove('source');
                    destinationCell.classList.remove('destination');
                    sourceCell = null;
                    destinationCell = null;
                    cell.classList.add('source');
                    sourceCell = cell;
                } else {
                    if (cell === sourceCell) {
                        alert('Điểm xuất phát trùng với điểm đích!!!');
                    } else {
                        cell.classList.add('destination');
                        destinationCell = cell;
                    }
                }
            } else {
                cell.classList.add('source');
                sourceCell = cell;
            }
        }
    }
}

let count = 0;

function moveSourceCell(event) {

    if (playGame) {
        if (sourceCell && destinationCell) {
            let newCell = null;
            if (event.key === 'ArrowUp') {
                newCell = document.getElementById((parseInt(sourceCell.id.split('-')[0]) - 1) + '-' + sourceCell.id.split('-')[1]);
            } else if (event.key === 'ArrowDown') {
                newCell = document.getElementById((parseInt(sourceCell.id.split('-')[0]) + 1) + '-' + sourceCell.id.split('-')[1]);
            } else if (event.key === 'ArrowLeft') {
                newCell = document.getElementById(sourceCell.id.split('-')[0] + '-' + (parseInt(sourceCell.id.split('-')[1]) - 1));
            } else if (event.key === 'ArrowRight') {
                newCell = document.getElementById(sourceCell.id.split('-')[0] + '-' + (parseInt(sourceCell.id.split('-')[1]) + 1));
            }
            if (newCell && !wallLocation.includes(newCell.id)) {
                if (newCell.id === destinationCell.id) {
                    alert('Chúc mừng bạn!!!');
                    document.getElementById('count').innerHTML = count;
                    playGame = false;
                } else if (newCell.classList.contains('path')) {
                    newCell.classList.remove('path');
                    newCell.classList.add('source');
                    sourceCell.classList.remove('source');
                    sourceCell.classList.add('path');
                    sourceCell = newCell;
                    count++;
                    document.getElementById('count').innerHTML = count;
                } else {
                    newCell.classList.add('source');
                    sourceCell.classList.remove('source');
                    sourceCell.classList.add('path');
                    sourceCell = newCell;
                    count++;
                    document.getElementById('count').innerHTML = count;
                }
            }
        }
    }
}

