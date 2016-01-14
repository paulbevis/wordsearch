import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {cellClickAction, startGameAction, selectGameAction} from '../actions/wordSearch'
import Grid from '../components/Grid'
import Start from '../components/Start'
import SelectGame from '../components/SelectGame'
import WordList from '../components/WordList'

class WordSearch extends Component {
    render() {
        const { dispatch, grid, selectedGame, wordList } = this.props;

        return (
            <div style={{width:100+'%', textAlign:'center', fontFamily:'sans-serif'}}>
                <Grid onCellClick={(rowPos,columnPos) =>
                                    dispatch(cellClickAction(rowPos, columnPos))
                                  } grid={grid}></Grid>

                <div style={{display: 'inline-block',height:400+'px', minWidth:'100px'}}>
                    <WordList wordList={wordList}/>
                    <div style={{display: 'inline-block', height:'30px'}}>
                        <SelectGame onGameSelect={(value) => dispatch(selectGameAction(value))}/>
                    </div>
                </div>
            </div>
        )
    }
}


function select(state) {
    return {
        grid: state.gamePlay.grid,
        selectedGame: state.currentGame,
        wordList: state.gamePlay.words
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(WordSearch)