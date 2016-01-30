import React, { Component, PropTypes } from 'react'
import GameSelector from './game-selector'

export default class GameSelection extends Component {
    buildRow(start, end) {
        var divs = [];
        let counter = start;
        while (counter <= end) {
            divs.push(<GameSelector key={'list'+counter} value={counter} onGameSelect={this.props.onGameSelect}/>);
            counter++;
        }
        return divs
    }

    render() {
        const style = {
            background: '#0cc3ff',
            padding: '0 7px'
        };
        return (
            <div>
                <div className="section group"  style={style}>
                    {this.buildRow(1, 10)}
                </div>
                <div className="section group" style={style}>
                    {this.buildRow(11, 20)}
                </div>

            </div>
        )
    }

}
