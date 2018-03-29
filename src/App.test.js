import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";

it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = {
        getState: () => {
            return {currentPosition: {}, isPlaced: false};
        },
        subscribe: jest.fn()
    };

    ReactDOM.render(<Provider store={store}>
        <App/>
    </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
