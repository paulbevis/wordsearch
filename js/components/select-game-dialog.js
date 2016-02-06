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
import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import GameSelector from './game-selector'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';

export default class SelectGameDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    buildRows(start, end) {
        var divs = [];
        let counter = start;
        while (counter <= end) {
            divs.push(<GameSelector key={'list'+counter} value={counter} onGameSelect={this.props.onGameSelect}/>);
            counter++;
        }
        return divs
    }

    componentWillReceiveProps(nextProps) {
        this.setState({open: false});
    }

    render() {

        return (
            <ToolbarGroup firstChild={true}>
                <RaisedButton label="Choose Word List" primary={true} onClick={this.handleOpen}/>
                <Dialog
                    title="Choose the word list you want to use!"
                    actions={[]}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={{width:'40%'}}>
                    <div className="section group">
                        {this.buildRows(1, 5)}
                    </div>
                    <div className="section group">
                        {this.buildRows(6, 10)}
                    </div>
                    <div className="section group">
                        {this.buildRows(11, 15)}
                    </div>
                    <div className="section group">
                        {this.buildRows(16, 20)}
                    </div>
                </Dialog>
            </ToolbarGroup>
        );
    }
}
