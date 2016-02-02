import expect from 'expect'
import {gamePlay,fillDefaultGrid} from '../../js/reducers/game-play'
import {Cell, Sound}  from '../../js/domain/components'
import {CELL_CLICK, GAME_START, GAME_SELECT} from '../../js/constants/action-types'

function isWordMatched(myState, myWordObj) {
    //console.log('=', (!!myState.words.find(word => word.word === myWordObj.word && word.wordFound)))
    return !!myState.words.find(word => word.word === myWordObj.word && word.wordFound)
}
function findWord(state, wordObj) {
    let charPos = 0;
    while (!isWordMatched(state, wordObj)) {
        let action = {type: CELL_CLICK, rowPos: wordObj.positionInGrid[charPos].rowPosition, columnPos: wordObj.positionInGrid[charPos].colPosition};
        state = gamePlay(state, action)
        // if letterfound is empty, that must mean that a word has been found, so check whether the word found is the one
        // we are looking for, if it is not we reset and start selecting the preset cells again.
        if (state.lettersFound.length !== 0) {
            charPos++;
        } else {
            charPos = 0;
        }
    }
    return state;
}

function allWordsFound(newState) {
    return newState.words.reduce((prev, curr) => prev + curr.wordFound, 0) === newState.words.length
}

function findAllWords(boardNumber, wordNumber = 10) {
    let state = gamePlay(undefined, {type: GAME_SELECT, changeValue: 'wordSet' + boardNumber});
    let wordsFoundArray = state.words.filter(word=>word.wordFound);
    while (!allWordsFound(state)) {
        let wordObjects = Object.assign([], state.words);
        let counter = 0;
        while (counter < wordObjects.length) {
            state = findWord(state, wordObjects[counter++])
        }
    }
    return state
}

function checkBoard(boardNumber, wordNumber = 10) {
    let grids = 0;
    while (grids++ < 100) {
        let state = findAllWords(boardNumber, wordNumber);
        let wordsFoundArray = state.words.filter(word=>word.wordFound);
        if (wordsFoundArray.length !== wordNumber) {
            debugger;
        }
        expect(wordsFoundArray.length).toEqual(wordNumber)
        expect(wordsFoundArray.length).toEqual(state.words.length);
    }
}

describe('each board should be completable', () => {

    it('should be able to find all words in grid 1', () => {
            checkBoard(1)
        }
    )

    it('should be able to find all words in grid 2', () => {
            checkBoard(2)
        }
    )

    it('should be able to find all words in grid 3', () => {
            checkBoard(3)
        }
    )

    it('should be able to find all words in grid 4', () => {
            checkBoard(4)
        }
    )

    it('should be able to find all words in grid 5', () => {
            checkBoard(5)
        }
    )

    it('should be able to find all words in grid 6', () => {
            checkBoard(6)
        }
    )

    it('should be able to find all words in grid 7', () => {
            checkBoard(7)
        }
    )

    it('should be able to find all words in grid 8', () => {
            checkBoard(8)
        }
    )

    it('should be able to find all words in grid 9', () => {
            checkBoard(9)
        }
    )

    it('should be able to find all words in grid 10', () => {
            checkBoard(10)
        }
    )

    it('should be able to find all words in grid 11', () => {
            checkBoard(11)
        }
    )

    it('should be able to find all words in grid 12', () => {
            checkBoard(12)
        }
    )

    it('should be able to find all words in grid 13', () => {
            checkBoard(13)
        }
    )

    it('should be able to find all words in grid 14', () => {
            checkBoard(14)
        }
    )

    it('should be able to find all words in grid 15', () => {
            checkBoard(15)
        }
    )

    it('should be able to find all words in grid 16', () => {
            checkBoard(16)
        }
    )

    it('should be able to find all words in grid 7', () => {
            checkBoard(17)
        }
    )

    it('should be able to find all words in grid 18', () => {
            checkBoard(18)
        }
    )

    it('should be able to find all words in grid 19', () => {
            checkBoard(19)
        }
    )

    it('should be able to find all words in grid 20', () => {
            checkBoard(20)
        }
    )

});