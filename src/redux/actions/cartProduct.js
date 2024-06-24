import axios from 'axios';
import {
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
import { baseUrl } from '../../api/baseUrl';
import { successMessage } from '../../components/ToastMessage';

export const getCartProducts = (userId) => async (dispatch) => {
    try {
        dispatch({ type: CART_PRODUCT_REQUEST });

        const { data } = await axios.get(`${baseUrl}/carts/user/${userId}`)

        let finalData = data[0]

        dispatch({ type: CART_PRODUCT_SUCCESS, payload: finalData });
    } catch (error) {
        dispatch({ type: CART_PRODUCT_FAIL, payload: error });
    }
};
export const addCartProduct = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADD_CART_PRODUCT_REQUEST });

        const { data } = await axios.post(`${baseUrl}/carts`, { params })

        dispatch({ type: ADD_CART_PRODUCT_SUCCESS, payload: data });
        successMessage('Added Successfully')
    } catch (error) {
        dispatch({ type: ADD_CART_PRODUCT_FAIL, payload: error });
    }
};
export const deleteCartProduct = (params) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CART_PRODUCT_REQUEST });

        const { data } = await axios.delete(`${baseUrl}/carts/${params}`)

        dispatch({ type: DELETE_CART_PRODUCT_SUCCESS, payload: data });

        successMessage('Deleted Successfully')
    } catch (error) {
        dispatch({ type: DELETE_CART_PRODUCT_FAIL, payload: error });
    }
};