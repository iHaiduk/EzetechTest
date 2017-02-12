/**
 * Created by igor on 11.02.17.
 */
import {applyMiddleware, createStore} from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "./reducers";

const middleware = applyMiddleware(promise(), thunk, __DEV__ ? logger() : null);

export default createStore(reducer, middleware);
