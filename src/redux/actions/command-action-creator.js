import {EXEC_COMMAND, EXEC_COMMAND_FAILURE, EXEC_COMMAND_SUCCESS} from "./action-types";

const commandActionCreator = (command) => {
    return { type: EXEC_COMMAND, payload: command};
};

const commandActionSuccessCreator = () => {
    return { type: EXEC_COMMAND_SUCCESS};
};

const commandActionFailureCreator = (error) => {
    return { type: EXEC_COMMAND_FAILURE, error};
};

export { commandActionCreator, commandActionSuccessCreator, commandActionFailureCreator};
