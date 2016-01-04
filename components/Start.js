import React, { Component, PropTypes } from 'react'

export default class Start extends Component {
    render() {
        console.log(this.props);
        return (
            <button disabled={this.props.selectedGame?'':'disabled'} onClick={this.props.onStartGameClick}>
                Start
            </button>
        )
    }

}
Start.propTypes = {
    onStartGameClick: PropTypes.func.isRequired,
};