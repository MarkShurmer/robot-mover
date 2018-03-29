import {allHeadings} from "../headings";
import {rotateActionFailureCreator, rotateActionSuccessCreator} from "../actions/rotate-action-creator";
import {allDirections, LEFT} from "../directions";

const calculateMovement = (heading, direction) => {
    const directionFactor = direction.toUpperCase() === LEFT.toUpperCase() ? -1 : 1;
    let newHeading = (allHeadings.indexOf(heading) + directionFactor) % 4;
    newHeading = newHeading === -1 ? 3 : newHeading;

    return allHeadings[newHeading];
};

const rotateRobot = (direction) => {

    return (dispatch, getState) => {
        const state = getState();

        if (direction === undefined || direction === null) {
            return dispatch(rotateActionFailureCreator('Direction has not been specified'));
        }

        if (!state.isPlaced) {
            return dispatch(rotateActionFailureCreator('Place has not been done'));
        }

        // try to get direction
        const foundDirections = allDirections.filter(dir => dir.toUpperCase() === direction.toUpperCase());

        if (foundDirections.length === 0) {
            return dispatch(rotateActionFailureCreator('Direction is invalid'));
        }

        // calculate what the movement will be
        const newHeading = calculateMovement(state.currentPosition.heading, direction);

        return dispatch(rotateActionSuccessCreator(newHeading));
    }
};

export default rotateRobot;
