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
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import Paper from 'material-ui/lib/paper';

export default class AboutGameDialog extends Component {

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


    componentWillReceiveProps(nextProps) {
        this.setState({open: false});
    }


    render() {
        const actions = [
            <RaisedButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}/>
        ];
        const style = {
            margin: 20,
            display: 'inline-block',
            padding: '10px',
            fontSize: '12px'
        };
        const pStyle = {
            width: "100%",
            marginTop: '5px'
        };
        const inLineBlockStyle = {
            display: 'inline-block',
            paddingRight: '5px'
        };

        return (
            <ToolbarGroup float="right" lastChild={true}>
                <ToolbarSeparator />
                <FlatButton label="About" style={{color:'#333'}} onClick={this.handleOpen}/>
                <Dialog
                    title="Year One Site Words"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={{width:'40%', color:'#333'}}>
                    <div style={{marginBottom: '10px'}}>
                        <h2 style={inLineBlockStyle}>Created by:</h2>
                        <div style={inLineBlockStyle}>Paul Bevis</div>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <h2>Sound</h2>
                        <div> All sound clips obtained from SoundBible</div>
                        <div style={{fontSize:'12px', marginTop:'5px'}}>
                            <div>Creator: Mike Koenig, Applause: <span>http://soundbible.com/988-Applause.html</span></div>
                            <div>Creator: Mike Koenig, Magic Wand: <span>http://soundbible.com/474-Magic-Wand-Noise.html</span></div>
                            <div>Creator: Mike cognito, Buzzer: <span>http://soundbible.com/1501-Buzzer.html</span></div>
                        </div>
                    </div>
                    <h2 style={{marginTop:'30px'}}>Copyright 2015 Paul Bevis</h2>
                </Dialog>
            </ToolbarGroup>
        );
    }
}
