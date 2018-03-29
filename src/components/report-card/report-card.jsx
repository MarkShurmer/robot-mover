import React, {Component} from 'react';
import './report-card.css';


class ReportCard extends Component {

    render() {

        const {reportCard} = this.props;

        return (
            <div className="report-card">
                {reportCard ?
                    <div>
                        <div className="row">
                            <span className="column">X</span>
                            <span className="column">{reportCard.x}</span>
                        </div>
                        <div className="row">
                            <span className="column">Y</span>
                            <span className="column">{reportCard.y}</span>
                        </div>
                        <div className="row">
                            <span className="column">Heading</span>
                            <span className="column">{reportCard.heading}</span>
                        </div>
                    </div>
                    : <span>No report</span>
                }
            </div>
        );
    }
}

export default ReportCard;
