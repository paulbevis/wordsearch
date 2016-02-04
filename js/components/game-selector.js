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

export default class GameSelector extends Component {
    render() {
        const myStyle = {
            background: this.props.selected ? 'lightBlue' : this.props.partOfWordFound ? 'lightGreen' : 'lightGray',
            'borderRadius': 3 + 'px',
            lineHeight: 40 + 'px',
            fontSize: 30 + 'px',
            textAlign: 'center',
            cursor: 'pointer',
            color: '#333'
        };
        return (
            <div className="col span_1_of_10" onClick={(e)=>this.props.onGameSelect('wordSet' + this.props.value)} style={myStyle}>
                {this.props.value}
            </div>
        )
    }

    handleSelectorClick(e) {
        this.props.onGameSelect('wordSet' + e.target.value)
    }

}
GameSelector.propTypes = {
    onGameSelect: PropTypes.func.isRequired
};