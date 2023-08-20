let board = [];
let rows = 20;
let cols = 20;

let wallLocation = [];
let enemiesLocation = [];

let sourceCell = null;
let destinationCell = null;

let playGame = false;
let axeStatus = false;

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
    drill(82);
}

function mazeGenerator() {
    document.getElementById('axe').addEventListener('click', setAxe);
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
    randomEnemies();
    randomEnemies();
}

function distance(a1, b1, a2, b2) {
    return Math.sqrt(Math.pow((a1 - a2), 2) + Math.pow((b1 - b2), 2));
}

function distance2(a1, a2) {

    return Math.abs(a1 - a2);
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
    } while (sourceCell === destinationCell || distance2(randomRowIndexS, randomRowIndexD) < 10 || distance2(randomColIndexS, randomColIndexD) < 10);
    destinationCell.classList.add('destination');
    imgDestination(destinationCell);
}


function addition() {
    let numberPokemon = +document.getElementById('numberP').value;
    if (!playGame) {
        if (numberPokemon < 4) {
            numberPokemon++
            randomEnemies();
        }
        document.getElementById('numberP').value = numberPokemon;
    }
}

function subtraction() {
    let numberPokemon = +document.getElementById('numberP').value;
    if (!playGame) {
        if (numberPokemon > 0) {
            numberPokemon--;
            deleteEnemies();
        }
        document.getElementById('numberP').value = numberPokemon;
    }
}

function randomEnemies() {
    let randomRowIndex, randomColIndex, enemy, id, isClosed;
    let rowDestination = parseInt(destinationCell.id.split('-')[0]);
    let colDestination = parseInt(destinationCell.id.split('-')[1]);
    do {
        randomRowIndex = Math.floor(Math.random() * rows);
        randomColIndex = Math.floor(Math.random() * cols);
        id = randomRowIndex.toString() + '-' + randomColIndex.toString();

        isClosed = false;
        for (let i = 0; i < enemiesLocation.length; i++) {
            let rowEnemy = parseInt(enemiesLocation[i].split('-')[0]);
            let colEnemy = parseInt(enemiesLocation[i].split('-')[1]);
            if (distance(rowEnemy, colEnemy, randomRowIndex, randomColIndex) < 4) {
                isClosed = true;
                break;
            }
        }
    } while (isClosed || enemiesLocation.includes(id) || wallLocation.includes(id) || sourceCell.id === id || destinationCell === id || distance(randomRowIndex, randomColIndex, rowDestination, colDestination) > 10 || distance(randomRowIndex, randomColIndex, rowDestination, colDestination) < 4) ;
    enemy = board[randomRowIndex][randomColIndex];
    enemy.classList.add('enemy');
    enemiesLocation.push(id);
    imgGengar(enemy);
}

function deleteEnemies() {
    let randomIndex = Math.floor(Math.random() * enemiesLocation.length);
    let cell = document.getElementById(enemiesLocation[randomIndex]);
    console.log(cell);
    enemiesLocation.splice(randomIndex, 1);
    cell.classList.remove('enemy');
    while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
    }
}

function moveEnemies() {
    let turn = 1;
    if (playGame) {
        for (let i = 0; i < enemiesLocation.length; i++) {
            let id = enemiesLocation[i];
            let rowEnemy = parseInt(id.split('-')[0]);
            let colEnemy = parseInt(id.split('-')[1]);
            let enemy = document.getElementById(id);
            if (turn % 2 !== 0) {
                if (!wallLocation.includes(rowEnemy.toString() + '-' + (colEnemy + 1).toString()) &&
                    !enemiesLocation.includes(rowEnemy.toString() + '-' + (colEnemy + 1).toString()) &&
                    destinationCell.id !== id &&
                    colEnemy + 1 < cols && colEnemy + 1 >= 0) {
                    id = rowEnemy.toString() + '-' + (colEnemy + 1).toString();
                } else {
                    id = rowEnemy.toString() + '-' + (colEnemy - 1).toString();
                }
            } else {
                if (!wallLocation.includes((rowEnemy + 1).toString() + '-' + colEnemy.toString()) &&
                    !enemiesLocation.includes((rowEnemy + 1).toString() + '-' + colEnemy.toString()) &&
                    destinationCell.id !== id &&
                    (rowEnemy + 1) < rows && (rowEnemy + 1) >= 0) {
                    id = (rowEnemy + 1).toString() + '-' + colEnemy.toString();
                } else {
                    id = (rowEnemy - 1).toString() + '-' + colEnemy.toString();
                }
            }
            let newEnemy = document.getElementById(id);
            enemiesLocation.splice(i, 1, id);
            while (enemy.firstChild) {
                enemy.removeChild(enemy.firstChild);
            }
            newEnemy.classList.add('enemy');
            imgGengar(newEnemy);
            enemy.classList.remove('enemy');
            enemy = newEnemy;
            turn++;
        }
    }

}

setInterval(moveEnemies, 200);

// moveEnemies();
function setButton() {
    if (playGame) {
        startTimer();
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

function setAxe() {
    if (playGame) {
        if (axeStatus) {
            axeStatus = false;
            document.getElementById('axe').style.backgroundColor = 'transparent';
        } else {
            axeStatus = true;
            document.getElementById('axe').style.backgroundColor = '#3de009';
        }
    }
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
let axeRemain = 3;

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
                    clearInterval(timerInterval);
                    window.addEventListener('click', reloadGame);
                    playGame = false;
                    document.getElementById('count').innerHTML = count;
                } else if (enemiesLocation.includes(newCell.id)) {
                    alert('You lose');
                    clearInterval(timerInterval);
                    window.addEventListener('click', reloadGame);
                    playGame = false;
                    document.getElementById('count').innerHTML = count;
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
            } else if (newCell && axeStatus && wallLocation.includes(newCell.id) && axeRemain > 0 && !enemiesLocation.includes(newCell.id)) {
                wallLocation.splice(wallLocation.indexOf(newCell.id), 1);
                newCell.classList.remove('wall');
                while (newCell.firstChild) {
                    newCell.removeChild(newCell.firstChild);
                }
                while (sourceCell.firstChild) {
                    sourceCell.removeChild(sourceCell.firstChild);
                }
                newCell.classList.add('source');
                imgSource(newCell);
                sourceCell.classList.remove('source');
                sourceCell = newCell;
                axeRemain--;
                document.getElementById('axeRemain').innerHTML = axeRemain;
                count++;
                document.getElementById('count').innerHTML = count;

            }
        }
    }
}


let startTime = null;
let elapsedTime = 0;
let timerInterval;
let isTimeRemaining = false;

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
    elapsedTime++;
    document.getElementById('time').innerHTML = formatTime(elapsedTime);
}

function startTimer() {
    if (!isTimeRemaining) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
        isTimeRemaining = true;
    } else {
        clearInterval(timerInterval);
        isTimeRemaining = false;
    }
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

function imgGengar(cell) {
    let img = document.createElement('img');
    img.src = 'Elements/gengar.png';
    img.style.width = '28px';
    img.style.height = '28px';
    cell.appendChild(img);
}
