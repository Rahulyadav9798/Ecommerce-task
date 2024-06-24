import {
    CLEAR_ERRORS,
    PRODUCT_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS
} from '../constants/products';

const initialState = {
    products: [],
    productDetail: [],
    loading: false,
    error: null,
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null,
            };
        case PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                productDetail: action.payload,
                loading: false,
                error: null,
            };
        case PRODUCT_FAIL:
        case PRODUCT_DETAIL_FAIL:
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
