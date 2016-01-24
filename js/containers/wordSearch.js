import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {cellClickAction, startGameAction, selectGameAction, soundPlayedAction} from '../actions/wordSearch'
import Grid from '../components/Grid'
import Start from '../components/Start'
import SelectGame from '../components/SelectGame'
import GameSelection from '../components/GameSelection'
import WordList from '../components/WordList'
import PlaySound from '../components/PlaySound'
import RaisedButton from 'material-ui/lib/raised-button';

class WordSearch extends Component {
    render() {
        const { dispatch, grid, selectedGame, wordList, sound } = this.props;

        return (
            <div className="section group" style={{ }}>
                <div className="col span_12_of_12">
                    <div className="section group" style={{ }}>

                        <Grid onCellClick={(rowPos,columnPos) =>
                                    dispatch(cellClickAction(rowPos, columnPos))
                                  } grid={grid}/>

                        <WordList wordList={wordList}/>

                    </div>
                </div>
                <div className="section group">
                    <div className="col span_12_of_12" style={{marginTop:'-5px'}}>
                        <GameSelection onGameSelect={(value) => dispatch(selectGameAction(value))}/>
                    </div>
                </div>
                <PlaySound sound={sound} onSoundPlayed={() => dispatch(soundPlayedAction())}/>
            </div>
        )
    }
}


function select(state) {
    return {
        grid: state.gamePlay.grid,
        selectedGame: state.currentGame,
        wordList: state.gamePlay.words,
        sound: state.gamePlay.sound
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(WordSearch)