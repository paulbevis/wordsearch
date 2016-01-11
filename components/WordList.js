import React, { Component, PropTypes } from 'react'
import Word from './Word'

export default class WordList extends Component {
    render() {
        return (
            <div style={{
                    display: 'flex',
                    flexFlow:  'column nowrap',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    height:'370px',
                    textAlign: 'center'}}>
                {
                    this.props.wordList.map(word=>
                        <Word key={word.word} {...word}/>)
                }
            </div>
        )
    }
};