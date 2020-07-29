import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';


const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">DSRS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/chord">Chord</Nav.Link>
          <Nav.Link href="/treemap">Treemap</Nav.Link>
          <Nav.Link href="/gdpmap">GDP map</Nav.Link>
          <Nav.Link href="/flow">Flow Map</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;