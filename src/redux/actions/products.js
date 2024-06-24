import axios from 'axios';
import {
    PRODUCT_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS
} from '../constants/products';
import { baseUrl } from '../../api/baseUrl';

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REQUEST });

        const { data } = await axios.get(`${baseUrl}/products`)

        dispatch({ type: PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_FAIL, payload: error });
    }
};

export const getProductDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });

        const { data } = await axios.get(`${baseUrl}/products/${id}`)

        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error });
    }
};
