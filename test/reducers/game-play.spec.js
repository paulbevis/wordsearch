/**
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
import expect from 'expect'
import {gamePlay} from '../../js/reducers/game-play'
import {fillDefaultGrid} from '../../js/reducers/board-creator'
import {Cell, Sound}  from '../../js/domain/components'
import {CELL_CLICK, GAME_START, GAME_SELECT, LAST_LETTER_FOUND} from '../../js/constants/action-types'
import deepFreeze from 'deep-freeze'

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
      },
      gameOver: false
    };
    expect(
      gamePlay(undefined, {})
    ).toEqual(state)
  });

  it('first click, updates cell', () => {
    let state = {
      grid: fillDefaultGrid({}, '-', 6, 6),
      words: [],
      lettersFound: [],
      gameOver: false
    };
    state.grid.rows[0].cols[0].value = 'p';
    state.words.push({word: 'push', wordFound: false});
    deepFreeze(state);

    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-', 6, 6),
      lettersFound: [],
      sound: {play: false},
      words: [{word: 'push', wordFound: false}],
      gameOver: false
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
      lettersFound: [],
      gameOver: false
    };
    state.grid.rows[1].cols[0].value = 'p';
    state.grid.rows[1].cols[1].value = 'o';
    state.grid.rows[1].cols[2].value = 't';
    state.words.push({
      word: 'can', wordFound: false, positionInGrid: [
        {'letter': 'p', 'colPosition': 0, 'rowPosition': 1},
        {'letter': 'o', 'colPosition': 1, 'rowPosition': 1},
        {'letter': 't', 'colPosition': 2, 'rowPosition': 1}
      ]
    });
    deepFreeze(state);

    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
    };
    //cell is selected
    let cell = new Cell('p', 1, 0, true);
    let cell2 = new Cell('o', 1, 1, false);
    let cell3 = new Cell('t', 1, 2, false);
    expectedState.grid.rows[1].cols[0] = cell;
    expectedState.grid.rows[1].cols[1] = cell2;
    expectedState.grid.rows[1].cols[2] = cell3;
    //selected cell added to lettersfound
    expectedState.lettersFound.push(cell);
    expectedState.words.push({
      word: 'can', wordFound: false, positionInGrid: [
        {'letter': 'p', 'colPosition': 0, 'rowPosition': 1},
        {'letter': 'o', 'colPosition': 1, 'rowPosition': 1},
        {'letter': 't', 'colPosition': 2, 'rowPosition': 1}
      ]
    });
    //select cell
    let newState = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 0});
    expect(newState).toEqual(expectedState);
    deepFreeze(newState);
    //unselect cell
    expect(gamePlay(newState, {type: CELL_CLICK, rowPos: 1, columnPos: 0}).grid).toEqual(state.grid)
  });

  it('first click, updates letters found', () => {
    let state = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
    };
    state.grid.rows[1].cols[4].value = 'p';
    state.words.push({word: 'push', wordFound: false});
    deepFreeze(state);

    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
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
      lettersFound: [],
      gameOver: false
    };
    state.grid.rows[1].cols[4].value = 'p';
    state.words.push({word: 'push', wordFound: false});
    deepFreeze(state);

    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
    };

    //cell is selected
    let cell = new Cell('p', 1, 4, true);
    expectedState.grid.rows[1].cols[4] = cell;
    //selected cell added to lettersfound
    expectedState.lettersFound.push(cell);
    expectedState.words.push({word: 'push', wordFound: false});

    //select cell
    let newState2 = gamePlay(state, {type: CELL_CLICK, rowPos: 1, columnPos: 4});
    expect(newState2).toEqual(expectedState);
    deepFreeze(newState2);

    //unselect cell
    expectedState.lettersFound = [];
    expectedState.grid.rows[1].cols[4].selected = false;
    expect(gamePlay(newState2, {type: CELL_CLICK, rowPos: 1, columnPos: 4})).toEqual(expectedState)
  });

  it('first, second and third letters in correct order, and match word', () => {
    let state = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      gameOver: false
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
    deepFreeze(state);
    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
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
    let newState = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});

    let cell = new Cell('c', 0, 0, true);
    expectedState.lettersFound = [cell];
    expectedState.grid.rows[0].cols[0] = cell;
    //check letters found, as it will removed on complete word match
    expect(newState).toEqual(expectedState);
    deepFreeze(newState);

    //select next cell (a)
    let newState2 = gamePlay(newState, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
    let cell2 = new Cell('a', 0, 1, true);
    expectedState.lettersFound.push(cell2);
    expectedState.grid.rows[0].cols[1] = cell2;
    //check letters found, as it will removed on complete word match
    expect(newState2).toEqual(expectedState);
    deepFreeze(newState2);
    
    //select next cell (n)
    let newState3 = gamePlay(newState2, {type: CELL_CLICK, rowPos: 0, columnPos: 2});
    // when word has been mateched the lettersFound array is reset
    expectedState.lettersFound = [];
    expectedState.grid.rows[0].cols[0].selected = false;
    expectedState.grid.rows[0].cols[0].partOfWordFound = true;
    expectedState.grid.rows[0].cols[0].explode = true;
    expectedState.grid.rows[0].cols[1].selected = false;
    expectedState.grid.rows[0].cols[1].partOfWordFound = true;
    expectedState.grid.rows[0].cols[1].explode = true;
    expectedState.grid.rows[0].cols[2].selected = false;
    expectedState.grid.rows[0].cols[2].partOfWordFound = true;
    expectedState.grid.rows[0].cols[2].explode = true;
    expectedState.words[0].wordFound = true;
    expectedState.sound.play = true;
    expectedState.sound.type = 'success';

    expect(newState3).toEqual(expectedState)
  });

  it('after a word is matched, selecting the same cells cannot unfind it!', () => {
    let state = {
      grid: fillDefaultGrid({}, '-', 6, 6),
      words: [],
      lettersFound: [],
      gameOver: false
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
    deepFreeze(state);
    
    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-', 6, 6),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
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
    let newState2 = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
    //select next cell (a)
    deepFreeze(newState2);
    let newState3 = gamePlay(newState2, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
    //select next cell (n)
    deepFreeze(newState3)
    let newState4 = gamePlay(newState3, {type: CELL_CLICK, rowPos: 0, columnPos: 2});

    // when word has been mateched the lettersFound array is reset
    expectedState.lettersFound = [];
    expectedState.grid.rows[0].cols[0].selected = false;
    expectedState.grid.rows[0].cols[0].partOfWordFound = true;
    expectedState.grid.rows[0].cols[0].explode = true;
    expectedState.grid.rows[0].cols[1].selected = false;
    expectedState.grid.rows[0].cols[1].partOfWordFound = true;
    expectedState.grid.rows[0].cols[1].explode = true;
    expectedState.grid.rows[0].cols[2].selected = false;
    expectedState.grid.rows[0].cols[2].partOfWordFound = true;
    expectedState.grid.rows[0].cols[2].explode = true;
    expectedState.words[0].wordFound = true;
    expectedState.sound.play = true;
    expectedState.sound.type = 'success';

    expect(newState4).toEqual(expectedState);
    deepFreeze(newState4);

    //Now select cells again!
    //select cell (c)
    let newState5 = gamePlay(newState4, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
    let cell = new Cell('c', 0, 0, true);
    cell.partOfWordFound = true;
    cell.explode = true;
    expectedState.grid.rows[0].cols[0] = cell;
    expectedState.words[0].wordFound = true;
    expectedState.sound = {};
    expectedState.sound.play = false;
    expectedState.lettersFound = [cell];

    expect(newState5).toEqual(expectedState);
    deepFreeze(newState5);

    //select next cell (a)
    let newState6 = gamePlay(newState5, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
    deepFreeze(newState6);

    //select next cell (n)
    let newState7 = gamePlay(newState6, {type: CELL_CLICK, rowPos: 0, columnPos: 2});
    let cell2 = new Cell('a', 0, 1, true);
    cell2.partOfWordFound = true;
    cell2.explode = true;
    expectedState.grid.rows[0].cols[1] = cell2;
    let cell3 = new Cell('n', 0, 2, true);
    cell3.partOfWordFound = true;
    cell3.explode = true;
    expectedState.grid.rows[0].cols[2] = cell3;
    expectedState.lettersFound.push(cell2);
    expectedState.lettersFound.push(cell3);

    expect(newState7).toEqual(expectedState);
  });

  it('first and second letters in the reverse order, and match word', () => {
    let state = {
      grid: fillDefaultGrid({}, '-', 6, 6),
      words: [],
      lettersFound: [],
      gameOver: false
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
    deepFreeze(state);

    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-', 6, 6),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
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
    let newState2 = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 2});
    let cell = new Cell('n', 0, 2, true);
    expectedState.lettersFound = [cell];
    expectedState.grid.rows[0].cols[2] = cell;
    expect(newState2).toEqual(expectedState);


    //select next cell (a)
    deepFreeze(newState2);
    let newState3 = gamePlay(newState2, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
    let cell2 = new Cell('a', 0, 1, true);
    expectedState.lettersFound.push(cell2);
    expectedState.grid.rows[0].cols[1] = cell2;
    expect(newState3).toEqual(expectedState);

    //select next cell (c)
    let newState4 = gamePlay(newState3, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
    // when word has been mateched the lettersFound array is reset
    expectedState.lettersFound = [];
    expectedState.grid.rows[0].cols[0].selected = false;
    expectedState.grid.rows[0].cols[0].partOfWordFound = true;
    expectedState.grid.rows[0].cols[0].explode = true;
    expectedState.grid.rows[0].cols[1].selected = false;
    expectedState.grid.rows[0].cols[1].partOfWordFound = true;
    expectedState.grid.rows[0].cols[1].explode = true;
    expectedState.grid.rows[0].cols[2].selected = false;
    expectedState.grid.rows[0].cols[2].partOfWordFound = true;
    expectedState.grid.rows[0].cols[2].explode = true;
    expectedState.sound = {
      "play": true,
      "type": "success"
    };
    expectedState.words[0].wordFound = true;
    expect(newState4).toEqual(expectedState)
  });


  it('second letters is in a diagonal direction to the first, hence illegal', () => {
    let state = {
      grid: fillDefaultGrid({}, '-', 6, 6),
      words: [],
      lettersFound: [],
      gameOver: false
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
    deepFreeze(state);
    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-', 6, 6),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
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
    let newState2 = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
    expect(newState2).toEqual(expectedState);
    deepFreeze(newState2);

    //select 2nd cell
    let newState3 = gamePlay(newState2, {type: CELL_CLICK, rowPos: 1, columnPos: 4});
    expectedState.sound = {play: true, type: 'warning'};
    expect(newState3).toEqual(expectedState);

  });

  it('first two letters in a horizontal plain, third click vertical to the first, hence illegal', () => {
    let state = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      gameOver: false
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
    deepFreeze(state);
    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      "sound": {
        "play": false
      },
      gameOver: false
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
    let newState2 = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
    deepFreeze(newState2);
    let newState3 = gamePlay(newState2, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
    expect(newState3).toEqual(expectedState);

    //illegal click
    deepFreeze(newState3);
    let newState4 = gamePlay(newState3, {type: CELL_CLICK, rowPos: 1, columnPos: 0});
    expectedState.sound = {play: true, type: 'warning'};
    expect(newState4).toEqual(expectedState);


  });

  it('should set game over when all words are found', () => {
    let state = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      lettersFound: [],
      gameOver: false
    };
    state.grid.rows[0].cols[0].value = 'h';
    state.grid.rows[0].cols[1].value = 'e';
    state.words.push({
      word: 'he', wordFound: false, positionInGrid: [
        {'letter': 'h', 'colPosition': 0, 'rowPosition': 0},
        {'letter': 'e', 'colPosition': 1, 'rowPosition': 0}
      ]
    });
    deepFreeze(state);
    //after legal selection
    let expectedState = {
      grid: fillDefaultGrid({}, '-'),
      words: [],
      "sound": {
        "play": true,
        "type": "congratulations"
      },
      gameOver: true
    };
    expectedState.grid.rows[0].cols[0].value = 'h';
    expectedState.grid.rows[0].cols[0].selected = true;
    expectedState.grid.rows[0].cols[1].value = 'e';

    expectedState.words.push({
      word: 'he', wordFound: true, positionInGrid: [
        {'letter': 'h', 'rowPosition': 0, 'colPosition': 0},
        {'letter': 'e', 'rowPosition': 0, 'colPosition': 1}]
    });
    let cell = new Cell('h', 0, 0, false, true, true);
    let cell2 = new Cell('e', 0, 1, false, true, true, true);
    expectedState.grid.rows[0].cols[0] = cell;
    expectedState.grid.rows[0].cols[1] = cell2;


    // first clicks
    let newState2 = gamePlay(state, {type: CELL_CLICK, rowPos: 0, columnPos: 0});
    deepFreeze(newState2);
    let newState3 = gamePlay(newState2, {type: CELL_CLICK, rowPos: 0, columnPos: 1});
    deepFreeze(newState3);
    let newState4 = gamePlay(newState3, {type: LAST_LETTER_FOUND});
    expect(newState4).toEqual(expectedState);

  })


});