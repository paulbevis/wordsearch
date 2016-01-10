import {Cell} from '../domain/components'
import {CELL_CLICK, GAME_START, GAME_SELECT} from '../constants/actionTypes'
import {GAMES} from '../constants/data'


const CHAR_SET = "abcdefghijklmnopqrstuvwxyz";
const START_SET = "-";
const GRID_WIDTH = 8;
const GRID_HEIGHT = 8;
const LEFT_TO_RIGHT = 'LEFT_TO_RIGHT';
const TOP_TO_BOTTOM = 'TOP_TO_BOTTOM';
const WORD_DIRECTIONS = [LEFT_TO_RIGHT, TOP_TO_BOTTOM];

export function fillDefaultGrid(cells, gridSet) {
    for (var i = 0; i < GRID_WIDTH; i++) {
        var row = [];
        cells.push({row});
        for (var j = 0; j < GRID_HEIGHT; j++) {
            var cell = new Cell(gridSet.charAt(Math.floor(Math.random() * gridSet.length)), i, j, false);
            row.push(cell);
        }
    }
    return cells;
}

function generateGameGrid(action) {
    let game = GAMES[action.changeValue];
    if (game) {
        let cells = [];
        for (var i = 0; i < GRID_WIDTH; i++) {
            var row = [];
            cells.push({row});
            for (var j = 0; j < GRID_HEIGHT; j++) {
                var cell = new Cell(game.board[i][j], i, j, false);
                row.push(cell);
            }
        }
        return cells;
    }
    return fillDefaultGrid([], START_SET);

}

const initialState = {
    cells: fillDefaultGrid([], START_SET),
    words: [],
    lettersFound: []
};

function isLegalCellClick(state, action) {
    return true;
}

function cellSelectedUpdate(newState, state, action) {
    newState.cells = [
        ...state.cells.slice(0, action.rowPos),
        Object.assign({}, state.cells[action.rowPos]),
        ...state.cells.slice(action.rowPos + 1)
    ];
    newState.cells[action.rowPos].row[action.columnPos].selected = !state.cells[action.rowPos].row[action.columnPos].selected;
}

function lettersFoundUpdate(newState, state, action) {
    let cell = newState.cells[action.rowPos].row[action.columnPos];
    if (cell.selected) {
        // cell is now selected so should be added to the letters found array
        newState.lettersFound = state.lettersFound;
        newState.lettersFound.push(cell);
    } else {
        newState.lettersFound = state.lettersFound;
        newState.lettersFound = state.lettersFound.filter(letterCell=> letterCell !== cell);
    }
}

function wordsFoundUpdate(newState, state, action) {
    newState.words = state.words;
    if (newState.lettersFound.length > 1) {

        let wordFound = newState.lettersFound.reduce((prev, curr) => prev + curr.value, '');

        let posOfMatchedWord = state.words.findIndex(word=> wordFound === word.word && !word.wordFound)

        if (posOfMatchedWord !== -1) {
            newState.words = [
                ...state.words.slice(0, posOfMatchedWord),
                Object.assign({}, state.words[posOfMatchedWord], {wordFound: !state.words[posOfMatchedWord].wordFound}),
                ...state.words.slice(posOfMatchedWord + 1)
            ];
            newState.lettersFound.map(letterCell=> {
                letterCell.partOFWordFound = true;
                letterCell.selected = false;
            });
            newState.lettersFound = [];
        }
    }
}


export function gamePlay(state = initialState, action) {
    let newState = {};
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
                return state;
            }

        case GAME_SELECT:
            //newState.cells = generateGameGrid(action);
            words(newState, action);
            newState.lettersFound = [];

            return newState;

        default:
            return state
    }
}

function addWordToGrid(newState, word) {
    let wordDirection = Math.floor(Math.random() * 2);

    let wordPositions = [];
    let columnAddition = 1;
    let rowAddition = 0;
    if (WORD_DIRECTIONS[wordDirection] == TOP_TO_BOTTOM) {
        columnAddition = 0;
        rowAddition = 1;
    }
    let wordComplete = 0;
    //repeat until either the word is placed or it gives up on a 1000 iterations
    while (wordPositions.length !== word.word.length && wordComplete < 1000) {
        //random starting point
        let columnPos = Math.floor(Math.random() * GRID_WIDTH);
        let rowPos = Math.floor(Math.random() * GRID_HEIGHT);
        //reset words found in grid
        wordPositions = [];
        // cycle through word, character by character
        word.word.split('').map(character=> {
            // if location is untaken, or matches exact letter, then continue
            if (columnPos < GRID_WIDTH && rowPos < GRID_HEIGHT &&
                (newState.cells[columnPos].row[rowPos].value === '-' || (newState.cells[columnPos].row[rowPos].value === character))) {
                wordPositions.push({'letter': character, 'colPosition': columnPos, 'rowPosition': rowPos});
                columnPos = columnPos + columnAddition;
                rowPos = rowPos + rowAddition;
            }
            wordComplete++;
        });
    }

    // now that word mapped, mark the grid.
    if (wordPositions.length == word.word.length) {
        wordPositions.map(characterPosition=>
            newState.cells[characterPosition.colPosition].row[characterPosition.rowPosition].value = characterPosition.letter
        )
    } else{
        console.log("FAILED!!!!!!!!!!!!!!!!!")
    }

    return wordPositions;
}

function words(newState, action) {
    newState.cells = fillDefaultGrid([], START_SET);
    newState.words = [];
    let game = GAMES[action.changeValue];
    game.words.map(wordStr=> {
        let word = {};
        word.word = wordStr;
        word.wordFound = false;
        word.positionInGrid = addWordToGrid(newState, word);
        newState.words.push(word);
    });
    return words;
}
