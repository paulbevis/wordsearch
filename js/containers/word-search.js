import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {cellClickAction, startGameAction, selectGameAction, cellExplosionFragmentAction} from '../actions/word-search'
import Grid from '../components/grid'
import Start from '../components/start'
import SelectGame from '../components/select-game'
import GameSelection from '../components/game-selection'
import WordList from '../components/word-list'
import PlaySound from '../components/play-sound'
import RaisedButton from 'material-ui/lib/raised-button';

class WordSearch extends Component {

    componentDisplay() {
        let container = [];

        if (this.props.gameOver) {
            container.push(<div className="col span_9_of_12">
                <div key='gameOver' className="game-over">Game Over!!!!!!</div>
            </div>)
        }
        container.push(<Grid key="grid" onCellClick={(rowPos,columnPos) =>this.props.dispatch(cellClickAction(rowPos, columnPos))}
                             grid={this.props.grid}
                             onCellExplosionFragment={(rowPos,columnPos)=>this.props.dispatch(cellExplosionFragmentAction(rowPos,columnPos))}/>)
        container.push(<WordList key="wordList" wordList={this.props.wordList}/>)
        return container
    }

    render() {
        const { dispatch, grid, selectedGame, wordList, sound, gameOver } = this.props;

        return (
            <div className="section group" style={{ }}>
                <div className="col span_12_of_12">

                    <div className="section group">
                        {this.componentDisplay()}
                    </div>
                </div>
                <div className="section group">
                    <div className="col span_12_of_12" style={{marginTop:'-5px'}}>
                        <GameSelection onGameSelect={(value) => dispatch(selectGameAction(value))}/>
                    </div>
                </div>
                <PlaySound sound={sound}/>
            </div>
        )
    }
}


function select(state) {
    return {
        grid: state.gamePlay.grid,
        selectedGame: state.currentGame,
        wordList: state.gamePlay.words,
        sound: state.gamePlay.sound,
        gameOver: state.gamePlay.gameOver
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(WordSearch)