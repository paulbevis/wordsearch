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
import Word from './word'

export default class WordList extends Component {

    padRows(numberOfWords) {
        let divs = [];
        while (numberOfWords < 10) {
            divs.push(<div key={'word-pad'+numberOfWords} style={{height: '40px', marginTop: '5px', marginBottom: '5px'}}></div>);
            numberOfWords++;
        }
        return divs;
    }

    render() {
        const style = {
            background: '#0cc3ff'
        };
        return (
            <div className="col span_3_of_12" style={style}>
                <div className="section group" style={{padding: '4px 0px'}}>
                    {
                        this.props.wordList.map((word, index)=>
                            <Word key={word.word+index} {...word}/>)
                    }
                    {this.padRows(this.props.wordList.length)}
                </div>
            </div>
        )
    }
};