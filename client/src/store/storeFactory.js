/**
 * Created by bhuang on 11/26/17.
 */

import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers';

/*const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

let initState = {signupDisplay: 'none', loginDisplay: 'none', login: {success: false}, signup: {registering: false, success: false}};
let rootReducer = combineReducers({
    signupDisplay,
    loginDisplay,
    signup,
    login
})*/

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

/*
 * applyMiddleware takes a set of middleware functions and returns a function A that takes
 * a redux createstore function as its arg and A returns a function B which has the same
 * signature as redux createStore and returns an enhanced redux store
 *
 * function signature: applyMiddleware(...middlewares)
 * @param ...middlewares the array variable that stores all the middleware functions
 * @return createStore => {
 *      return (reducer, initialState, enhancer) => {
 *          // does sth ...
 *
 *          return {
 *              ...store,
 *              dispatch // store.dispatch(middlewareN(middlewareN-1(...(2(1(action))))))
 *          }
 *      }
 *  }
 *
 */
const storeFactory = () =>
    applyMiddleware(ReduxPromise)(createStore)(persistedReducer);

export default storeFactory
