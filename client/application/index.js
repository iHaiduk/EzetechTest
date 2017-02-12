/**
 * Created by igor on 10.02.17.
 */

import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import Main from './components/index';
import store from './store';

// Needed for onTouchTap
injectTapEventPlugin();

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('app')
);
