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

export default class PlaySound extends Component {

  constructor(props){
    super(props)

  }
  render() {
    return (
      <div>
        <audio src="audio/success.m4a" preload="auto" ref={(ref) => this.success = ref}/>
        <audio src="audio/warning.m4a" preload="auto" ref={(ref) => this.warning = ref}/>
        <audio src="audio/applause.m4a" preload="auto" ref={(ref) => this.congratulations = ref}/>
      </div>
    )
  }


  componentDidUpdate(prevProps, prevState) {
    // will only contain data after didMount is called!
    if (this.props.sound.play) {
      switch (this.props.sound.type) {
        case'success':
          this.success.play();
          break;
        case 'warning':
          this.warning.play();
          break;
        case 'congratulations':
          this.congratulations.play();
          break;
      }
    }
  }

  componentDidMount() {
    this.congratulations.onended = (e) => {
      let nextGameNumber = 1;
      if (this.props.game !== 20) {
        nextGameNumber = this.props.game + 1;
      }
      this.props.nextGame(nextGameNumber)
    }
  }

}