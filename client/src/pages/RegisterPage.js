import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../actions";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegisterPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  function handleChange(e) {
    const { id, value } = e.target;
    setUser((user) => ({ ...user, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (user.firstName && user.lastName && user.username && user.password) {
      dispatch(userActions.register(user));
    }
  }

  return (
    <Container as="main" className="login" fluid>
      <Col as="hgroup" className="col-md-8 col-lg-6 mt-lg-5 mx-auto">
        <h1>Sign up to get started</h1>
      </Col>
      <Form
        className="col-md-8 col-lg-6 pt-2 mx-auto"
        name="form"
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John"
            value={user.firstName}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.firstName ? " is-invalid" : "")
            }
          />
          {submitted && !user.firstName && (
            <div className="invalid-feedback">First Name is required</div>
          )}
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Doe"
            value={user.lastName}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.lastName ? " is-invalid" : "")
            }
          />
          {submitted && !user.lastName && (
            <div className="invalid-feedback">Last Name is required</div>
          )}
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            value={user.username}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.username ? " is-invalid" : "")
            }
          />
          {submitted && !user.username && (
            <div className="invalid-feedback">Username is required</div>
          )}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            value={user.password}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.password ? " is-invalid" : "")
            }
          />
          {submitted && !user.password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </Form.Group>
        <Form.Group className="d-flex justify-content-between align-items-center">
          <Link to="/login" className="btn btn-outline-primary">
            Cancel
          </Link>
          <Button variant="warning" className="text-white mr-2" type="submit">
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Sign Up
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default RegisterPage;
