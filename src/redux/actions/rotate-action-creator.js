import {ROTATE, ROTATE_FAILURE, ROTATE_SUCCESS} from "./action-types";

const rotateActionCreator = (direction) => {
    return { type: ROTATE, direction};
};

const rotateActionSuccessCreator = (heading) => {
    return { type: ROTATE_SUCCESS, payload: { heading }};
};

const rotateActionFailureCreator = (error) => {
    return { type: ROTATE_FAILURE, error};
};

export { rotateActionCreator, rotateActionSuccessCreator, rotateActionFailureCreator};
