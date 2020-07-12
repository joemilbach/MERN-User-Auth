import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

export default function Home() {
  return (
    <>
    <Container as="main" className="home" fluid>
      <Col as="hgroup">
        <h1>Home</h1>
      </Col>
    </Container>
    </>
  );
}
