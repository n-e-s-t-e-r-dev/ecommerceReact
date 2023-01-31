import React, { useState } from 'react';
import { Accordion, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Price = () => {
    const [price, setPrice] = useState("");
    const [minPrice, setMinPrice] = useState("");

    const submit = () => {
    };

    const handleSubmit = () => {
    };

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Price</Accordion.Header>
                    <Accordion.Body>
                        <input type="text" value={price} placeholder="From" onChange={(e) => setPrice(e.target.value)} />
                        <input type="text" value={minPrice} placeholder="To" onChange={(e) => setMinPrice(e.target.value)} />
                        <button type='submit'>submit</button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form>
    );
};

export default Price;
