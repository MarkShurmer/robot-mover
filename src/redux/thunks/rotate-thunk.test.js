import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {EAST, NORTH, SOUTH, WEST} from "../headings";
import {ROTATE_FAILURE, ROTATE_SUCCESS} from "../actions/action-types";
import {LEFT, RIGHT} from "../directions";
import rotateRobot from './rotate-thunk';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Rotate thunk', () => {

    it('should give error when direction has not been supplied', () => {
        const store = mockStore({});

        store.dispatch(rotateRobot());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_FAILURE);
        expect(actions[0].error).toBe('Direction has not been specified');
    });

    it('should give error when no place has been made', () => {
        const store = mockStore({});

        store.dispatch(rotateRobot(LEFT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_FAILURE);
        expect(actions[0].error).toBe('Place has not been done');
    });

    it('should go from North to West when direction is left', () => {
        const store = mockStore( {currentPosition: {x: 0, y: 4, heading: NORTH}, isPlaced: true});

        store.dispatch(rotateRobot(LEFT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_SUCCESS);
        expect(actions[0].payload).toEqual({heading: WEST});
    });

    it('should go from North to East when direction is right', () => {
        const store = mockStore( {currentPosition: {x: 0, y: 4, heading: NORTH}, isPlaced: true});

        store.dispatch(rotateRobot(RIGHT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_SUCCESS);
        expect(actions[0].payload).toEqual({heading: EAST});
    });

    it('should go from East to South when direction is right', () => {
        const store = mockStore( {currentPosition: {x: 0, y: 4, heading: EAST}, isPlaced: true});

        store.dispatch(rotateRobot(RIGHT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_SUCCESS);
        expect(actions[0].payload).toEqual({heading: SOUTH});
    });

    it('should go from East to North when direction is left', () => {
        const store = mockStore( {currentPosition: {x: 0, y: 4, heading: EAST}, isPlaced: true});

        store.dispatch(rotateRobot(LEFT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_SUCCESS);
        expect(actions[0].payload).toEqual({heading: NORTH});
    });

    it('should go from South to East when direction is left', () => {
        const store = mockStore( {currentPosition: {x: 0, y: 4, heading: SOUTH}, isPlaced: true});

        store.dispatch(rotateRobot(LEFT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_SUCCESS);
        expect(actions[0].payload).toEqual({heading: EAST});
    });

    it('should go from South to West when direction is right', () => {
        const store = mockStore( {currentPosition: {x: 0, y: 4, heading: SOUTH}, isPlaced: true});

        store.dispatch(rotateRobot(RIGHT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_SUCCESS);
        expect(actions[0].payload).toEqual({heading: WEST});
    });

    it('should go from West to North when direction is right', () => {
        const store = mockStore( {currentPosition: {x: 0, y: 4, heading: WEST}, isPlaced: true});

        store.dispatch(rotateRobot(RIGHT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_SUCCESS);
        expect(actions[0].payload).toEqual({heading: NORTH});
    });

    it('should go from West to South when direction is left', () => {
        const store = mockStore( {currentPosition: {x: 0, y: 4, heading: WEST}, isPlaced: true});

        store.dispatch(rotateRobot(LEFT));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(ROTATE_SUCCESS);
        expect(actions[0].payload).toEqual({heading: SOUTH});
    });

});
