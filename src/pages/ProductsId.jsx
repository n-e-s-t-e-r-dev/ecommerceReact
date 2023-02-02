import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddToCarthunk } from '../store/slices/cartAdd.slice';
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

    const addToCar = () => {
        const cart = {
            "quantity": counter,
            "productId": product.id
        }
        dispatch(getAddToCarthunk(cart))
    }


    return (
        <div className='container-product'>
            <div className='buttom-home' onClick={() => navigate(`/`)}>

                <button className='buttom-home'> Home</button> <div className='container-punto'></div> <h3 className='container-title-padding-right'>{product.title}</h3>
            </div>

            <div className='container-superior'>

                <Col className='container-image' lg={6}>
                    <Carousel className='product-id-img' variant="dark">
                        <Carousel.Item className='item'>
                            <img  src={product.images?.[0].url} alt="img-product" />
                        </Carousel.Item>
                        <Carousel.Item className='item'>
                            <img  src={product.images?.[1].url} alt="img-product" />
                        </Carousel.Item>
                        <Carousel.Item className='item'>
                            <img  src={product.images?.[2].url} alt="img-product" />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col className='container-data' lg={6}>
                    <div className='container-absolute-title'>
                        <h3> {product.brand}</h3>
                        <h3>{product.title}</h3>
                    </div>

                    <div className='container-absolute'>
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
                        <Button onClick={addToCar} className='addToCar' style={{ color: "red" }} variant="primary" type="submit" >
                            add To Cart <i className='bx bx-cart-add'></i>
                        </Button>
                    </div>
                    <h3 className='container-descripcion'> description: {product.description}</h3>
                </Col>
            </div>
            <Row xs={1} md={2} lg={3} className="g-4">
                {productsCategories.map((category) => (
                    <Col key={category.id}>
                        <Card key={category.id} onClick={() => navigate(`/products/${category.id}`)}>
                            <Card.Img className="g-3"
                                variant="top"
                                style={{ height: 200, objectFit: "contain", paddingTop: "1rem" }}
                                src={category.images?.[0].url} alt="producto" />

                            <Card.Body className='card-body'>
                                <Card.Title Text='secondary' className='title-reducer'><h3>{category.brand}</h3></Card.Title>
                                <Card.Title className='title-reducer'><h3>{category.title}</h3> </Card.Title>
                                <div className='container-car-price'>
                                    <div>
                                        <Card.Text>
                                            Price: $ {category.price}
                                        </Card.Text>
                                    </div>
                                    <div className='car-container'>
                                        <i className='bx bx-cart-add'></i>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>


        </div>
    );
};

export default ProductsId;