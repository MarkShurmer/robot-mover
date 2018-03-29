import placeRobot from "./place-thunk";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {PLACE_FAILURE, PLACE_SUCCESS} from "../actions/action-types";
import {NORTH, SOUTH} from "../headings";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Place thunk', () => {

    it('should deal with no parameters by dispatching failure', () => {
        const store = mockStore({});

        store.dispatch(placeRobot());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_FAILURE);
        expect(actions[0].error).toBe('x or y or heading not specified');
    });

    it('should deal with missing y parameter by dispatching failure', () => {
        const store = mockStore({});

        store.dispatch(placeRobot(1));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_FAILURE);
        expect(actions[0].error).toBe('x or y or heading not specified');
    });

    it('should deal with missing heading parameter by dispatching failure', () => {
        const store = mockStore({});

        store.dispatch(placeRobot(1, 1));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_FAILURE);
        expect(actions[0].error).toBe('x or y or heading not specified');
    });

    it('should deal with x parameter being -1 by dispatching failure', () => {
        const store = mockStore({});

        store.dispatch(placeRobot(-1, 1, NORTH));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_FAILURE);
        expect(actions[0].error).toBe('x position incorrect');
    });

    it('should deal with x parameter being too big by dispatching failure', () => {
        const store = mockStore({});

        store.dispatch(placeRobot(5, 1, NORTH));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_FAILURE);
        expect(actions[0].error).toBe('x position incorrect');
    });

    it('should deal with y parameter being -1 by dispatching failure', () => {
        const store = mockStore({});

        store.dispatch(placeRobot(0, -1, NORTH));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_FAILURE);
        expect(actions[0].error).toBe('y position incorrect');
    });

    it('should deal with y parameter being too big by dispatching failure', () => {
        const store = mockStore({});

        store.dispatch(placeRobot(0, 5, NORTH));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_FAILURE);
        expect(actions[0].error).toBe('y position incorrect');
    });

    it('should deal with heading parameter being rubbish by dispatching failure', () => {
        const store = mockStore({});

        store.dispatch(placeRobot(0, 1, 'SSW'));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_FAILURE);
        expect(actions[0].error).toBe('heading incorrect');
    });

    it('should send place success when all params correct', () => {
        const store = mockStore({});

        store.dispatch(placeRobot(0, 1, SOUTH));

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(PLACE_SUCCESS);
        expect(actions[0].payload).toEqual({x: 0, y: 1, heading: SOUTH});
    });

});
