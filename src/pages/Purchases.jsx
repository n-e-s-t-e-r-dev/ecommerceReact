import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const purchases = useSelector(state => state.purchases)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])
    return (
        <div className='container-purchases'>
            <Row xs={1} md={2} lg={3} className="g-4">
                {purchases.map((product) => (
                    <Col key={product.id}>
                        <Card key={product.product.id} onClick={() => navigate(`/products/${product.product.id}`)}>
                            <Card.Img className="g-3"
                                variant="top"
                                style={{ height: 200, objectFit: "contain", paddingTop: "1rem" }}
                                src={product.product.images?.[0].url} alt="producto" />

                            <Card.Body className='card-body'>
                                <Card.Title>{product.product.title}</Card.Title>
                                <div className='container-car-price'>
                                    <div>
                                        <Card.Text>
                                            Price: $ {product.product.price}
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
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

export default Purchases;