import {GAMES, START_SET, LEFT_TO_RIGHT, TOP_TO_BOTTOM, CHAR_SET, MAX_GRID_WIDTH, MAX_GRID_HEIGHT} from '../constants/data'
import {Cell} from '../domain/components'

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

function fillRemainingSpaces(newState, gridSet, gridWidth, gridHeight) {
    for (var rowPos = 0; rowPos < gridHeight; rowPos++) {
        for (var columnPos = 0; columnPos < gridWidth; columnPos++) {
            if (newState.grid.rows[rowPos].cols[columnPos].value === '-') {
                newState.grid.rows[rowPos].cols[columnPos] = new Cell(gridSet.charAt(Math.floor(Math.random() * gridSet.length)), rowPos, columnPos, false);
            }
        }
    }
}

function getStartingPoint(word) {
    let cellChoice;
    let arrayLen = word.possiblePositions.length;
    if (arrayLen !== 0) {
        let cellChoiceNumber = Math.floor(Math.random() * arrayLen);
        cellChoice = word.possiblePositions.splice(cellChoiceNumber, 1)[0];
        return cellChoice
    }
    return cellChoice;
}

function rebuildGridSoFar(counter, newState) {
    let tempCounter = 0;
    while (tempCounter < counter) {
        newState.words[tempCounter++].positionInGrid.map(characterPosition=>
            newState.grid.rows[characterPosition.rowPosition].cols[characterPosition.colPosition].value = characterPosition.letter
        );
    }
}

function addWordToGrid(newState, word, gridWidth, gridHeight) {
    let result = true;
    let wordPositions = [];
    let wordComplete = 0;
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


function repositionPrevious(counter, newState) {
    if (counter !== -1) {
        newState.words[counter].wordFound = false;
        newState.words[counter].positionInGrid = [];
    }
}

export default function createBoard(newState, action) {
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
            repositionPrevious(counter, newState);

            //wipe the grid now, then build up to the previous count words and start again!
            newState.grid = fillDefaultGrid([], START_SET, game.gridWidth, game.gridHeight);
            rebuildGridSoFar(counter, newState);
        }
    }

    fillRemainingSpaces(newState, CHAR_SET, game.gridWidth, game.gridHeight);
    return words;
}
