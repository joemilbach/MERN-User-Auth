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
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { email, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  function handleChange(e) {
    const { id, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  return (
    <Container as="main" className="login" fluid>
      <Col as="hgroup" className="col-md-8 col-lg-6 mt-lg-5 mx-auto">
        <h1>Login in here</h1>
      </Col>
      <Form
        className="col-md-8 col-lg-6 pt-3 mx-auto"
        name="form"
        onSubmit={handleSubmit}
      >
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="johndoe@domain.com"
            value={email}
            onChange={handleChange}
            className={submitted && !email ? " is-invalid" : ""}
          />
          {submitted && !email && (
            <div className="invalid-feedback">Email is required</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            value={password}
            onChange={handleChange}
            className={submitted && !password ? " is-invalid" : ""}
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </Form.Group>
        <Form.Group className="d-flex justify-content-between align-items-center mb-3 pt-2">
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
