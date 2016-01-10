import React, { Component, PropTypes } from 'react'
import Cell from './Cell'

export default class Row extends Component {
    render() {
        return (
            <div>
                {this.props.row.map((cell,index)=>
                        <Cell key={cell.rowPos+''+cell.columnPos} rowPos={cell.rowPos}
                              columnPos={cell.columnPos}
                              {...cell}
                              onClick={() => this.props.onCellClick(cell.rowPos, cell.columnPos)}/>
                    )}
            </div>
        )
    }
}

Row.propTypes = {
    onCellClick: PropTypes.func.isRequired
};