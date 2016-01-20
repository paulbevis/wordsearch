import React, { Component, PropTypes } from 'react'
import Row from './Row'

export default class Grid extends Component {
    render() {
        return (
            <div className="col span_9_of_12" style={{background: 'white'}}>
            <div className="section group" style={{background: 'white'}}>
                {this.props.grid.rows.map((row, index)=>
                    <Row key={index} onCellClick={this.props.onCellClick} {...row} />)
                }
            </div>
            </div>
        )
    }
}

Grid.propTypes = {
    onCellClick: PropTypes.func.isRequired
};