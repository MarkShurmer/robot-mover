import {MOVE, PLACE, REPORT, ROTATE} from "../actions/action-types";
import {commandActionFailureCreator, commandActionSuccessCreator} from "../actions/command-action-creator";
import placeRobot from "./place-thunk";
import moveRobot from "./move-thunk";
import rotateRobot from "./rotate-thunk";
import reportActionCreator from "../actions/report-action-creator";

const validCommands = [PLACE, MOVE, ROTATE, REPORT];
const commandExecutions = [
    (x, y, heading) => placeRobot(x, y, heading),
    () => moveRobot(),
    (direction) => rotateRobot(direction),
    () => reportActionCreator()
];

const executeCommand = (command) => {

    return (dispatch, getState) => {
        const state = getState();

        if (command === undefined || command.length === 0) {
            return dispatch(commandActionFailureCreator(`Command was empty`));
        }

        const commandList = command.split(' '); // for commands with params
        const cmdIndex = validCommands.findIndex(cmd => cmd === commandList[0].toUpperCase());

        if (cmdIndex === -1) {
            return dispatch(commandActionFailureCreator(`Command ${command} not recognised`));
        }

        if(cmdIndex > 0 && !state.isPlaced) {
            return dispatch(commandActionFailureCreator(`Place hasn't been done`));
        }

        dispatch(commandActionSuccessCreator());

        // call the right function to invoke the right command
        dispatch(commandExecutions[cmdIndex].apply(null, commandList.slice(1)));
    }
};

export default executeCommand;
