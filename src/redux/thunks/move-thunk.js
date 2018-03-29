import {EAST, NORTH, SOUTH} from "../headings";
import {moveActionCreatorFailure, moveActionCreatorSuccess} from "../actions/move-action-creator";

const calculateMovement = (heading) => {
    let result = {x: 0, y: 0};

    switch (heading) {
        case NORTH:
            result.y = 1;
            break;
        case SOUTH:
            result.y = -1;
            break;
        case EAST:
            result.x = 1;
            break;
        default:
            result.x = -1;
    }

    return result;
};


const moveRobot = () => {

    return (dispatch, getState) => {
        const state = getState();

        if (!state.isPlaced) {
            return dispatch(moveActionCreatorFailure('Place has not been done'));
        }

        // calculate what the movement will be
        const movement = calculateMovement(state.currentPosition.heading);
        const newPosition = {x: state.currentPosition.x + movement.x, y: state.currentPosition.y + movement.y};

        if (newPosition.x > 4 || newPosition.x < 0) {
            return dispatch(moveActionCreatorFailure('Move is going over the edge on x axis'));
        }

        if (newPosition.y > 4 || newPosition.y < 0) {
            return dispatch(moveActionCreatorFailure('Move is going over the edge on y axis'));
        }

        if (state.currentPosition === undefined || state.currentPosition.heading === undefined) {
            return dispatch(moveActionCreatorFailure('Place has not been done'));
        }

        return dispatch(moveActionCreatorSuccess(newPosition.x, newPosition.y));
    }
};

export default moveRobot;
