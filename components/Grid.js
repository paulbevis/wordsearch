import React, { Component, PropTypes } from 'react'
import Row from './Row'

export default class Grid extends Component {
    render() {
        return (
            <div style={{display: 'inline-block'}}>
                {this.props.cells.map((row, index)=>
                    <Row key={index} onCellClick={this.props.onCellClick} {...row} />)
                }
            </div>
        )
    }
}

Grid.propTypes = {
    onCellClick: PropTypes.func.isRequired
};