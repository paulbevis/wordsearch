import {CELL_CLICK, GAME_START, GAME_SELECT} from '../constants/actionTypes'
import { combineReducers } from 'redux'
import {gamePlay} from './gamePlay'

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
    currentGame
});

export default wordSearchAppReducers