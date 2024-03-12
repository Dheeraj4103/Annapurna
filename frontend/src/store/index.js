import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import productsReducer from './Products';
import userReducer from './User';
import cartReducer from './cart';

const reducer = combineReducers({
    productList: productsReducer,
    userReducer: userReducer,
    cart: cartReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;