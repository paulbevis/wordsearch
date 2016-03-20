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


export default class Word extends Component {
    render() {
        const wordStyle = {
            background: this.props.wordFound ? 'lightGreen' : 'lightGray',
            alignItems: 'center',
            'borderRadius': 3 + 'px',
            lineHeight: '38px',
            fontSize: 25 + 'px',
            textAlign: 'center',
            marginTop: '3.1%',
            marginBottom: '3.1%',
            color: '#333'
        };
        return (
            <div className="section group" style={{paddingLeft: '7px', paddingRight:'7px'}}>
                <div className="col span_12_of_12" style={wordStyle}>
                    {this.props.word}
                </div>
            </div>
        )
    }
};