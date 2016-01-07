import {Cell} from '../domain/components'
import {CELL_CLICK, GAME_START, GAME_SELECT} from '../constants/actionTypes'
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

function generateGameGrid(action) {
    let game = GAMES[action.changeValue];
    if (game) {
        let cells = [];
        for (var i = 0; i < 6; i++) {
            var row = [];
            cells.push({row});
            for (var j = 0; j < 6; j++) {
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
        ...state.cells.slice(0, action.xPos),
        Object.assign({}, state.cells[action.xPos]),
        ...state.cells.slice(action.xPos + 1)
    ];
    newState.cells[action.xPos].row[action.yPos].selected = !newState.cells[action.xPos].row[action.yPos].selected;
}

function lettersFoundUpdate(newState, state, action) {
    let cell = newState.cells[action.xPos].row[action.yPos];
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

        console.log('letters found as a word: ', wordFound)

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
            newState.lettersFound=[];
        }
    }
}


export function gamePlay(state = initialState, action) {
    console.log('game play here')
    let newState = {};
    switch (action.type) {
        case CELL_CLICK:
            if (isLegalCellClick(state, action)) {
                // cell update
                cellSelectedUpdate(newState, state, action);

                //lettersFound update
                lettersFoundUpdate(newState, state, action)
                //newState.lettersFound = [];

                //words update
                //newState.words = state.words;

                //wordsFound update
                wordsFoundUpdate(newState, state, action)

                return newState;
            } else {
                return state;
            }

        case GAME_SELECT:
            newState.cells = generateGameGrid(action);
            newState.words = words(action);
            newState.lettersFound = [];

            return newState;

        default:
            return state
    }
}

function words(action) {
    let words = [];
    let game = GAMES[action.changeValue];
    game.words.map(wordStr=> {
        let word = {};
        word.word = wordStr;
        word.wordFound = false;
        words.push(word);
    });
    return words;
}
