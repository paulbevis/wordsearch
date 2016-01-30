import React, { Component, PropTypes } from 'react'
import Row from './row'
import {MAX_GRID_HEIGHT} from '../constants/data'

export default class Grid extends Component {
    provideDummyRows(keyPefix) {
        let gridHeight = this.props.grid.rows.length;
        let blankRow = MAX_GRID_HEIGHT - gridHeight;
        if (blankRow !== 0) {
            blankRow = (blankRow / 2)
        }
        var divs = [];
        let counter = 0;
        while (counter < blankRow) {
            divs.push(<div key={keyPefix+counter} className='section group'>
                <div className="col span_12_of_12" style={{height:'40px'}}></div>
            </div>);
            counter++;
        }
        return divs
    }

    render() {
        return (
            <div className="col span_9_of_12" style={{}}>
                <div className="section group" style={{background:'#0cc3ff'}}>
                    {this.provideDummyRows('b')}
                    {this.props.grid.rows.map((row, index)=>
                        <Row key={index} onCellClick={this.props.onCellClick} onCellExplosionFragment={this.props.onCellExplosionFragment} {...row} />)
                    }
                    {this.provideDummyRows('a')}
                </div>
            </div>
        )
    }
}

Grid.propTypes = {
    onCellClick: PropTypes.func.isRequired
};