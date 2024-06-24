import {
    CLEAR_ERRORS,
    CART_PRODUCT_FAIL,
    CART_PRODUCT_REQUEST,
    CART_PRODUCT_SUCCESS,
    ADD_CART_PRODUCT_FAIL,
    ADD_CART_PRODUCT_REQUEST,
    ADD_CART_PRODUCT_SUCCESS,
    DELETE_CART_PRODUCT_FAIL,
    DELETE_CART_PRODUCT_REQUEST,
    DELETE_CART_PRODUCT_SUCCESS
} from '../constants/cartProducts';

const initialState = {
    cartProducts: [],
    loading: false,
    error: null,
};

export const cartProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_PRODUCT_REQUEST:
        case ADD_CART_PRODUCT_REQUEST:
        case DELETE_CART_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CART_PRODUCT_SUCCESS:
            return {
                ...state,
                cartProducts: action.payload,
                loading: false,
                error: null,
            };
        case ADD_CART_PRODUCT_SUCCESS:
        case DELETE_CART_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case CART_PRODUCT_FAIL:
        case ADD_CART_PRODUCT_FAIL:
        case DELETE_CART_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};
