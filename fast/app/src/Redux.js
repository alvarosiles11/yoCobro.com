import React from 'react';
import Reducer from './Reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

export const store = createStore(
    Reducer,
    {},
    applyMiddleware(reduxThunk),
);
const Redux = (props) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}
export default Redux;