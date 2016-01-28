import React, { Component, PropTypes } from 'react'

export default class Explosion extends Component {

    render() {
        return (
            <div className='box' ref="comp" onCellExplosionFragment={this.props.onCellExplosionFragment} {...this.props}></div>
        )
    }

    componentDidMount() {
        this.explosions=0;
        this.refs.comp.addEventListener("webkitAnimationEnd", (e)=> {
            e.target.className = '';
            this.props.onCellExplosionFragment(this.props.rowPos, this.props.columnPos);
        });
    }
    componentWillUnmount(){
        this.refs.comp.removeEventListener();
    }

}