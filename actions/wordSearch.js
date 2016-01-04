import {CELL_CLICK, GAME_START, GAME_SELECT} from '../constants/actionTypes.js'

export function startGameAction() {
    return {
        type: GAME_START
    }
}

export function selectGameAction(changeValue) {
    return {
        type: GAME_SELECT,
        changeValue
    }
}

export function cellClickAction(xPos, yPos) {
    return {
        type: CELL_CLICK,
        xPos,
        yPos
    }
}