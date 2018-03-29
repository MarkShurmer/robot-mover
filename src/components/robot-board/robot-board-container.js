import {connect} from 'react-redux';
import RobotBoard from './robot-board-view';


const mapStateToProps = state => {
    return {
        currentPosition: state.currentPosition
    }
};


export default connect(mapStateToProps)(RobotBoard);
