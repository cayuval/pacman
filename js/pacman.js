'use strict'
const PACMAN = '😷';

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.totalFood--
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        console.log(gGhosts);
        console.log(gGhosts[0].location) 
        // console.log(idx);
        if (!gPacman.isSuper) {
            gameOver();
            return
        } else {
            killGhost(nextLocation.i, nextLocation.j)
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.totalFood--
        console.log(gGame.totalFood)
        if (gGame.totalFood === 0) {
            winGame()
        }
        // if (isNoMoreFood(gBoard)) {
        //     winGame()
        // }
        // console.log(gBoard);
    }
    if (nextCell === SUPER_FOOD) {
        // superPacman()
        if(gPacman.isSuper===true)return
        gPacman.isSuper = true
        setTimeout(function () {
            gPacman.isSuper = false
            console.log('no longer super');
            bringBackGhosts()
        }, 5000)
        console.log(gPacman)
    }
    if(nextCell === CHERRY)updateScore(15)

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}

// function superPacman(){
//     gPacman.isSuper = true
// }