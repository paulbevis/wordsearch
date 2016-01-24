import React, { Component, PropTypes } from 'react'

export default class GameSelector extends Component {
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
            <div className="col span_1_of_10" onClick={(e)=>this.props.onGameSelect('wordSet' + this.props.value)} style={myStyle}>
                {this.props.value}
            </div>
        )
    }

    handleSelectorClick(e) {
        this.props.onGameSelect('wordSet' + e.target.value)
    }

}
GameSelector.propTypes = {
    onGameSelect: PropTypes.func.isRequired
};