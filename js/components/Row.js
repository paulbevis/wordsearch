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
import React, { Component, PropTypes } from 'react'
import Cell from './cell'
import {MAX_GRID_WIDTH} from '../constants/data'

export default class Row extends Component {
    provideDummyCells(keyPefix) {
        let gridWidth = this.props.cols.length;
        let blankCell = MAX_GRID_WIDTH - gridWidth;
        if (blankCell !== 0) {
            blankCell = (blankCell / 2)
        }
        var divs = [];
        let counter = 0;
        while (counter < blankCell) {
            divs.push(<div key={keyPefix+counter} className='col span_1_of_10'></div>);
            counter++;
        }
        return divs
    }

    render() {
        return (
            <div className="section group" style={{padding: '0 7px'}}>
                {this.provideDummyCells('b')}
                {                                      this.props.cols.map((cell, index)=>
                    <Cell key={cell.rowPos + '' + cell.columnPos} rowPos={cell.rowPos}
                          columnPos={cell.columnPos}
                        {...cell}
                          onClick={() => this.props.onCellClick(cell.rowPos, cell.columnPos)}
                          onCellExplosionFragment={this.props.onCellExplosionFragment}
                          onLastLetterOfLastWord={this.props.onLastLetterOfLastWord}
                    />
                )}
                {this.provideDummyCells('a')}
            </div>
        )
    }
}

Row.propTypes = {
    onCellClick: PropTypes.func.isRequired
};