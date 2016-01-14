import expect from 'expect'
import {gamePlay,fillDefaultGrid} from '../../reducers/gamePlay'
import * as types from '../../constants/actionTypes'
import {Cell}  from '../../domain/components'
import {CELL_CLICK, GAME_START, GAME_SELECT} from '../../constants/actionTypes'


describe('gamePlay reducer', () => {
    it('should handle initial state', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        expect(
            gamePlay(undefined, {})
        ).toEqual(state)
    });

    it('first click, updates cell', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        state.grid.rows[0].cols[0].value = 'p';
        state.words.push({word: 'push', wordFound: false});

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };


        const cell = new Cell('p', 0, 0, true);
        expectedState.grid.rows[0].cols[0] = cell;
        expectedState.lettersFound.push(cell);
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0}).grid).toEqual(expectedState.grid)
    });

    it('second click, same cell, unselects cell', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        state.grid.rows[1].cols[4].value = 'p';

        //select cell
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4});

        //unselect cell
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}).grid).toEqual(state.grid)
    });

    it('first click, updates letters found', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        state.grid.rows[1].cols[4].value = 'p';
        state.words.push({word: 'push', wordFound: false});

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        //cell is selected
        let cell = new Cell('p', 1, 4, true);
        expectedState.grid.rows[1].cols[4] = cell;
        //selected cell added to lettersfound
        expectedState.lettersFound.push(cell);

        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}).lettersFound).toEqual(expectedState.lettersFound)
    });

    it('second click, same cells, removes letters found', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        state.grid.rows[1].cols[4].value = 'p';
        state.words.push({word: 'push', wordFound: false});

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };

        //select cell
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4});

        //unselect cell
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}).lettersFound).toEqual(expectedState.lettersFound)
    });

    it('first and second letters in correct order, and match word', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        state.grid.rows[0].cols[0].value = 'c';
        state.grid.rows[0].cols[1].value = 'a';
        state.grid.rows[0].cols[2].value = 'n';
        state.words.push({
            word: 'can', wordFound: false, positionInGrid: [
                {'letter': 'c', 'colPosition': 0, 'rowPosition': 0},
                {'letter': 'a', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'n', 'colPosition': 2, 'rowPosition': 0}
            ]
        });
        state.grid.rows[1].cols[0].value = 'i';
        state.grid.rows[1].cols[1].value = 'f';
        state.words.push({
            word: 'if', wordFound: false, positionInGrid: [
                {'letter': 'i', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        expectedState.grid.rows[0].cols[0].value = 'c';
        expectedState.grid.rows[0].cols[0].selected = false;
        expectedState.grid.rows[0].cols[0].partOfWordFound = true;
        expectedState.grid.rows[0].cols[1].value = 'a';
        expectedState.grid.rows[0].cols[1].selected = false;
        expectedState.grid.rows[0].cols[1].partOfWordFound = true;
        expectedState.grid.rows[0].cols[2].value = 'n';
        expectedState.grid.rows[0].cols[2].selected = false;
        expectedState.grid.rows[0].cols[2].partOfWordFound = true;
        expectedState.words.push({word: 'can', wordFound: true});

        expectedState.grid.rows[1].cols[0].value = 'i';
        expectedState.grid.rows[1].cols[1].value = 'f';
        expectedState.words.push({
            word: 'if', wordFound: false, positionInGrid: [
                {'letter': 'i', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });


        //select cell (c)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});

        //select next cell (a)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 1});

        //select next cell (n)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 2});

        expect(state.grid).toEqual(expectedState.grid)
    })

    it('first and second letters in the reverse order, and match word', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        state.grid.rows[0].cols[0].value = 'c';
        state.grid.rows[0].cols[1].value = 'a';
        state.grid.rows[0].cols[2].value = 'n';
        state.words.push({
            word: 'can', wordFound: false, positionInGrid: [
                {'letter': 'c', 'colPosition': 0, 'rowPosition': 0},
                {'letter': 'a', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'n', 'colPosition': 2, 'rowPosition': 0}
            ]
        });
        state.grid.rows[1].cols[0].value = 'i';
        state.grid.rows[1].cols[1].value = 'f';
        state.words.push({
            word: 'if', wordFound: false, positionInGrid: [
                {'letter': 'i', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        expectedState.grid.rows[0].cols[0].value = 'c';
        expectedState.grid.rows[0].cols[0].selected = false;
        expectedState.grid.rows[0].cols[0].partOfWordFound = true;
        expectedState.grid.rows[0].cols[1].value = 'a';
        expectedState.grid.rows[0].cols[1].selected = false;
        expectedState.grid.rows[0].cols[1].partOfWordFound = true;
        expectedState.grid.rows[0].cols[2].value = 'n';
        expectedState.grid.rows[0].cols[2].selected = false;
        expectedState.grid.rows[0].cols[2].partOfWordFound = true;
        expectedState.words.push({word: 'can', wordFound: true});

        expectedState.grid.rows[1].cols[0].value = 'i';
        expectedState.grid.rows[1].cols[1].value = 'f';
        expectedState.words.push({
            word: 'if', wordFound: false, positionInGrid: [
                {'letter': 'i', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });
        //select cell (n)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 2});

        //select next cell (a)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 1});

        //select next cell (c)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});

        expect(state.grid).toEqual(expectedState.grid)
    })


});