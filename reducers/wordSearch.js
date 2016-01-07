import {CELL_CLICK, GAME_START, GAME_SELECT} from '../constants/actionTypes'
import { combineReducers } from 'redux'
import {gamePlay} from './gamePlay'


export function lettersFound(state = [], action) {
    switch (action.type) {
        default:
            return state
    }
}



export function currentGame(state = '', action) {
    switch (action.type) {
        case GAME_SELECT:
            return action.changeValue;
        default:
            return state
    }

}

const wordSearchAppReducers = combineReducers({
    gamePlay,
    //lettersFound,
    //words,
    currentGame
});

export default wordSearchAppReducers