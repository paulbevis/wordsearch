import React, { Component, PropTypes } from 'react'

export default class Cell extends Component {
    render() {
        const myStyle = {
            //width: 30 + 'px',
            //height: 30 + 'px',
            //margin: 5 + 'px',
            //padding: 5 + 'px',
            background: this.props.selected ? 'lightBlue' : this.props.partOfWordFound ? 'lightGreen' : 'lightGray',
            'borderRadius': 3 + 'px',
            //display: 'inline-block',
            lineHeight: 40 + 'px',
            fontSize: 30 + 'px',
            textAlign: 'center',
            //'fontFamily': 'sans-serif',
            'cursor': 'pointer'
        };


        return (
            <div className="col span_1_of_10" onClick={this.props.onClick} style={myStyle}>
                {this.props.value}
            </div>
        )
    }
}
Cell.propTypes = {
    onClick: PropTypes.func.isRequired
};