import {placeActionFailureCreator, placeActionSuccessCreator} from "../actions/place-action-creator";
import {allHeadings} from "../headings";


const placeRobot = (x, y, heading) => {

    return (dispatch) => {
        if (x === null || x === undefined || y === null || y === undefined || heading === null || heading === undefined) {
            return dispatch(placeActionFailureCreator('x or y or heading not specified'));
        }

        if(x < 0 || x > 4) {
            return dispatch(placeActionFailureCreator('x position incorrect'));
        }

        if(y < 0 || y > 4) {
            return dispatch(placeActionFailureCreator('y position incorrect'));
        }

        const foundHeadings = allHeadings.filter(h => h.toUpperCase() === heading.toUpperCase());
        if(foundHeadings.length === 0) {
            return dispatch(placeActionFailureCreator('heading incorrect'));
        }

        return dispatch(placeActionSuccessCreator(+x, +y, foundHeadings[0]));
    }
};

export default placeRobot;
