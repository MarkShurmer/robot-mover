import {MOVE, MOVE_FAILURE, MOVE_SUCCESS} from "./action-types";

const moveActionCreator = () => {
    return {type: MOVE};
};

const moveActionCreatorSuccess = (x, y) => {
    return {type: MOVE_SUCCESS, payload: {x, y}};
};

const moveActionCreatorFailure = (error) => {
    return {type: MOVE_FAILURE, error};
};

export {moveActionCreator, moveActionCreatorSuccess, moveActionCreatorFailure};
