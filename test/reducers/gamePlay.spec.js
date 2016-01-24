import expect from 'expect'
import {gamePlay,fillDefaultGrid} from '../../js/reducers/gamePlay'
import * as types from '../../js/constants/actionTypes'
import {Cell, Sound}  from '../../js/domain/components'
import {CELL_CLICK, GAME_START, GAME_SELECT} from '../../js/constants/actionTypes'


describe('gamePlay reducer', () => {
    it('should handle initial state', () => {
        let state = {
            grid: fillDefaultGrid({}, '-', 6, 6),
            words: [
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                },
                {
                    "word": "-",
                    "wordFound": false
                }
            ],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        expect(
            gamePlay(undefined, {})
        ).toEqual(state)
    });

    it('first click, updates cell', () => {
        let state = {
            grid: fillDefaultGrid({}, '-', 6, 6),
            words: [],
            lettersFound: []
        };
        state.grid.rows[0].cols[0].value = 'p';
        state.words.push({word: 'push', wordFound: false});

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-', 6, 6),
            lettersFound: [],
            sound: {play: false},
            words: [{word: 'push', wordFound: false}]
        };


        const cell = new Cell('p', 0, 0, true);
        expectedState.grid.rows[0].cols[0] = cell;
        expectedState.lettersFound.push(cell);
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0})).toEqual(expectedState)
    });

    it('second click, same cell, unselects cell', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        state.grid.rows[1].cols[4].value = 'p';

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        //cell is selected
        let cell = new Cell('p', 1, 4, true);
        expectedState.grid.rows[1].cols[4] = cell;
        //selected cell added to lettersfound
        expectedState.lettersFound.push(cell);

        //select cell
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4});
        expect(state).toEqual(expectedState);

        //unselect cell
        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4}).grid).toEqual(state.grid)
    });

    it('first click, updates letters found', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        state.grid.rows[1].cols[4].value = 'p';
        state.words.push({word: 'push', wordFound: false});

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        //cell is selected
        let cell = new Cell('p', 1, 4, true);
        expectedState.grid.rows[1].cols[4] = cell;
        expectedState.words.push({word: 'push', wordFound: false});
        //selected cell added to lettersfound
        expectedState.lettersFound.push(cell);

        expect(gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4})).toEqual(expectedState)
    });

    it('second click, same cell, removes letters found', () => {
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
            lettersFound: [],
            "sound": {
                "play": false
            }
        };

        //cell is selected
        let cell = new Cell('p', 1, 4, true);
        expectedState.grid.rows[1].cols[4] = cell;
        //selected cell added to lettersfound
        expectedState.lettersFound.push(cell);
        expectedState.words.push({word: 'push', wordFound: false});

        //select cell
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4});
        expect(state).toEqual(expectedState);

        //unselect cell
        expectedState.lettersFound = [];
        expectedState.grid.rows[1].cols[4].selected = false;
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4});
        expect(state).toEqual(expectedState)
    });

    it('first, second and third letters in correct order, and match word', () => {
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
                {'letter': 'i', 'colPosition': 0, 'rowPosition': 1},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        expectedState.grid.rows[0].cols[0].value = 'c';
        expectedState.grid.rows[0].cols[1].value = 'a';
        expectedState.grid.rows[0].cols[2].value = 'n';
        expectedState.words.push({
            word: 'can', wordFound: false, positionInGrid: [
                {'letter': 'c', 'colPosition': 0, 'rowPosition': 0},
                {'letter': 'a', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'n', 'colPosition': 2, 'rowPosition': 0}]
        });

        expectedState.grid.rows[1].cols[0].value = 'i';
        expectedState.grid.rows[1].cols[1].value = 'f';
        expectedState.words.push({
            word: 'if', wordFound: false, positionInGrid: [
                {'letter': 'i', 'colPosition': 0, 'rowPosition': 1},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });


        //select cell (c)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});

        let cell = new Cell('c', 0, 0, true);
        expectedState.lettersFound = [cell];
        expectedState.grid.rows[0].cols[0] = cell;
        //check letters found, as it will removed on complete word match
        expect(state).toEqual(expectedState);

        //select next cell (a)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
        let cell2 = new Cell('a', 0, 1, true);
        expectedState.lettersFound.push(cell2);
        expectedState.grid.rows[0].cols[1] = cell2;
        //check letters found, as it will removed on complete word match
        expect(state).toEqual(expectedState);

        //select next cell (n)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 2});
        // when word has been mateched the lettersFound array is reset
        expectedState.lettersFound = [];
        expectedState.grid.rows[0].cols[0].selected = false;
        expectedState.grid.rows[0].cols[0].partOfWordFound = true;
        expectedState.grid.rows[0].cols[1].selected = false;
        expectedState.grid.rows[0].cols[1].partOfWordFound = true;
        expectedState.grid.rows[0].cols[2].selected = false;
        expectedState.grid.rows[0].cols[2].partOfWordFound = true;
        expectedState.words[0].wordFound = true;
        expectedState.sound.play = true;
        expectedState.sound.type = 'success';

        expect(state).toEqual(expectedState)
    });

    it('after a word is matched, selecting the same cells cannot unfind it!', () => {
        let state = {
            grid: fillDefaultGrid({}, '-', 6, 6),
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
                {'letter': 'i', 'colPosition': 0, 'rowPosition': 1},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-', 6, 6),
            words: [],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        expectedState.grid.rows[0].cols[0].value = 'c';
        expectedState.grid.rows[0].cols[1].value = 'a';
        expectedState.grid.rows[0].cols[2].value = 'n';
        expectedState.words.push({
            word: 'can', wordFound: false, positionInGrid: [
                {'letter': 'c', 'colPosition': 0, 'rowPosition': 0},
                {'letter': 'a', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'n', 'colPosition': 2, 'rowPosition': 0}]
        });

        expectedState.grid.rows[1].cols[0].value = 'i';
        expectedState.grid.rows[1].cols[1].value = 'f';
        expectedState.words.push({
            word: 'if', wordFound: false, positionInGrid: [
                {'letter': 'i', 'colPosition': 0, 'rowPosition': 1},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });


        //select cell (c)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
        //select next cell (a)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
        //select next cell (n)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 2});

        // when word has been mateched the lettersFound array is reset
        expectedState.lettersFound = [];
        expectedState.grid.rows[0].cols[0].selected = false;
        expectedState.grid.rows[0].cols[0].partOfWordFound = true;
        expectedState.grid.rows[0].cols[1].selected = false;
        expectedState.grid.rows[0].cols[1].partOfWordFound = true;
        expectedState.grid.rows[0].cols[2].selected = false;
        expectedState.grid.rows[0].cols[2].partOfWordFound = true;
        expectedState.words[0].wordFound = true;
        expectedState.sound.play = true;
        expectedState.sound.type = 'success';

        expect(state).toEqual(expectedState);

        //Now select cells again!
        //select cell (c)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
        let cell = new Cell('c', 0, 0, true);
        cell.partOfWordFound = true;
        expectedState.grid.rows[0].cols[0] = cell;
        expectedState.words[0].wordFound = true;
        expectedState.sound = {};
        expectedState.sound.play = false;
        expectedState.lettersFound = [cell];

        expect(state).toEqual(expectedState);

        //select next cell (a)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
        //select next cell (n)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 2});
        let cell2 = new Cell('a', 0, 1, true);
        cell2.partOfWordFound = true;
        expectedState.grid.rows[0].cols[1] = cell2;
        let cell3 = new Cell('n', 0, 2, true);
        cell3.partOfWordFound = true;
        expectedState.grid.rows[0].cols[2] = cell3;
        expectedState.lettersFound.push(cell2);
        expectedState.lettersFound.push(cell3);

        expect(state).toEqual(expectedState);
    });

    it('first and second letters in the reverse order, and match word', () => {
        let state = {
            grid: fillDefaultGrid({}, '-', 6, 6),
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
                {'letter': 'i', 'colPosition': 0, 'rowPosition': 1},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-', 6, 6),
            words: [],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        expectedState.grid.rows[0].cols[0].value = 'c';
        expectedState.grid.rows[0].cols[1].value = 'a';
        expectedState.grid.rows[0].cols[2].value = 'n';
        expectedState.words.push({
            word: 'can', wordFound: false, positionInGrid: [
                {'letter': 'c', 'colPosition': 0, 'rowPosition': 0},
                {'letter': 'a', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'n', 'colPosition': 2, 'rowPosition': 0}]
        });
        expectedState.grid.rows[1].cols[0].value = 'i';
        expectedState.grid.rows[1].cols[1].value = 'f';
        expectedState.words.push({
            word: 'if', wordFound: false, positionInGrid: [
                {'letter': 'i', 'colPosition': 0, 'rowPosition': 1},
                {'letter': 'f', 'colPosition': 1, 'rowPosition': 1}
            ]
        });
        //select cell (n)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 2});
        let cell = new Cell('n', 0, 2, true);
        expectedState.lettersFound = [cell];
        expectedState.grid.rows[0].cols[2] = cell;
        expect(state).toEqual(expectedState);


        //select next cell (a)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
        let cell2 = new Cell('a', 0, 1, true);
        expectedState.lettersFound.push(cell2);
        expectedState.grid.rows[0].cols[1] = cell2;
        expect(state).toEqual(expectedState);

        //select next cell (c)
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
        // when word has been mateched the lettersFound array is reset
        expectedState.lettersFound = [];
        expectedState.grid.rows[0].cols[0].selected = false;
        expectedState.grid.rows[0].cols[0].partOfWordFound = true;
        expectedState.grid.rows[0].cols[1].selected = false;
        expectedState.grid.rows[0].cols[1].partOfWordFound = true;
        expectedState.grid.rows[0].cols[2].selected = false;
        expectedState.grid.rows[0].cols[2].partOfWordFound = true;
        expectedState.sound = {
            "play": true,
            "type": "success"
        };
        expectedState.words[0].wordFound = true;
        expect(state).toEqual(expectedState)
    });


    it('second letters is in a diagonal direction to the first, hence illegal', () => {
        let state = {
            grid: fillDefaultGrid({}, '-', 6, 6),
            words: [],
            lettersFound: []
        };
        state.grid.rows[1].cols[4].value = 'z';
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

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-', 6, 6),
            words: [],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        expectedState.grid.rows[1].cols[4].value = 'z';
        expectedState.grid.rows[0].cols[0].value = 'c';
        expectedState.grid.rows[0].cols[0].selected = true;
        expectedState.grid.rows[0].cols[1].value = 'a';
        expectedState.grid.rows[0].cols[2].value = 'n';

        expectedState.words.push({
            word: 'can', wordFound: false, positionInGrid: [
                {'letter': 'c', 'colPosition': 0, 'rowPosition': 0},
                {'letter': 'a', 'colPosition': 1, 'rowPosition': 0},
                {'letter': 'n', 'colPosition': 2, 'rowPosition': 0}]
        });
        expectedState.lettersFound = [new Cell('c', 0, 0, true)];

        // first click
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
        expect(state).toEqual(expectedState);

        //select 2nd cell
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4});
        expectedState.sound = {play: true, type: 'warning'};
        expect(state).toEqual(expectedState);

    });

    it('first two letters in a horizontal plain, third click vertical to the first, hence illegal', () => {
        let state = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: []
        };
        state.grid.rows[1].cols[0].value = 'z';
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

        //after legal selection
        let expectedState = {
            grid: fillDefaultGrid({}, '-'),
            words: [],
            lettersFound: [],
            "sound": {
                "play": false
            }
        };
        expectedState.grid.rows[1].cols[0].value = 'z';
        expectedState.grid.rows[0].cols[0].value = 'c';
        expectedState.grid.rows[0].cols[0].selected = true;
        expectedState.grid.rows[0].cols[1].value = 'a';
        expectedState.grid.rows[0].cols[1].selected = true;
        expectedState.grid.rows[0].cols[2].value = 'n';

        expectedState.words.push({
            word: 'can', wordFound: false, positionInGrid: [
                {'letter': 'c', 'rowPosition': 0, 'colPosition': 0},
                {'letter': 'a', 'rowPosition': 0, 'colPosition': 1},
                {'letter': 'n', 'rowPosition': 0, 'colPosition': 2}]
        });
        expectedState.lettersFound = [new Cell('c', 0, 0, true), new Cell('a', 0, 1, true)];


        // first clicks
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
        expect(state).toEqual(expectedState);

        //illegal click
        state = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 0});
        expectedState.sound = {play: true, type: 'warning'};
        expect(state).toEqual(expectedState);


    })

    it('should be able to find all words in any grid', () => {
            let boardNumber = 1;
            while (boardNumber < 2) {

                let state = gamePlay(undefined, {type: GAME_SELECT, changeValue: 'wordSet' + boardNumber});

                state.words.map((wordObj)=> {
                    wordObj.positionInGrid.map((cellPosObj)=> {
                        state = gamePlay(state, {type: CELL_CLICK, rowPos: cellPosObj.rowPosition, columnPos: cellPosObj.colPosition})
                    })
                })
                let wordsFoundArray = state.words.filter(word=>word.wordFound)
                expect(wordsFoundArray.length).toEqual(state.words.length)
                boardNumber++;
            }
        }
    )


});