import React from "react";
import { Link } from "react-router-dom";

import { LayersHalf } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <header id="app-header" className="mb-4">
      <Navbar bg="primary" fixed="top" expand="lg">
        <Container fluid>
          <Link className="navbar-brand text-white h6 mb-0" to="/">
            <LayersHalf color="#ffa600" className="mr-2" size="32" /> Login &
            Stuff
          </Link>
          <Nav className="ml-auto"></Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
