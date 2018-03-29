import movementReducer from "./movement-reducer";
import {
    placeActionCreator, placeActionFailureCreator,
    placeActionSuccessCreator
} from "../actions/place-action-creator";
import {NORTH, SOUTH, WEST} from "../headings";
import moveRobot from "../thunks/move-thunk";
import {moveActionCreator, moveActionCreatorFailure, moveActionCreatorSuccess} from "../actions/move-action-creator";
import {rotateActionFailureCreator, rotateActionSuccessCreator} from "../actions/rotate-action-creator";
import {LEFT} from "../directions";
import executeCommand from "../thunks/command-thunk";
import {
    commandActionCreator, commandActionFailureCreator,
    commandActionSuccessCreator
} from "../actions/command-action-creator";
import reportActionCreator from "../actions/report-action-creator";

describe('Movement reducer', () => {

    it('should give back state when action is not known', () => {
        const newState = movementReducer({mine: 'hello'}, {type: 'ADD_RUBBISH'});
        expect(newState).toEqual({mine: 'hello'});
    });

    describe('placement', () => {
        it('should change state to indicate placement is happening', () => {
            const newState = movementReducer({}, placeActionCreator(2, 3, WEST));
            expect(newState).toEqual({isPlaced: false, currentPosition: {}});
        });

        it('should change state to indicate placement is happening and current position is splatted', () => {
            const newState = movementReducer({
                currentPosition: {
                    x: 3,
                    y: 3,
                    heading: NORTH
                }
            }, placeActionCreator(2, 3, WEST));

            expect(newState).toEqual({isPlaced: false, currentPosition: {}});
        });

        it('should change state current position with success action', () => {
            const newState = movementReducer({}, placeActionSuccessCreator(2, 3, WEST));

            expect(newState).toEqual({currentPosition: {x: 2, y: 3, heading: WEST}, isPlaced: true});
        });

        it('should change state error with failure action', () => {
            const newState = movementReducer({}, placeActionFailureCreator('incorrect parameters'));

            expect(newState).toEqual({error: 'incorrect parameters'});
        });

        it('should change state error with failure action', () => {
            const newState = movementReducer({currentPosition: {}, isPlaced: false},
                placeActionFailureCreator('incorrect parameters'));

            expect(newState).toEqual({error: 'incorrect parameters', isPlaced: false, currentPosition: {}});
        });
    });

    describe('move', () => {
        it('should change state to indicate movement is happening', () => {
            const newState = movementReducer({}, moveActionCreator());
            expect(newState).toEqual({});
        });

        it('should change state current position with success action', () => {
            const newState = movementReducer({currentPosition: {x: 1, y: 1, heading: WEST}},
                moveActionCreatorSuccess(2, 1));

            expect(newState).toEqual({currentPosition: {x: 2, y: 1, heading: WEST}});
        });

        it('should change state error with failure action', () => {
            const newState = movementReducer({}, moveActionCreatorFailure('incorrect parameters'));

            expect(newState).toEqual({error: 'incorrect parameters'});
        });

        it('should change state error with failure action', () => {
            const newState = movementReducer({currentPosition: {}, isPlaced: false},
                moveActionCreatorFailure('incorrect parameters'));

            expect(newState).toEqual({error: 'incorrect parameters', isPlaced: false, currentPosition: {}});
        });
    });

    describe('rotate', () => {
        it('should change state current heading with success action', () => {
            const newState = movementReducer({currentPosition: {x: 1, y: 1, heading: WEST}},
                rotateActionSuccessCreator(SOUTH));

            expect(newState).toEqual({currentPosition: {x: 1, y: 1, heading: SOUTH}});
        });

        it('should change state error with failure action', () => {
            const newState = movementReducer({}, rotateActionFailureCreator('incorrect parameters'));

            expect(newState).toEqual({error: 'incorrect parameters'});
        });

        it('should change state with values error with failure action', () => {
            const newState = movementReducer({currentPosition: {}, isPlaced: false},
                placeActionFailureCreator('incorrect parameters'));

            expect(newState).toEqual({error: 'incorrect parameters', isPlaced: false, currentPosition: {}});
        });
    });

    describe('command', () => {
        it('should change state current heading with success action', () => {
            const newState = movementReducer({currentPosition: {x: 1, y: 1, heading: WEST}},
                commandActionSuccessCreator('MOVE'));

            expect(newState).toEqual({"currentPosition": {"heading": "West", "x": 1, "y": 1}, "error": undefined});
        });

        it('should change state error with failure action', () => {
            const newState = movementReducer({}, commandActionFailureCreator('incorrect command'));

            expect(newState).toEqual({error: 'incorrect command'});
        });

        it('should change state with values error with failure action', () => {
            const newState = movementReducer({currentPosition: {}, isPlaced: false},
                placeActionFailureCreator('incorrect parameters'));

            expect(newState).toEqual({error: 'incorrect parameters', isPlaced: false, currentPosition: {}});
        });
    });

    describe('report', () => {
        it('should change state current last report with success action', () => {
            const newState = movementReducer({currentPosition: {x: 1, y: 1, heading: WEST}},
                reportActionCreator());

            expect(newState).toEqual({
                "currentPosition": {"heading": "West", "x": 1, "y": 1}, "error": undefined,
                lastReport: {"heading": "West", "x": 1, "y": 1}
            });
        });
    });
});
