import expect from 'expect'
import {gamePlay,fillDefaultGrid} from '../../reducers/gamePlay'
import * as types from '../../constants/actionTypes'
import {Cell}  from '../../domain/components'
import {CELL_CLICK, GAME_START, GAME_SELECT} from '../../constants/actionTypes'


describe('gamePlay reducer', () => {
    it('should handle initial state', () => {
        let state = {
            cells: fillDefaultGrid([], '-'),
            words: [],
            lettersFound: []
        };
        expect(
            gamePlay(undefined, {})
        ).toEqual(state)
    });

    it('first click, updates cell', () => {
        let state = {
            cells: fillDefaultGrid([], '-'),
            words: [],
            lettersFound: []
        };
        state.cells[1].row[4].value = 'p';
        state.words.push({word: 'push', wordFound: false});

        //after legal selection
        let expectedState = {
            cells: fillDefaultGrid([], '-'),
            words: [],
            lettersFound: []
        };


        const cell = new Cell('p', 1, 4, true);
        expectedState.cells[1].row[4] = cell;
        expectedState.lettersFound.push(cell);
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}).cells).toEqual(expectedState.cells)
    });

    it('second click, same cell, unselects cell', () => {
        let state = {
            cells: fillDefaultGrid([], '-'),
            words: [],
            lettersFound: []
        };
        state.cells[1].row[4].value = 'p';

        //select cell
        gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4})

        //unselect cell
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}).cells).toEqual(state.cells)
    });

    it('first click, updates letters found', () => {
        let state = {
            cells: fillDefaultGrid([], '-'),
            words: [],
            lettersFound: []
        };
        state.cells[1].row[4].value = 'p';
        state.words.push({word: 'push', wordFound: false});

        //after legal selection
        let expectedState = {
            cells: fillDefaultGrid([], '-'),
            words: [],
            lettersFound: []
        };
        //cell is selected
        let cell = new Cell('p', 1, 4, true);
        expectedState.cells[1].row[4] = cell;
        //selected cell added to lettersfound
        expectedState.lettersFound.push(cell);
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}).lettersFound).toEqual(expectedState.lettersFound)
    })

    it('second click, same cells, removes letters found', () => {
        let state = {
            cells: fillDefaultGrid([], '-'),
            words: [],
            lettersFound: []
        };
        state.cells[1].row[4].value = 'p';
        state.words.push({word: 'push', wordFound: false});

        //after legal selection
        let expectedState = {
            cells: fillDefaultGrid([], '-'),
            words: [],
            lettersFound: []
        };

        //select cell
        gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}) ;

        //unselect cell
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}).lettersFound).toEqual(expectedState.lettersFound)
    })


});