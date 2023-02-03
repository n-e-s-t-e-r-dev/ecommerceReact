import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProductCartThunk, getCartThunk, getPurchasesCartThunk, updateProductThank } from '../store/slices/cartAdd.slice';


const CarSliderBar = ({ show, handleClose }) => {
    const cart = useSelector(state => state.cart)
    let Total = 0

    cart.forEach(product => {
        const TotalProduct = Number(product.product.price) * product.quantity
        Total += TotalProduct
    })


    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getCartThunk())
    }, [])
    const checkOut = () => {
        alert("se intento comprar")
        axios.post(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases/`)
            .then(res => {
                dispatch(getCartThunk())
                dispatch(getPurchasesCartThunk())
            })
    }
    const incrementQuantity = (product) => {
        dispatch(updateProductThank(product.id, product.quantity + 1));
    };

    const decrementQuantity = (product) => {
        dispatch(updateProductThank(product.id, product.quantity - 1));
    };

    return (
        <div>
            <Offcanvas placement='end' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className='scroll'>
                        {cart.map((product) => (
                            <li key={product.id} className='cart-product-add'>
                                <div className='container-cart-description'>
                                    <div className='container-img-cart'>

                                        <img src={product.product.images[0].url} alt="" />
                                    </div>
                                    <div className='container-cart-title'>
                                        <h3>{product.product.title}</h3>
                                        <button onClick={() => decrementQuantity(product)} disabled={product.quantity === 1}><i className='bx bx-minus'></i></button> {product.quantity} <button onClick={() => incrementQuantity(product)}><i className='bx bx-plus'></i></button>

                                    </div>
                                    <div className='container-cart-trash'>
                                        <button onClick={() => dispatch(deleteProductCartThunk(product.id))}><i class='bx bxs-trash'></i></button>

                                    </div>

                                </div>
                                <div className='container-total-list'>
                                </div>
                            </li>

                        ))}
                    </ul>
                    <h3 className='h3-total' style={{fontSize: 14, fontFamily: 'sans-serif'}}>Total {Total}</h3>
                    <div className='container-buttom-cart-add'>

                        <button onClick={() => dispatch(getPurchasesCartThunk())}>Comprar</button>
                    </div>

                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default CarSliderBar;