import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { set } from 'react-hook-form';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'Products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            const product = action.payload
            return product

        }
    }
})

export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true))
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products`)
        .then((res) => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const productFilterCategory = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then((res) => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const productFilterTitleThunk = (searchName) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${searchName}`)
        .then((res) => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
