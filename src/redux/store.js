import { applyMiddleware, compose, combineReducers, legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk'
import { productsReducer } from './reducers/products';
import { cartProductsReducer } from './reducers/cartProduct';
const middleware = [thunk];

const initialState = {};

const rootReducer = combineReducers({
    products: productsReducer,
    cartProducts: cartProductsReducer,
});

export const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
