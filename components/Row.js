import React, { Component, PropTypes } from 'react'
import Cell from './Cell'

export default class Row extends Component {
    render() {
        return (
            <div>
                {this.props.row.map((cell,index)=>
                        <Cell key={cell.xPos+''+cell.yPos} xPos={cell.xPos}
                              yPos={cell.yPos}
                              {...cell}
                              onClick={() => this.props.onCellClick(cell.xPos, cell.yPos)}/>
                    )}
            </div>
        )
    }
}

Row.propTypes = {
    onCellClick: PropTypes.func.isRequired
};