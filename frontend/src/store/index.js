import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import productsReducer from './Products';
import userReducer from './User';

const reducer = combineReducers({
    productList: productsReducer,
    userReducer: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;