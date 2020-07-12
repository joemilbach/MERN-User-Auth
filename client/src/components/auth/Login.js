import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

export default function Login() {
  return (
    <Container as="main" className="login" fluid>
      <Col as="hgroup">
        <h1>Login</h1>
      </Col>
    </Container>
  );
}
