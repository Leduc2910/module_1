let board = [];
let rows = 20;
let cols = 20;

let wallLocation = [];

// let selectSD = true;
// let createWall = false;

let sourceCell = null;
let destinationCell = null;

let playGame = false;

window.onload = function () {
    mazeGenerator();
}

function reloadGame() {
    window.location.reload();
}

window.addEventListener('keydown', moveSourceCell);


// tạo mê cung ngẫu nhiên
function boardInit() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let id = i.toString() + '-' + j.toString();
            wallLocation.push(id);
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

function check(root, cell) {
    let i_root = parseInt(root.split('-')[0]);
    let j_root = parseInt(root.split('-')[1]);
    let i_cell = parseInt(cell.split('-')[0]);
    let j_cell = parseInt(cell.split('-')[1]);
    let first = wallLocation.includes(cell)
    let second = wallLocation.includes((i_root + i_cell) / 2 + '-' + (j_root + j_cell) / 2);
    return (first && second);
}

function destroyWall(root, cell) {
    let i_root = parseInt(root.split('-')[0]);
    let j_root = parseInt(root.split('-')[1]);
    let i_cell = parseInt(cell.split('-')[0]);
    let j_cell = parseInt(cell.split('-')[1]);
    let index_cell = wallLocation.indexOf(cell);
    let index_middle = wallLocation.indexOf((i_root + i_cell) / 2 + '-' + (j_root + j_cell) / 2);
    wallLocation.splice(index_cell, 1);
    wallLocation.splice(index_middle, 1);
}

function drill(probability) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (wallLocation.includes(i.toString() + '-' + j.toString())) {
                let random = Math.floor(Math.random() * 100 / (100 - probability));
                if (random > 1) {
                    let index = wallLocation.indexOf(i.toString() + '-' + j.toString());
                    wallLocation.splice(index, 1);
                }
            }
        }
    }
}

function generator() {
    let randomIndexSource = Math.floor(Math.random() * 3);
    let stack = [];

    stack.push(0 + '-' + randomIndexSource.toString());
    while (stack.length > 0) {
        let id = stack.pop();
        let candidate = [
            (id.split('-')[0] + '-' + (parseInt(id.split('-')[1]) - 2)),
            ((parseInt(id.split('-')[0]) - 2) + '-' + id.split('-')[1]),
            ((parseInt(id.split('-')[0]) + 2) + '-' + id.split('-')[1]),
            (id.split('-')[0] + '-' + (parseInt(id.split('-')[1]) + 2))
        ]

        let neighbors = [];
        for (let i = 0; i < candidate.length; i++) {
            if (isInsideGrid(id) && check(id, candidate[i])) {
                neighbors.push(candidate[i]);
            }
        }
        while (neighbors.length > 0) {
            let randomIndex = Math.floor(Math.random() * neighbors.length);
            let neighbor = neighbors.splice(randomIndex, 1)[0];
            let probability = Math.floor(Math.random() * 100 / 2);
            if (probability > 1) {
                destroyWall(id, neighbor);
                stack.push(neighbor);
            }
        }
    }
    drill(70);
}

function mazeGenerator() {
    // document.getElementById('selectSD-button').addEventListener('click', setButton);
    document.getElementById('playButton').addEventListener('click', setButton);

    boardInit();
    generator();
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.id = i.toString() + '-' + j.toString();
            if (wallLocation.includes(cell.id)) {
                cell.classList.add('wall');
                imgTree(cell);
            }
            // cell.addEventListener('click', clickCell);
            document.getElementById('board').append(cell);
            row.push(cell);
        }
        board.push(row);
    }
    randomSourceDestination();
}

function randomSourceDestination() {
    let randomRowIndexS, randomColIndexS, randomRowIndexD, randomColIndexD;
    do {
        randomRowIndexS = Math.floor(Math.random() * rows);
        randomColIndexS = Math.floor(Math.random() * cols);
    } while (wallLocation.includes(randomRowIndexS.toString() + '-' + randomColIndexS.toString()));
    sourceCell = board[randomRowIndexS][randomColIndexS];
    sourceCell.classList.add('source');
    imgSource(sourceCell);
    do {
        do {
            randomRowIndexD = Math.floor(Math.random() * rows);
            randomColIndexD = Math.floor(Math.random() * cols);
        } while (wallLocation.includes(randomRowIndexD.toString() + '-' + randomColIndexD.toString()));
        destinationCell = board[randomRowIndexD][randomColIndexD];
    } while (sourceCell === destinationCell || Math.abs(randomRowIndexS - randomRowIndexD) < 10 || Math.abs(randomColIndexS - randomColIndexD) < 10);
    destinationCell.classList.add('destination');
    imgDestination(destinationCell);
}


function setButton() {
    if (playGame) {
        playGame = false;
        document.getElementById('playButton').innerHTML = `<img src="Elements/playButton2.png" width="150">`
        return;
    } else {
        startTimer();
        playGame = true;
        document.getElementById('playButton').innerHTML = `<img src="Elements/playbutton.png" width="150">`
        return;
    }
}

function digWall() {

}

// function clickCell() {
//     let cell = this;
//     if (!wallLocation.includes(cell.id)) {
//         if (selectSD) {
//             if (sourceCell) {
//                 if (destinationCell) {
//                     for (let i = 0; i < rows; i++) {
//                         for (let j = 0; j < cols; j++) {
//                             if (board[i][j].classList.contains('path')) {
//                                 board[i][j].classList.remove('path');
//                             }
//                         }
//                     }
//                     while (sourceCell.firstChild) {
//                         sourceCell.removeChild(sourceCell.firstChild);
//                     }
//                     while (destinationCell.firstChild) {
//                         destinationCell.removeChild(destinationCell.firstChild);
//                     }
//                     sourceCell.classList.remove('source');
//                     destinationCell.classList.remove('destination');
//                     sourceCell = null;
//                     destinationCell = null;
//                     cell.classList.add('source');
//                     sourceCell = cell;
//                     imgSource(cell);
//                 } else {
//                     if (cell === sourceCell) {
//                         alert('Điểm xuất phát trùng với điểm đích!!!');
//                     } else {
//
//                         cell.classList.add('destination');
//                         destinationCell = cell;
//                         imgDestination(cell);
//                     }
//                 }
//             } else {
//                 cell.classList.add('source');
//                 sourceCell = cell;
//                 imgSource(cell);
//             }
//         } else if (createWall && !wallLocation.includes(cell.id)) {
//             if (cell.classList.contains('source') || cell.classList.contains('destination') || cell.classList.contains('path')) {
//                 while (sourceCell.firstChild) {
//                     sourceCell.removeChild(sourceCell.firstChild);
//                 }
//                 while (destinationCell.firstChild) {
//                     destinationCell.removeChild(destinationCell.firstChild);
//                 }
//                 for (let i = 0; i < rows; i++) {
//                     for (let j = 0; j < cols; j++) {
//                         if (board[i][j].classList.contains('path')) {
//                             board[i][j].classList.remove('path');
//                         }
//                     }
//                 }
//                 destinationCell.classList.remove('destination');
//                 sourceCell.classList.remove('source');
//                 destinationCell = null;
//                 sourceCell = null;
//                 wallLocation.push(cell.id);
//                 cell.classList.add('wall');
//                 imgTree(cell);
//             } else {
//                 wallLocation.push(cell.id);
//                 cell.classList.add('wall');
//                 imgTree(cell);
//             }
//         }
//     }
// }

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
                    window.location.reload();
                    // playGame = false;
                    // document.getElementById('playButton').innerHTML = `<img src="Elements/playButton2.png" width="150">`
                    // count = 0;
                    // document.getElementById('count').innerHTML = count;
                } else {
                    while (sourceCell.firstChild) {
                        sourceCell.removeChild(sourceCell.firstChild);
                    }
                    newCell.classList.add('source');
                    imgSource(newCell);
                    sourceCell.classList.remove('source');
                    sourceCell = newCell;
                    count++;
                    document.getElementById('count').innerHTML = count;
                }
            }
        }
    }
}

let startTime = null;
let elapsedTime = 0;


function formatTime(seconds) {
    const MINUTE = Math.floor((seconds % 3600) / 60);
    const REMAININGSECOND = Math.floor(seconds % 60);

    const FORMATTIME = `${padZero(MINUTE)}:${padZero(REMAININGSECOND)}`;
    return FORMATTIME;
}

function padZero(number) {
    return (number < 10) ? `0${number}` : number;
}

function updateTimer() {
    const currentTime = new Date().getTime();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);

    document.getElementById('time').innerHTML = formatTime(elapsedTime);
}

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}


function imgSource(cell) {
    let img = document.createElement('img');
    img.src = 'Elements/source.png';
    img.style.width = '28px';
    img.style.height = '28px';
    cell.appendChild(img);
}

function imgDestination(cell) {
    let img = document.createElement('img');
    img.src = 'Elements/destination.png';
    img.style.width = '28px';
    img.style.height = '28px';
    cell.appendChild(img);
}

function imgTree(cell) {
    let img = document.createElement('img');
    img.src = 'Elements/tree.png';
    img.style.width = '28px';
    img.style.height = '28px';
    cell.appendChild(img);
}