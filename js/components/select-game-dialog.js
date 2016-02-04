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
                    contentStyle={{width:'60%'}}>
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

//    render() {
//        return (
//            <div>
//                <select onChange = {(e) => this.handleSelectChange(e)}>
//                    <option value=""/>
//                    <option value="wordSet1">List 1</option>
//                    <option value="wordSet2">List 2</option>
//                    <option value="wordSet3">List 3</option>
//                    <option value="wordSet4">List 4</option>
//                    <option value="wordSet5">List 5</option>
//                    <option value="wordSet6">List 6</option>
//                    <option value="wordSet7">List 7</option>
//                    <option value="wordSet8">List 8</option>
//                    <option value="wordSet9">List 9</option>
//                    <option value="wordSet10">List 10</option>
//                    <option value="wordSet11">List 11</option>
//                    <option value="wordSet12">List 12</option>
//                    <option value="wordSet13">List 13</option>
//                    <option value="wordSet14">List 14</option>
//                    <option value="wordSet15">List 15</option>
//                    <option value="wordSet16">List 16</option>
//                    <option value="wordSet17">List 17</option>
//                    <option value="wordSet18">List 18</option>
//                    <option value="wordSet19">List 19</option>
//                    <option value="wordSet20">List 20</option>
//                </select>
//                </div>
//        )
//    }
//
//    handleSelectChange(e) {
//        this.props.onGameSelect(e.target.value)
//    }
//
//}
//SelectGame.propTypes = {
//    onGameSelect: PropTypes.func.isRequired
//};