import React, { Component, PropTypes } from 'react'

export default class Start extends Component {
    render() {
        return (
            <RaisedButton disabled={this.props.selectedGame?'':'disabled'} onClick={this.props.onStartGameClick} secondary={true} label="Start Game"/>

        )
    }

}
Start.propTypes = {
    onStartGameClick: PropTypes.func.isRequired
};