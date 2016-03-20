/*
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
import {CELL_CLICK, GAME_START, GAME_SELECT} from '../constants/action-types'
import {combineReducers} from 'redux'
import {gamePlay} from './game-play'

export function currentGame(state = '', action) {
  switch (action.type) {
    case GAME_SELECT:
      return {'description': '(List ' + action.listNumber + ')', 'number': action.listNumber};
    default:
      return state
  }

}

const wordSearchAppReducers = combineReducers({
  gamePlay,
  currentGame
});

export default wordSearchAppReducers