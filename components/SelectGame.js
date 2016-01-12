import React, { Component, PropTypes } from 'react'

export default class SelectGame extends Component {
    render() {
        return (
                <select onChange = {(e) => this.handleSelectChange(e)}>
                    <option value=""></option>
                    <option value="wordSet1">List 1</option>
                    <option value="wordSet2">List 2</option>
                    <option value="wordSet3">List 3</option>
                    <option value="wordSet4">List 4</option>
                    <option value="wordSet5">List 5</option>
                    <option value="wordSet6">List 6</option>
                    <option value="wordSet7">List 7</option>
                    <option value="wordSet8">List 8</option>
                    <option value="wordSet9">List 9</option>
                    <option value="wordSet10">List 10</option>
                    <option value="wordSet11">List 11</option>
                    <option value="wordSet12">List 12</option>
                    <option value="wordSet13">List 13</option>
                    <option value="wordSet14">List 14</option>
                    <option value="wordSet15">List 15</option>
                    <option value="wordSet16">List 16</option>
                    <option value="wordSet17">List 17</option>
                    <option value="wordSet18">List 18</option>
                    <option value="wordSet19">List 19</option>
                    <option value="wordSet20">List 20</option>
                </select>
        )
    }

    handleSelectChange(e) {
        this.props.onGameSelect(e.target.value)
    }

}
SelectGame.propTypes = {
    onGameSelect: PropTypes.func.isRequired
};