import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productFilterCategory } from '../store/slices/products.slice';

const ProductsId = () => {

    const { id } = useParams()
    const [product, setProduct] = useState({});

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productsCategories = useSelector(state => state.products)
    const relateNews = productsCategories.filter(newsItem => newsItem.id === productsCategories.id && newsItem.id !== productsCategories)

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProduct(res.data)
                console.log(res.data)
                dispatch(productFilterCategory(res.data.categoryId
                ))
            })
    }, [id])

    const [counter, setCounter] = useState(1)

    const decrement = () => {
        setCounter(counter - 1)
    }
    const increment = () => {
        setCounter(counter + 1)
    }

    console.log(product)

    return (
        <div>

            <Row>
                <div className='container-superior'>
                    <Col className='container-image' lg={7}>
                        <img className='product-id-img' src={product.images?.[0].url} alt="samsung" />

                    </Col>
                    <Col className='container-data' lg={5}>
                        <h3> {product.brand}</h3>
                        <h3>{product.title}</h3>

                        <div className='container-quantity'>
                            <section>
                                price
                                <h3>$ {product.price}</h3>
                            </section>
                            <section>
                                Quantity
                                <div><button onClick={decrement} disabled={counter === 1}>-</button>{counter} <button onClick={increment}>+</button></div>
                            </section>

                        </div>
                        <button className='addToCar'>Add Cart <i class='bx bx-cart-add'></i></button>
                        <h3 className='container-descripcion'> description: {product.description}</h3>
                    </Col>
                </div>
                <div className='container-flex'>
                    {productsCategories.map((category) => (
                        <ListGroup as="ol" numbered key={category.id}
                            onClick={() => navigate(`/products/${category.id}`)}>
                            <div className='similar-content'>
                                <div className='container-image-similar'>
                                    <ListGroup.Item as="li"><img className='img-fluid' src={category.images[0].url} alt="product" /></ListGroup.Item>
                                </div>
                                <div>
                                    <ListGroup.Item as="li">{category.brand}</ListGroup.Item>
                                    <ListGroup.Item as="li">{category.title}</ListGroup.Item>
                                    <div className='container-car-prices'>
                                        <div>
                                             
                                            <ListGroup.Item as="li"> Price {category.price}</ListGroup.Item>
                                        </div>
                                        <div className='car-container-similar'>
                                            <i class='bx bx-cart-add'></i>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </ListGroup>
                    ))}
                </div>

            </Row>
        </div>
    );
};

export default ProductsId;