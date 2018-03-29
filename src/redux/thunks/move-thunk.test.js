import moveRobot from "./move-thunk";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {MOVE_FAILURE, MOVE_SUCCESS, PLACE_FAILURE, PLACE_SUCCESS} from "../actions/action-types";
import {EAST, NORTH, SOUTH, WEST} from "../headings";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Move thunk', () => {

    beforeEach(() => {

    })

    it('should send failure when place not done', () => {
        const store = mockStore({});

        store.dispatch(moveRobot());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(MOVE_FAILURE);
        expect(actions[0].error).toBe('Place has not been done');
    });

    it('should send failure when movement would go over edge', () => {
        const store = mockStore({ currentPosition: {x: 0, y: 4, heading: NORTH}, isPlaced: true});

        store.dispatch(moveRobot());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(MOVE_FAILURE);
        expect(actions[0].error).toBe('Move is going over the edge on y axis');
    });

    it('should send failure when movement would go over x edge', () => {
        const store = mockStore({ currentPosition: {x: 4, y: 0, heading: EAST}, isPlaced: true});

        store.dispatch(moveRobot());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(MOVE_FAILURE);
        expect(actions[0].error).toBe('Move is going over the edge on x axis');
    });

    it('should send success when movement would not go over x edge', () => {
        const store = mockStore({ currentPosition: {x: 4, y: 0, heading: WEST}, isPlaced: true});

        store.dispatch(moveRobot());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(MOVE_SUCCESS);
        expect(actions[0].payload).toEqual({x: 3, y: 0});
    });

    it('should send success when movement would not go over y edge', () => {
        const store = mockStore({ currentPosition: {x: 0, y: 4, heading: SOUTH}, isPlaced: true});

        store.dispatch(moveRobot());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(MOVE_SUCCESS);
        expect(actions[0].payload).toEqual({x: 0, y: 3});
    });

    it('should send success when place done', () => {
        const store = mockStore({ currentPosition: {x: 0, y: 0, heading: NORTH}, isPlaced: true});

        store.dispatch(moveRobot());

        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(MOVE_SUCCESS);
    });

});
