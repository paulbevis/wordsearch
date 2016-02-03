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
import GameSelector from './game-selector'

export default class GameSelection extends Component {
    buildRow(start, end) {
        var divs = [];
        let counter = start;
        while (counter <= end) {
            divs.push(<GameSelector key={'list'+counter} value={counter} onGameSelect={this.props.onGameSelect}/>);
            counter++;
        }
        return divs
    }

    render() {
        const style = {
            background: '#0cc3ff',
            padding: '0 7px'
        };
        return (
            <div>
                <div className="section group"  style={style}>
                    {this.buildRow(1, 10)}
                </div>
                <div className="section group" style={style}>
                    {this.buildRow(11, 20)}
                </div>

            </div>
        )
    }

}
