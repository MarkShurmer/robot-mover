import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
    EXEC_COMMAND_FAILURE, EXEC_COMMAND_SUCCESS, MOVE_SUCCESS, REPORT, REPORT_SUCCESS,
    ROTATE_SUCCESS
} from "../actions/action-types";
import {EAST, SOUTH, WEST} from "../headings";
import executeCommand from "./command-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Command thunk', () => {

    it('should send failure when no command passed', () => {
        const store = mockStore({});

        store.dispatch(executeCommand());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(EXEC_COMMAND_FAILURE);
        expect(actions[0].error).toBe('Command was empty');
    });

    it('should send failure when command is invalid', () => {
        const store = mockStore({});

        store.dispatch(executeCommand('hhhhh'));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(EXEC_COMMAND_FAILURE);
        expect(actions[0].error).toBe('Command hhhhh not recognised');
    });

    it('should send failure when place not done', () => {
        const store = mockStore({currentPosition: {x: 4, y: 0, heading: EAST}, isPlaced: false});

        store.dispatch(executeCommand('MOVE'));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(EXEC_COMMAND_FAILURE);
        expect(actions[0].error).toBe('Place hasn\'t been done');
    });

    it('should send success when placed on rotate', () => {
        const store = mockStore({currentPosition: {x: 4, y: 0, heading: WEST}, isPlaced: true});

        store.dispatch(executeCommand('ROTATE left'));

        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(EXEC_COMMAND_SUCCESS);
        expect(actions[1].type).toBe(ROTATE_SUCCESS);
        expect(actions[1].payload).toEqual({heading: SOUTH});
    });

    it('should send success when placed on move', () => {
        const store = mockStore({currentPosition: {x: 4, y: 0, heading: WEST}, isPlaced: true});

        store.dispatch(executeCommand('MOVE'));

        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(EXEC_COMMAND_SUCCESS);
        expect(actions[1].type).toBe(MOVE_SUCCESS);
        expect(actions[1].payload).toEqual( {"x": 3, "y": 0});
    });

    it('should send success when placed on report', () => {
        const store = mockStore({currentPosition: {x: 4, y: 0, heading: WEST}, isPlaced: true});

        store.dispatch(executeCommand('REPORT'));

        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(EXEC_COMMAND_SUCCESS);
        expect(actions[1].type).toBe(REPORT);
    });

});
