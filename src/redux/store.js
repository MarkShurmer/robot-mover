import { createStore , applyMiddleware } from 'redux';
import movementReducer from './reducers/movement-reducer';
import thunk from 'redux-thunk';

let store = createStore(movementReducer, applyMiddleware(thunk));

export default store;
