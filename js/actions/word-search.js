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
import {CELL_CLICK, GAME_START, GAME_SELECT, CELL_EXPLOSION_FRAGMENT, LAST_LETTER_FOUND} from '../constants/action-types'

export function startGameAction() {
    return {
        type: GAME_START
    }
}

export function selectGameAction(changeValue) {
    return {
        type: GAME_SELECT,
        changeValue
    }
}

export function cellClickAction(rowPos, columnPos) {
    return {
        type: CELL_CLICK,
        rowPos,
        columnPos
    }
}

export function cellExplosionFragmentAction(rowPos, columnPos) {
    return {
        type: CELL_EXPLOSION_FRAGMENT,
        rowPos,
        columnPos
    }
}

export function lastLetterFoundAction() {
    return {
        type: LAST_LETTER_FOUND
    }
}