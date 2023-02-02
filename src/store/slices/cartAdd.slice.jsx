import { createSlice } from '@reduxjs/toolkit';
import axios, { Axios } from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartAddSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload
            return cart
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/`, getConfig())
        .then((res) => dispatch(setCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const getAddToCarthunk = (cart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/`,cart,getConfig())
        .then((res) => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const getPurchasesCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases/`,{},getConfig())
        .then((res) => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}
export const deleteProductCartThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`,getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setCart } = cartAddSlice.actions;

export default cartAddSlice.reducer;