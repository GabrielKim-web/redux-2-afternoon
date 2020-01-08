import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import budgetReducer from './budgetReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
   //we are exporting the reducer function(s), which allows us to access these states globally
   budget: budgetReducer,
   user: userReducer
})

//it just works
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));