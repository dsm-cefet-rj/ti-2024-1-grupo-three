import React from "react";
import "../styles/navBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Container } from "react-bootstrap";
import { useState } from 'react';
import Image from 'react-bootstrap/Image'
import DropDown from "./DropDown";
import * as Icon from 'react-bootstrap-icons';


const NavBarTest=()=>{
    const [show, setShow] = useState(false);
    const [showSearch, setShowSearch] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowSearch = () => setShowSearch(true);
    return(
        <Nav className="navbar sticky-top"> 
        <Container fluid>
            <Button onClick={handleShow} variant="outline-secondary" className="me-2">
                <img src="../img/Group 6.svg"/>
            </Button>
            <Navbar.Brand>
                <Nav.Link href="/home"><img src="../img/Group 1 1.svg"/></Nav.Link>                
            </Navbar.Brand>
            <Button onClick={handleShowSearch} variant="outline-secondary">
                    <img src="../img/search.svg"/>
            </Button>
          
            {/* <NavDropdown title="" >
                <Image src="../img/Group 6.svg"></Image>
              <NavDropdown.Item href="home">Action</NavDropdown.Item>
              <NavDropdown.Item href="home">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="home">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="home">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header>
                    <Offcanvas.Title>Cano</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link href="/home"> <Image src="../img/Group 2.svg" roundedCircle/> Meu Time</Nav.Link>
                    <Nav.Link href="/home"><Icon.TrophyFill color="black" size={30}/>Meus Torneios</Nav.Link>
                    <Nav.Link href="/home">Minhas Partidas</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
        </Nav>
        
    );
}

export default NavBarTest;