import React, { Component, PropTypes } from 'react'

export default class Word extends Component {
    render() {
        return (
            <div style={{
                flex:'1 0 auto',
                alignSelf:'auto',
                background: this.props.wordFound?'lightGreen':'lightGray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth:'80px',
                borderRadius:'10px',
                margin: '5px 0'
            }}>
                {this.props.word}
            </div>
        )
    }
};