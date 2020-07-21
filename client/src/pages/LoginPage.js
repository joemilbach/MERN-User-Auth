import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../actions";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  function handleChange(e) {
    console.log(e.target);
    const { id, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  return (
    <Container as="main" className="login" fluid>
      <Col as="hgroup" className="col-md-8 col-lg-6 mt-lg-5 mx-auto">
        <h1>Login in here</h1>
      </Col>
      <Form
        className="col-md-8 col-lg-6 pt-2 mx-auto"
        name="form"
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !username ? " is-invalid" : "")
            }
          />
          {submitted && !username && (
            <div className="invalid-feedback">Username is required</div>
          )}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            value={password}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !password ? " is-invalid" : "")
            }
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </Form.Group>
        <Form.Group className="d-flex justify-content-between align-items-center">
          <Link to="/register" className="btn btn-outline-primary">
            Register
          </Link>
          <Button variant="warning" className="text-white mr-2" type="submit">
            {loggingIn && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Login
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default LoginPage;
