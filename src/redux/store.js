import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import movementReducer from './reducers/movement-reducer';

let store = createStore(movementReducer, devToolsEnhancer());

store.subscribe(() =>
    console.log(store.getState())
);

export default store;