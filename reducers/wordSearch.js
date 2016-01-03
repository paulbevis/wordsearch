import {CELL_CLICK, GAME_START, LIST_SELECT} from '../constants/actionTypes'
import { combineReducers } from 'redux'
import {Cell} from '../domain/components'

function fillGrid(cells) {
    var charset = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 9; i++) {
        var row = [];
        cells.push({row});
        for (var j = 0; j < 9; j++) {
            var cell = new Cell(charset.charAt(Math.floor(Math.random() * charset.length)), i, j, false);
            row.push(cell);
        }
    }
    return cells;
}


const initialState = {
    cells: fillGrid([]),
    list: '',
    lettersFound: [],
    wordsFound: []
};

export function cells(state = fillGrid([]), action) {
    switch (action.type) {
        case CELL_CLICK:
            var newState =  [
                ...state.slice(0, action.xPos),
                Object.assign({}, state[action.xPos]),
                ...state.slice(action.xPos + 1)
            ];
            newState[action.xPos].row[action.yPos].selected=!newState[action.xPos].row[action.yPos].selected;
            return newState;
        default:
            return state
    }

}

export function lettersFound(state = [], action) {
    switch (action.type) {

        default:
            return state
    }

}


export function words(state = [], action) {
    switch (action.type) {

        default:
            return state
    }

}

const wordSearchAppReducers = combineReducers({
    cells,
    lettersFound,
    words
});

export default wordSearchAppReducers