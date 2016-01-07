import React, { Component, PropTypes } from 'react'

export default class Word extends Component {
    render() {
        console.log('word: ', this.props)
        return (
            <li style={{listStyleType:'none', textDecoration:this.props.wordFound?'line-through':'none'}}> {this.props.word}</li>
        )
    }
};