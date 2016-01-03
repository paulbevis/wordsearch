import React, { Component, PropTypes } from 'react'

export default class Cell extends Component {
    render() {
        return (
            <div onClick={this.props.onClick}
                 style={{width:40+'px',
                        height:40+'px',
                        margin:5+'px',
                        padding:5+'px',
                        background:this.props.selected?'blue':'red',
                        display: 'inline-block'}}>
                {this.props.value}
            </div>
        )
    }
}
Cell.propTypes = {
    onClick: PropTypes.func.isRequired
};