/*
 Copyright 2015 Paul Bevis

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import React, {Component, PropTypes} from 'react'
import Explosion from './explosion'

export default class Cell extends Component {

  buildInnerComponent(value) {
    if (this.props.explode) {
      var divs = [];
      let counter = 0;
      while (counter < 16) {
        divs.push(<Explosion explosionNumber={counter + 1} key={'exp' + counter} {...this.props} onCellExplosionFragment={this.props.onCellExplosionFragment}/>);
        counter++;
      }
      return divs
    } else {
      return value;
    }
  }


  render() {

    const myStyle = {
      background: this.props.selected ? '#ff4081' : this.props.partOfWordFound ? '#09BF22' : 'lightGray',
      'borderRadius': 3 + 'px',
      lineHeight: 38 + 'px',
      fontSize: 25 + 'px',
      textAlign: 'center',
      'cursor': 'pointer',
      position: 'relative',
      color: '#333'
    };

    return (
      <div ref="container" className="col span_1_of_10"
           onClick={this.props.onClick}
           style={myStyle}
           onLastLetterOfLastWord={this.props.onLastLetterOfLastWord}>
        {this.buildInnerComponent(this.props.value)}
      </div>
    )
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.explode != this.props.explode ||
    nextProps.selected !== this.props.selected ||
    nextProps.partOfWordFound !== this.props.partOfWordFound ||
    nextProps.value !== this.props.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.lastLetterToBeFound && !this.props.gameOver) {
      this.props.onLastLetterOfLastWord();
    }
  }
}

Cell.propTypes = {
  onClick: PropTypes.func.isRequired,
  onCellExplosionFragment: PropTypes.func.isRequired,
  onLastLetterOfLastWord: PropTypes.func.isRequired
};