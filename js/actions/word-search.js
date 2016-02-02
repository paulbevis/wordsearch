import {CELL_CLICK, GAME_START, GAME_SELECT, CELL_EXPLOSION_FRAGMENT, LAST_LETTER_FOUND} from '../constants/action-types'

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

export function cellExplosionFragmentAction(rowPos, columnPos) {
    return {
        type: CELL_EXPLOSION_FRAGMENT,
        rowPos,
        columnPos
    }
}

export function lastLetterFoundAction() {
    return {
        type: LAST_LETTER_FOUND
    }
}