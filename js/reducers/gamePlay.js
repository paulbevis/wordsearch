import {CELL_CLICK, GAME_START, GAME_SELECT, CELL_EXPLOSION_FRAGMENT} from '../constants/actionTypes'
import {MAX_GRID_WIDTH, MAX_GRID_HEIGHT, START_SET} from '../constants/data'
import createBoard,{fillDefaultGrid} from './boardCreator'


function initialWords() {
    let words = [];
    while (words.length < 10) {
        let word = {};
        word.word = '-';
        word.wordFound = false;
        words.push(word)
    }
    return words;
}

const initialState = {
    grid: fillDefaultGrid({}, START_SET, 6, 6),
    words: initialWords(),
    lettersFound: [],
    sound: {play: false}
};

function cellSelectedUpdate(newState, state, action) {
    newState.grid.rows = [
        ...state.grid.rows.slice(0, action.rowPos),
        Object.assign({}, state.grid.rows[action.rowPos]),
        ...state.grid.rows.slice(action.rowPos + 1)
    ];
    newState.grid.rows[action.rowPos].cols[action.columnPos].selected = !state.grid.rows[action.rowPos].cols[action.columnPos].selected;
}

function lettersFoundUpdate(newState, state, action) {
    let cell = newState.grid.rows[action.rowPos].cols[action.columnPos];
    if (cell.selected) {
        // cell is now selected so should be added to the letters found array
        newState.lettersFound = state.lettersFound;
        newState.lettersFound.push(cell);
    } else {
        // the cell was selected, so now unselect it!
        newState.lettersFound = state.lettersFound;
        newState.lettersFound = state.lettersFound.filter(letterCell=> letterCell !== cell);
    }
}

function wordsFoundUpdate(newState, state, action) {
    newState.words = state.words;
    if (newState.lettersFound.length >= 1) {
        let wordMatch = false;
        let posOfMatchedWord = 0;
        newState.words.map((word, index) => {
                let lettersMatched = 0;
                if (word.word.length === newState.lettersFound.length && !word.wordFound) {
                    newState.lettersFound.map(letterCell=> {

                        if (word.positionInGrid.find(letterPosInWord => {
                                    return (letterPosInWord.colPosition === letterCell.columnPos &&
                                    letterPosInWord.rowPosition === letterCell.rowPos &&
                                    letterPosInWord.letter === letterCell.value)
                                }
                            )) {
                            lettersMatched++;
                        }
                    });
                    if (lettersMatched === word.word.length) {
                        wordMatch = true;
                        posOfMatchedWord = index;
                    }
                }
                if (wordMatch) {
                    newState.words = [
                        ...state.words.slice(0, posOfMatchedWord),
                        Object.assign({}, state.words[posOfMatchedWord], {wordFound: true}),
                        ...state.words.slice(posOfMatchedWord + 1)
                    ];
                    newState.lettersFound.map(letterCell=> {
                        letterCell.partOfWordFound = true;
                        letterCell.selected = false;
                        letterCell.explode = true;
                    });
                    newState.lettersFound = [];
                    newState.sound = Object.assign({}, {play: true, type: 'success'});
                }
            }
        );

    }
}


function isLegalCellClick(state, action) {
    if (state.lettersFound.length === 0) {
        return true;
    }

    if (state.lettersFound.length === 1) {
        //same cell click
        if (state.lettersFound[0].columnPos === action.columnPos && state.lettersFound[0].rowPos === action.rowPos) {
            return true;
        }
        // click on same vertical axis, but different cell
        if (state.lettersFound[0].columnPos === action.columnPos && state.lettersFound[0].rowPos !== action.rowPos) {
            return true;
        }
        // click on same horizontal axis, but different cell
        if (state.lettersFound[0].columnPos !== action.columnPos && state.lettersFound[0].rowPos === action.rowPos) {
            return true;
        }
    }

    if (state.lettersFound.length > 1) {
        //if previous letters in horizontal axis, then so must the rest be
        if (state.lettersFound[0].columnPos === state.lettersFound[1].columnPos && state.lettersFound[0].columnPos === action.columnPos) {
            return true;
        }
        //if previous letters in vertical axis, then so must the rest be
        if (state.lettersFound[0].rowPos === state.lettersFound[1].rowPos && state.lettersFound[0].rowPos === action.rowPos) {
            return true;
        }
    }

    return false;
}

export function gamePlay(state = initialState, action) {
    let newState = {'grid': {}, sound: {play: false}};
    switch (action.type) {
        case CELL_CLICK:
            if (isLegalCellClick(state, action)) {

                // cell update
                cellSelectedUpdate(newState, state, action);

                //lettersFound update
                lettersFoundUpdate(newState, state, action);

                //wordsFound update
                wordsFoundUpdate(newState, state, action);

                return newState;
            } else {
                newState.grid = state.grid;
                newState.lettersFound = state.lettersFound;
                newState.words = state.words;
                newState.sound = {play: true, type: 'warning'};
                return newState;
            }

        case GAME_SELECT:
            createBoard(newState, action);
            newState.lettersFound = [];

            return newState;

        case CELL_EXPLOSION_FRAGMENT:
            // cell update
            cellSelectedUpdate(newState, state, action);
            newState.grid.rows = [
                ...state.grid.rows.slice(0, action.rowPos),
                Object.assign({}, state.grid.rows[action.rowPos]),
                ...state.grid.rows.slice(action.rowPos + 1)
            ];
            //lettersFound update
            newState.lettersFound=[];

            //wordsFound update
            wordsFoundUpdate(newState, state, action);
            newState.grid.rows[action.rowPos].cols[action.columnPos].explode = false;

            return newState;

        default:
            return state
    }
}






