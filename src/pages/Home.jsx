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

    return (
        <div className='container-home'>
            <InputGroup className="mb-3">
            </InputGroup>
            <Row >
                <Col lg={3}>
                    <ListGroup>
                        <ListGroup>

                        </ListGroup>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className='container-price-acordion-category'>Categories</Accordion.Header>
                                <Accordion.Body >
                                    {categories.map((category) => (
                                        <Dropdown.Item
                                            key={category.id}
                                            onClick={() => dispatch(productFilterCategory(category.id))}>{category.name}</Dropdown.Item>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </ListGroup>
                    <Price />
                </Col>
                <Col lg={9}>
                    <Form.Control
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)}
                    />
                    <Button style={{ color: "red" }} variant="outline-secondary" id="button-addon2" onClick={() => dispatch(productFilterTitleThunk(searchName))}>
                        Button
                    </Button>
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
                                                <i className='bx bx-cart-add'></i>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col >
            </Row>
            <div className='container-body'>
                <h3>© Carlos Muñoz</h3>
                <section className='container-social'>
                    <a href="https://www.instagram.com/nesterlon/"><i className='bx bxl-instagram'></i></a>
                    <a href="https://github.com/NesTerLoN392"><i className='bx bxl-github'></i></a>
                    <a href="https://www.linkedin.com/in/carlos-mu%C3%B1oz-cuellar-programador/"><i className='bx bxl-linkedin-square'  ></i></a>
                </section>

            </div>
        </div>
    );
};

export default Home;