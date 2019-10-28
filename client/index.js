import React from 'react';
import ReactDom from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store';

import App from './layout/App';

const store = createStore(rootReducer);

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('root'));