import {PLACE, PLACE_FAILURE, PLACE_SUCCESS} from "./action-types";

const placeActionCreator = (x, y, heading) => {
    return {type: PLACE, payload: {x, y, heading}}
};

const placeActionSuccessCreator = (x, y, heading) => {
    return {type: PLACE_SUCCESS, payload: {x, y, heading}}
};

const placeActionFailureCreator = (error) => {
    return {type: PLACE_FAILURE, error}
};


export {placeActionCreator, placeActionSuccessCreator, placeActionFailureCreator};