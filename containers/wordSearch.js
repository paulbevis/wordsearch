import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {cellClickAction} from '../actions/wordSearch'
import Grid from '../components/Grid'
class WordSearch extends Component {
    render() {
        const { dispatch, cells } = this.props;

        return (
            <Grid onCellClick={(xPos,yPos) =>
                                    dispatch(cellClickAction(xPos, yPos))
                                  } cells={cells}></Grid>
        )
    }
}


function select(state) {
    return {
        cells:state.cells
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(WordSearch)