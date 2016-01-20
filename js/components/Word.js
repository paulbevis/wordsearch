import React, { Component, PropTypes } from 'react'


export default class Word extends Component {
    render() {
        const wordStyle = {
//    flex:'1 0 auto',
//        alignSelf:'auto',
            background: this.props.wordFound ? 'lightGreen' : 'lightGray',
//        display: 'flex',
//        justifyContent: 'center',
            alignItems: 'center',
//        minWidth:'80px',
            'borderRadius': 3 + 'px',
            lineHeight: '40px',
            fontSize: 30 + 'px',
            textAlign: 'center',
            height: '40px',
                         marginTop:'5px',
            marginBottom:'5px'
//        margin: '5px 0'
        }
        return (
            <div className="section group" style={{paddingLeft: '7px', paddingRight:'7px'}}>
                <div className="col span_12_of_12" style={wordStyle}>
                    {this.props.word}
                </div>
            </div>
        )
    }
};