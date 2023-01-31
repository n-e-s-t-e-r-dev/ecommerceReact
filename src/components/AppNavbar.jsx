import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = () => {
    
    const navigate = useNavigate()
    const logout = () => {
        localStorage.setItem("token","")
        navigate("/login")
    }
    return (
        <Navbar bg="light" expand="lg" size="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/Purchases">Purchases</Nav.Link>
                        <Nav.Link as={Link} to="/Login">Car</Nav.Link>
                        <Nav.Link onClick={logout}>Log out</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;