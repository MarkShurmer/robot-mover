import React, {Component} from 'react';
import './robot-board.css';
import robotnorth from '../../assets/robot-north.jpg';
import robotsouth from '../../assets/robot-south.jpg';
import roboteast from '../../assets/robot-east.jpg';
import robotwest from '../../assets/robot-west.jpg';
import {allHeadings} from "../../redux/headings";

const robotsByDirection = [robotnorth, roboteast, robotsouth, robotwest];

class RobotBoard extends Component {

    getRobot = (x, y) => {
        const {currentPosition} = this.props;

        if (currentPosition !== undefined) {
            const robotIndex = allHeadings.findIndex(hdg => hdg === currentPosition.heading);

            return currentPosition.x === x && currentPosition.y === y
                ? <img src={robotsByDirection[robotIndex]} alt="[robot]" className="image"/> : '';
        }

        return '';
    };

    render() {

        return (
            <div className="robot-board">
                <h2>Robot board</h2>
                {[...Array(5)].map((i, y) =>
                    <div className="row" key={y}>
                        {[...Array(5)].map((j, x) =>
                            <div className="column" key={x}>
                                <div className="square">
                                    {this.getRobot(x, 4 - y)}
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        );
    }
}

export default RobotBoard;
