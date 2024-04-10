import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./navBar.css"

function NavBar (){
    return(
        <Navbar class="navbar navbar-dark bg-dark">
            <Container>
                <Navbar.Toggle aria-controls="menu" />
                <Navbar.Collapse id="menu">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Jogar</Nav.Link>
                        <Nav.Link href="/">Time</Nav.Link>
                        <Nav.Link href="/">Convites</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="/">
                    <img src="/logo.svg" width="30" height="30" className="d-inline-block align-top" alt="FuteBRol logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="pesquisa" />
                <Navbar.Collapse id="pesquisa">
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search"/>
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>
    );
};

export default NavBar;