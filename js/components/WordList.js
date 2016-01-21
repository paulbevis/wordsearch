import React, { Component, PropTypes } from 'react'
import Word from './Word'

export default class WordList extends Component {

    render() {
        const style = {
            background: '#00b2ed'
        };
        return (
            <div className="col span_3_of_12" style={style}>
                <div className="section group">
                    {
                        this.props.wordList.map(word=>
                            <Word key={word.word} {...word}/>)
                    }
                </div>
            </div>
        )
    }
};