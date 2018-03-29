import {
    EXEC_COMMAND_FAILURE, EXEC_COMMAND_SUCCESS,
    MOVE, MOVE_FAILURE, MOVE_SUCCESS, PLACE, PLACE_FAILURE, PLACE_SUCCESS, REPORT, ROTATE_FAILURE,
    ROTATE_SUCCESS
} from "../actions/action-types";

const initialState = {isPlaced: false};

const movementReducer = (state = initialState, action) => {
    switch (action.type) {

        case PLACE:
            return {...state, isPlaced: false, currentPosition: {}};
        case PLACE_SUCCESS:
            return {...state, isPlaced: true, currentPosition: action.payload, error: undefined};
        case PLACE_FAILURE:
            return {...state, error: action.error};

        // move actions
        case MOVE:
            return {...state};
        case MOVE_SUCCESS:
            return {
                ...state,
                currentPosition: {...state.currentPosition, x: action.payload.x, y: action.payload.y},
                error: undefined
            };
        case MOVE_FAILURE:
            return {...state, error: action.error};

        // rotate actions
        case ROTATE_SUCCESS:
            return {
                ...state,
                currentPosition: {...state.currentPosition, heading: action.payload.heading},
                error: undefined
            };
        case ROTATE_FAILURE:
            return {...state, error: action.error};

        case REPORT:
            return {...state, lastReport: {...state.currentPosition}};

        case EXEC_COMMAND_SUCCESS:
            return {...state, error: undefined};

        case EXEC_COMMAND_FAILURE:
            return {...state, error: action.error};


        default:
            return state;
    }
};

export default movementReducer;
