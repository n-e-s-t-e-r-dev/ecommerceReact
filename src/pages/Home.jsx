import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Dropdown, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Price from '../components/Price';
import { getProductsThunk, productFilterCategory, productFilterTitleThunk } from '../store/slices/products.slice';

const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products)

    const [categories, setCategories] = useState([]);
    const [searchName, setSearchName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories`)
            .then((res) => setCategories(res.data))
    }, [])

    console.log()

    return (
        <div>

            <h1> home</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => dispatch(productFilterTitleThunk(searchName))}>
                    Button
                </Button>
            </InputGroup>
            <Row>
                <Col lg={3}>
                    <ListGroup>
                        <ListGroup>
                            <Price />
                        </ListGroup>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Categories</Accordion.Header>
                                <Accordion.Body>
                                    {categories.map((category) => (
                                        <Dropdown.Item
                                            key={category.id}
                                            onClick={() => dispatch(productFilterCategory(category.id))}>{category.name}</Dropdown.Item>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </ListGroup>

                </Col>
                <Col lg={9}>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {products.map((product) => (
                            <Col key={product.id}>
                                <Card key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                                    <Card.Img className="g-3"
                                        variant="top"
                                        style={{ height: 200, objectFit: "contain", paddingTop: "1rem" }}
                                        src={product.images?.[0].url} alt="producto" />

                                    <Card.Body className='card-body'>
                                        <Card.Title>{product.title}</Card.Title>
                                        <div className='container-car-price'>
                                            <div>
                                                <Card.Text>
                                                    Price: $ {product.price}
                                                </Card.Text>
                                            </div>
                                            <div className='car-container'>
                                                <i class='bx bx-cart-add'></i>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col >
            </Row>


        </div>
    );
};

export default Home;