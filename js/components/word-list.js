import React, { Component, PropTypes } from 'react'
import Word from './word'

export default class WordList extends Component {

    padRows(numberOfWords) {
        let divs = [];
        while (numberOfWords < 10) {
            divs.push(<div key={'word-pad'+numberOfWords} style={{height: '40px', marginTop: '5px', marginBottom: '5px'}}></div>);
            numberOfWords++;
        }
        return divs;
    }

    render() {
        const style = {
            background: '#0cc3ff'
        };
        return (
            <div className="col span_3_of_12" style={style}>
                <div className="section group" style={{padding: '5px 0px'}}>
                    {
                        this.props.wordList.map((word, index)=>
                            <Word key={word.word+index} {...word}/>)
                    }
                    {this.padRows(this.props.wordList.length)}
                </div>
            </div>
        )
    }
};