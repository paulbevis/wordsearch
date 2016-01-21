import React, { Component, PropTypes } from 'react'

export default class Cell extends Component {
    render() {
        const myStyle = {
            background: this.props.selected ? 'lightBlue' : this.props.partOfWordFound ? 'lightGreen' : 'lightGray',
            'borderRadius': 3 + 'px',
            lineHeight: 40 + 'px',
            fontSize: 30 + 'px',
            textAlign: 'center',
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