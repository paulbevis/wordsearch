/*
 Copyright 2015 Paul Bevis

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import {CELL_CLICK, GAME_START, GAME_SELECT, CELL_EXPLOSION_FRAGMENT, LAST_LETTER_FOUND} from '../constants/action-types'
import {MAX_GRID_WIDTH, MAX_GRID_HEIGHT, START_SET} from '../constants/data'
import createBoard,{fillDefaultGrid} from './board-creator'


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
    sound: {play: false},
    gameOver: false
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

function allWordsFound(newState) {
    return newState.words.reduce((prev, curr) => prev + curr.wordFound, 0) === newState.words.length
}

function wordsFoundUpdate(newState, state, action) {
    newState.words = state.words;
    if (newState.lettersFound.length >= 1) {
        let wordMatch = false;
        let posOfMatchedWord = 0;
        newState.words.map((word, index) => {
                if (word.word.length === newState.lettersFound.length && newState.lettersFound.length <= MAX_GRID_HEIGHT && !wordMatch) {
                    let lettersMatched = 0;
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
                    if (lettersMatched === word.word.length && !word.wordFound) {
                        wordMatch = true;
                        posOfMatchedWord = index;
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
function isGameOver(newState, action) {
    if (allWordsFound(newState)) {
        newState.grid.rows[action.rowPos].cols[action.columnPos].lastLetterToBeFound = true;
    }
}

export function gamePlay(state = initialState, action) {
    let newState = {'grid': {}, sound: {play: false}, gameOver: false};
    switch (action.type) {
        case LAST_LETTER_FOUND:
            newState = state;
            newState.gameOver = true;
            newState.sound = {play: true, type: 'congratulations'};
            return newState;

        case CELL_CLICK:
            if (isLegalCellClick(state, action)) {

                // cell update
                cellSelectedUpdate(newState, state, action);

                //lettersFound update
                lettersFoundUpdate(newState, state, action);

                //wordsFound update
                wordsFoundUpdate(newState, state, action);

                //update game over
                isGameOver(newState, action);

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
            newState.lettersFound = [];

            //wordsFound update
            wordsFoundUpdate(newState, state, action);
            newState.grid.rows[action.rowPos].cols[action.columnPos].explode = false;

            //update game over
            newState.gameOver = state.gameOver;

            //take sound settings
            newState.sound = state.sound;

            return newState;

        default:
            return state
    }
}






