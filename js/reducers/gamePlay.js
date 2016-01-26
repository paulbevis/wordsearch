import {Cell} from '../domain/components'
import {CELL_CLICK, GAME_START, GAME_SELECT} from '../constants/actionTypes'
import {GAMES} from '../constants/data'
import {MAX_GRID_WIDTH, MAX_GRID_HEIGHT} from '../constants/data'


const CHAR_SET = "abcdefghijklmnopqrstuvwxyz";
const START_SET = "-";

const LEFT_TO_RIGHT = 'LEFT_TO_RIGHT';
const TOP_TO_BOTTOM = 'TOP_TO_BOTTOM';
const WORD_DIRECTIONS = [LEFT_TO_RIGHT, TOP_TO_BOTTOM];

export function fillDefaultGrid(grid, gridSet, gridWidth = MAX_GRID_WIDTH, gridHeight = MAX_GRID_HEIGHT) {
    var rows = [];
    for (var rowPos = 0; rowPos < gridHeight; rowPos++) {
        var cols = [];
        rows.push({cols});
        for (var columnPos = 0; columnPos < gridWidth; columnPos++) {
            var cell = new Cell(gridSet.charAt(Math.floor(Math.random() * gridSet.length)), rowPos, columnPos, false);
            cols.push(cell);
        }
    }
    grid = {rows};
    return grid;
}

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
            words(newState, action);
            newState.lettersFound = [];

            return newState;

        default:
            return state
    }
}

function getStartingPoint(word) {
    let cellChoice;
    //console.log('len: ', word.possiblePositions.length)
    let arrayLen = word.possiblePositions.length;
    if (arrayLen !== 0) {
        let cellChoiceNumber = Math.floor(Math.random() * arrayLen);
        cellChoice = word.possiblePositions.splice(cellChoiceNumber, 1)[0];
        return cellChoice
    }
    return cellChoice;
}
function addWordToGrid(newState, word, gridWidth, gridHeight) {
    let result = true;
    let wordPositions = [];
    let wordComplete = 0;
    //repeat until either the word is placed or it gives up on a 1000 iterations
    while (wordPositions.length !== word.word.length && word.possiblePositions.length !== 0) {

        let startingPoint = getStartingPoint(word);

        //reset words found in grid
        wordPositions = [];
        // cycle through word, character by character
        word.word.split('').map(character=> {
            // if location is untaken, or matches exact letter, then continue
            if (startingPoint.columnPos < gridWidth && startingPoint.rowPos < gridHeight &&
                (newState.grid.rows[startingPoint.rowPos].cols[startingPoint.columnPos].value === '-' ||
                (newState.grid.rows[startingPoint.rowPos].cols[startingPoint.columnPos].value === character))) {
                wordPositions.push({'letter': character, 'colPosition': startingPoint.columnPos, 'rowPosition': startingPoint.rowPos});
                startingPoint.columnPos = startingPoint.columnPos + startingPoint.columnAddition;
                startingPoint.rowPos = startingPoint.rowPos + startingPoint.rowAddition;
            }
        });
    }
    // now that word mapped, mark the grid.
    if (wordPositions.length === word.word.length) {
        word.positionInGrid = wordPositions;
    } else {
        result = false;
    }

    return result;
}
function fillRemainingSpaces(newState, gridSet, gridWidth, gridHeight) {
    for (var rowPos = 0; rowPos < gridHeight; rowPos++) {
        for (var columnPos = 0; columnPos < gridWidth; columnPos++) {
            if (newState.grid.rows[rowPos].cols[columnPos].value === '-') {
                newState.grid.rows[rowPos].cols[columnPos] = new Cell(gridSet.charAt(Math.floor(Math.random() * gridSet.length)), rowPos, columnPos, false);
            }
        }
    }
}

function possisblePositions(gridHeight, gridWidth) {
    let words = [];
    for (var rowPos = 0; rowPos < gridHeight; rowPos++) {
        for (var columnPos = 0; columnPos < gridWidth; columnPos++) {
            words.push({columnPos, rowPos, direction: LEFT_TO_RIGHT, columnAddition: 1, rowAddition: 0});
            words.push({columnPos, rowPos, direction: TOP_TO_BOTTOM, columnAddition: 0, rowAddition: 1});
        }
    }
    return words;
}
function buildWords(donorWordsArray, gridWidth, gridHeight) {
    let wordsToBeFound = [];
    donorWordsArray.map(wordStr=> {
            let wordsObj = {};
            wordsObj.possiblePositions = possisblePositions(gridHeight, gridWidth);
            wordsObj.word = wordStr;
            wordsObj.wordFound = false;
            wordsToBeFound.push(wordsObj);
        }
    );
    return wordsToBeFound;
}

function words(newState, action) {
    let game = GAMES[action.changeValue];
    newState.grid = fillDefaultGrid([], START_SET, game.gridWidth, game.gridHeight);
    newState.words = [];

    let words = buildWords(game.words, game.gridWidth, game.gridHeight);
    let counter = 0;
    while (counter !== -1 && counter < words.length) {
        let word = words[counter];
        let result = addWordToGrid(newState, word, game.gridWidth, game.gridHeight);
        if (result) {
            if (newState.words.indexOf(word) === -1) {
                newState.words.push(word);
            }
            newState.words.map(wordObj=> {
                wordObj.positionInGrid.map(characterPosition=>
                    newState.grid.rows[characterPosition.rowPosition].cols[characterPosition.colPosition].value = characterPosition.letter
                );
            });
            counter++
        } else {
            // there was no match, so reset data, and go back and reposition previous word.
            word.possiblePositions = possisblePositions(game.gridHeight, game.gridWidth);
            counter--;
            if (counter !== -1) {
                newState.words[counter].wordFound = false;
                newState.words[counter].positionInGrid = [];
            }

            //wipe the grid now, then build up to the previous count words and start again!
            newState.grid = fillDefaultGrid([], START_SET, game.gridWidth, game.gridHeight);
            let tempCounter = 0;
            while (tempCounter < counter) {
                let wordObj = newState.words[tempCounter];
                wordObj.positionInGrid.map(characterPosition=>
                    newState.grid.rows[characterPosition.rowPosition].cols[characterPosition.colPosition].value = characterPosition.letter
                );
                tempCounter++;
            }
        }
    }

    fillRemainingSpaces(newState, CHAR_SET, game.gridWidth, game.gridHeight);
    return words;
}
