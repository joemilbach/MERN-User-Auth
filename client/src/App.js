import React from 'react'
import { LayersHalf } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



function App() {
  return (
    <>
    <header>
      <Navbar bg="info" fixed="top" expand="lg">
        <Container fluid>
          <Navbar.Brand className="text-white h6 mb-0" href="/">
            <LayersHalf color="white" className="mr-2" size="32" /> Login & Stuff
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link className="text-white" href="/users/register">Register</Nav.Link>
              <Nav.Link className="btn btn-warning text-white px-5" href="/users/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

    <Container as="main" className="mt-4 pt-5" fluid>
      <Col as="hgroup">
        <h1>h1 HTML5 Kitchen Sink</h1>
      </Col>
      <section>
      </section>
    </Container>
    </>
  );
}

export default App;
