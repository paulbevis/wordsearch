import expect from 'expect'
import {gamePlay} from '../../reducers/gamePlay'
import * as types from '../../constants/actionTypes'
import {CELLS_GRID} from './data'

describe('gamePlay reducer', () => {
    it('should handle initial state', () => {

        expect(
            gamePlay(undefined, {})
        ).toEqual(
                {
                    cells: CELLS_GRID,
                    words: [],
                    lettersFound: []
                }
            )
    })
})