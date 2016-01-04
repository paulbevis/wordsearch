import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {cellClickAction, startGameAction, selectGameAction} from '../actions/wordSearch'
import Grid from '../components/Grid'
import Start from '../components/Start'
import SelectGame from '../components/SelectGame'

class WordSearch extends Component {
    render() {
        const { dispatch, cells, selectedGame } = this.props;

        return (
            <div style={{width:100+'%', textAlign:'center'}}>
                <Grid onCellClick={(xPos,yPos) =>
                                    dispatch(cellClickAction(xPos, yPos))
                                  } cells={cells}></Grid>

                <div style={{display: 'inline-block'}}>
                    <SelectGame onGameSelect={(value) => dispatch(selectGameAction(value))}/>
                    <Start selectedGame={selectedGame} onStartGameClick={() =>
                            dispatch(startGameAction())}/>
                </div>
            </div>
        )
    }
}


function select(state) {
    return {
        cells: state.cells,
        selectedGame:state.currentGame
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(WordSearch)