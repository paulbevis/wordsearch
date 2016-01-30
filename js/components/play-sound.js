import React, { Component, PropTypes } from 'react'

export default class PlaySound extends Component {
    render() {
        return (
            <div>
                <audio src="audio/success.m4a" preload="auto" ref="success"/>
                <audio src="audio/warning.m4a" preload="auto" ref="warning"/>
                {this.playSound()}
            </div>
        )
    }


    playSound() {
        // will only contain data after didMount is called!
        if (this.refs.success && this.props.sound.play) {
            switch (this.props.sound.type) {
                case'success':
                    this.refs.success.play();
                    break;
                case 'warning':
                    this.refs.warning.play();
                    break;
            }
        }
    }
}