import React, { useState } from 'react';
import { Accordion, Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Price = () => {
    const [price, setPrice] = useState("");
    const [minPrice, setMinPrice] = useState("");

    const { register, handleSubmit } = useForm()

    const submit = (data) => {
        console.log(data)
    };

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Price</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Max-price</Form.Label>
                            <Form.Control type="number"
                                placeholder="enter max price"
                                {...register("price")}
                                value={minPrice}
                                onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Min-price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter min price" {...register("minPrice")}
                                value={price}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                Filter prices.
                            </Form.Text>
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form>
    );
};

export default Price;
