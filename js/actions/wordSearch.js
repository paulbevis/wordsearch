import {CELL_CLICK, GAME_START, GAME_SELECT, CELL_EXPLOSION_FRAGMENT} from '../constants/actionTypes.js'

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

export function cellClickAction(rowPos, columnPos) {
    return {
        type: CELL_CLICK,
        rowPos,
        columnPos
    }
}

export function cellExplodedAction(rowPos, columnPos) {
    return {
        type: CELL_EXPLODED,
        rowPos,
        columnPos
    }
}
export function cellExplosionFragmentAction(rowPos, columnPos) {
    return {
        type: CELL_EXPLOSION_FRAGMENT,
        rowPos,
        columnPos
    }
}