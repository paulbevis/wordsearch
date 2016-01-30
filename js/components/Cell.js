import React, { Component, PropTypes } from 'react'
import Explosion from './Explosion'

export default class Cell extends Component {
    buildInnerComponent(value) {
        if (this.props.explode) {
            var divs = [];
            let counter = 0;
            while (counter < 16) {
                divs.push(<Explosion key={'exp'+counter} {...this.props} onCellExplosionFragment={this.props.onCellExplosionFragment}/>);
                counter++;
            }
            return divs
        } else {
            return value;
        }
    }

    render() {
        const myStyle = {
            background: this.props.selected ? 'lightBlue' : this.props.partOfWordFound ? 'lightGreen' : 'lightGray',
            'borderRadius': 3 + 'px',
            lineHeight: 40 + 'px',
            fontSize: 30 + 'px',
            textAlign: 'center',
            'cursor': 'pointer',
            position: 'relative'
        };

        return (
            <div ref="container" className="col span_1_of_10" onClick={this.props.onClick} style={myStyle}>
                {this.buildInnerComponent(this.props.value)}
            </div>
        )
    }
}

Cell.propTypes = {
    onClick: PropTypes.func.isRequired,
    onCellExplosionFragment: PropTypes.func.isRequired
};