import {CELL_CLICK, GAME_START, GAME_SELECT} from '../constants/actionTypes'
import { combineReducers } from 'redux'
import {Cell} from '../domain/components'
import {GAMES} from '../constants/data'

const CHAR_SET = "abcdefghijklmnopqrstuvwxyz";
const START_SET = "-";

function fillDefaultGrid(cells, gridSet) {
    for (var i = 0; i < 6; i++) {
        var row = [];
        cells.push({row});
        for (var j = 0; j < 6; j++) {
            var cell = new Cell(gridSet.charAt(Math.floor(Math.random() * gridSet.length)), i, j, false);
            row.push(cell);
        }
    }
    return cells;
}

function generateGameGrid(state, action) {
    console.log(GAME_SELECT)
    console.log(GAMES[action.changeValue])
    let board = GAMES[action.changeValue].board;
    if (board){
       let cells=[];
        for (var i = 0; i < 6; i++) {
            var row = [];
            cells.push({row});
            for (var j = 0; j < 6; j++) {
                var cell = new Cell(board[i][j], i, j, false);
                row.push(cell);
            }
        }
        return cells;
    }
    return state;
}


//const initialState = {
//    cells: fillGrid([], START_SET),
//    list: '',
//    lettersFound: [],
//    wordsFound: []
//};

export function myCellsReducer(state = fillDefaultGrid([], START_SET), action) {

    switch (action.type) {
        case CELL_CLICK:
            var newState = [
                ...state.slice(0, action.xPos),
                Object.assign({}, state[action.xPos]),
                ...state.slice(action.xPos + 1)
            ];
            newState[action.xPos].row[action.yPos].selected = !newState[action.xPos].row[action.yPos].selected;
            return newState;

        case GAME_SELECT:
            return generateGameGrid(state, action);
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

export function currentGame(state = '', action) {
    switch (action.type) {
        case GAME_SELECT:
            console.log('game select: ', action.changeValue)
            return action.changeValue;
        default:
            return state
    }

}

const wordSearchAppReducers = combineReducers({
    cells: myCellsReducer,
    lettersFound,
    words,
    currentGame
});

export default wordSearchAppReducers