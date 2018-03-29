import {connect} from 'react-redux';
import MainBoard from "./main-board-view";
import executeCommand from "../../redux/thunks/command-thunk";


const mapStateToProps = state => {
    return {
        currentPosition: state.currentPosition,
        isPlaced: state.isPlaced,
        reportCard: state.lastReport,
        error: state.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        execCommand: (commandText) => dispatch(executeCommand(commandText))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainBoard)
