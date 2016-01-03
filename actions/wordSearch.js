import {CELL_CLICK, GAME_START, LIST_SELECT} from '../constants/actionTypes.js'

export function gameStartAction() {
    return {
        type: GAME_START
    }
}

export function listSelectAction(){
    return {
        type:LIST_SELECT
    }
}

export function cellClickAction(xPos, yPos){
    console.log('cellClickAction')
    return {
        type: CELL_CLICK,
        xPos,
        yPos
    }
}