import React, { Component, PropTypes } from 'react'

//style={{
//    flex:'1 0 auto',
//        alignSelf:'auto',
//        background: this.props.wordFound?'lightGreen':'lightGray',
//        display: 'flex',
//        justifyContent: 'center',
//        alignItems: 'center',
//        minWidth:'80px',
//        borderRadius:'10px',
//        margin: '5px 0'
//}}

export default class Word extends Component {
    render() {
        return (
            <div >
                {this.props.word}
            </div>
        )
    }
};