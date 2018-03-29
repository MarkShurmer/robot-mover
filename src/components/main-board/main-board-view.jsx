import React, {Component} from 'react';
import './main-board.css';
import RobotBoard from '../robot-board/robot-board-container';
import classNames from 'classnames';
import ReportCard from "../report-card/report-card";


class MainBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    changeCommand = (text) => {
        this.setState({command: text});
    };

    executeCommand = (event) => {
        event.preventDefault();
        this.props.execCommand(this.state.command);
    };

    render() {
        const errorClass = classNames('error',
            { show: this.props.error !== undefined && this.props.error.length > 0, hide: !this.props.error});

        return (
            <div className="main-board">
                <div className="board">
                    <RobotBoard/>
                </div>

                <div className="info-area">
                    <h2>Command area</h2>
                    <form onSubmit={this.executeCommand} noValidate={true}>
                        <label className="item">Enter command</label>
                        <div className="command item">
                            <input onChange={(e) => this.changeCommand(e.target.value)}/>

                            <div className={errorClass}>{this.props.error}</div>
                        </div>
                        <button className="item" type="submit">Go</button>
                        <div className="item">Last report</div>
                        <ReportCard reportCard={this.props.reportCard}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default MainBoard;
