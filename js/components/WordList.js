import React, { Component, PropTypes } from 'react'
import Word from './Word'

export default class WordList extends Component {

    render() {
        const style = {
            background: '#0cc3ff'
        };
        return (
            <div className="col span_3_of_12" style={style}>
                <div className="section group">
                    {
                        this.props.wordList.map((word, index)=>
                            <Word key={word.word+index} {...word}/>)
                    }
                </div>
            </div>
        )
    }
};