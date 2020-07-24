import React from "react";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

function HomePage() {
  const user = useSelector((state) => state.authentication.user);

  return (
    <Container as="main" className="home" fluid>
      <Col as="hgroup" className="col-md-11 mt-lg-5 mx-auto">
        <h1>Hi {user.username}!</h1>
      </Col>
      <Col as="section" className="col-md-11 mx-auto">
        <p>You're logged in!!</p>
      </Col>
    </Container>
  );
}

export default HomePage;
