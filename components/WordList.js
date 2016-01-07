import React, { Component, PropTypes } from 'react'
import Word from './Word'

export default class WordList extends Component {
    render() {
        console.log('wordList: ', this.props)
        return (
            <ul>
                {this.props.wordList.map(word=>
                            <Word key={word.word} {...word}></Word>
                    )
                }
            </ul>
        )
    }
};