'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPER_FOOD = 'S'
const CHERRY = 'C'

var gIntervalCherry;

var removedGhosts = []
var gBoard;
var gGame = {
    score: 0,
    isOn: false,
    totalFood: 0
}

function init() {
    // console.log('Hello')
    gGame.totalFood = 0
    gBoard = buildBoard()
    gIntervalCherry = setInterval( placeElement,5000,CHERRY)

    // isNoMoreFood(gBoard);
    createPacman(gBoard);
    createGhosts(gBoard);
    createSuperFood(gBoard)
    // console.table(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    document.querySelector(".modal").style.display = 'none'
    document.querySelector(".victory").style.display = 'none'
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gGame.totalFood++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gGame.totalFood--
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}
// function isNoMoreFood(gBoard) {
//     var foodCount = 0
//     for (var i = 0; i < gBoard.length; i++) {
//         var currRow = gBoard[i]
//         for (var j = 0; j < currRow.length; j++) {
//             var currCell = gBoard[i][j]
//             // console.log('currCell',currCell);
//             if (currCell === FOOD && currCell !== WALL) { foodCount++ }
//             // console.log(foodCount);
//         }
//     }
//     if (foodCount === 1) {
//         return true
//     }
//     return false
// }

function createSuperFood(gBoard) {
    gBoard[1][1] = SUPER_FOOD
    gBoard[1][8] = SUPER_FOOD
    gBoard[8][1] = SUPER_FOOD
    gBoard[8][8] = SUPER_FOOD
    gGame.totalFood -= 4
}

function killGhost(cellI, cellJ) {

    for (var i = 0; i < gGhosts.length; i++) {
        var currGhostLocation = gGhosts[i].location
        // console.log(currGhostLocation);
        // console.log(currGhostLocation.i);
        // console.log(currGhostLocation.j);
        if ((currGhostLocation.i === cellI) && (currGhostLocation.j === cellJ)) {
            // console.log('in');
            var removedGhost = gGhosts.splice(i, 1)
            if(removedGhost.currCellContent ===FOOD){
                gGame.totalFood--
            }
            // console.log(removedGhost, gGhosts);
            removedGhosts.push(removedGhost)
        }
    }
}

function bringBackGhosts(){
    for(var i =0;i<removedGhosts.length;i++){
        var currGhostArray =  removedGhosts[i]
        for(var j = 0;j<currGhostArray.length;j++)
        var currGhost = currGhostArray[j]
        // console.log(currGhost);
        gGhosts.push(currGhost)
    }
    removedGhosts = []
    removedGhostArray = []
    // console.log(gGhosts);
}

function placeElement(element) {
    var emptyCells = getEmptyCells(gBoard)
    if (!emptyCells.length) return
    var idx = getRandomInt(0, emptyCells.length)
    var currPos = emptyCells[idx]
    //update the model :
    gBoard[currPos.i][currPos.j] = element
    //update the DOM:
    renderCell(currPos, element)
}

function getEmptyCells(gBoard) {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            // console.log(currCell);
            if (currCell === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    // console.log(emptyCells);
    return emptyCells
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    var modal = document.querySelector(".modal")
    modal.style.display = 'block'
}
// winGame()
function winGame() {
    console.log('You Won');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    var victory = document.querySelector(".victory")
    victory.style.display = 'block'
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}