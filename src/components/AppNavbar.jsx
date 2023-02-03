import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CarSliderBar from './CarSliderBar';
const AppNavbar = () => {

    const navigate = useNavigate()
    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    return (
        <>
            <Navbar fixed='top' bg="light" expand="lg" size="lg">
                <Container >
                    <Navbar.Brand as={Link} to="/" style={{color: "red"}}>E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navbar-fixed-top">
                            <Nav.Link as={Link} to="/Login"><i className='bx bx-user'></i></Nav.Link>
                            <Nav.Link as={Link} to="/Purchases">Purchases</Nav.Link>
                            <Nav.Link onClick={handleShow}><i className='bx bx-cart-alt'></i></Nav.Link>
                            <Nav.Link onClick={logout}>Log out</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CarSliderBar show={show} handleClose={handleClose}/>
            
        </>
    );
};

export default AppNavbar;