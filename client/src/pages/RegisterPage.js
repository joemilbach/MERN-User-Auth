import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../actions";

import { InfoCircleFill } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function RegisterPage() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // Reset login status
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
    if (user.email && user.password && user.passwordConfirm) {
      dispatch(userActions.register(user));
    }
  }

  return (
    <Container as="main" className="register" fluid>
      <Col as="hgroup" className="col-md-8 col-lg-6 mt-lg-5 mx-auto">
        <h1>Sign up to get started</h1>
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
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="text"
            placeholder="johndoe@domain.com"
            value={user.email}
            onChange={handleChange}
            className={submitted && !user.email ? " is-invalid" : ""}
          />
          {submitted && !user.email && (
            <div className="invalid-feedback">Email is required</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            value={user.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Text className="col-12 mt-2 mb-3 d-none">
            <em>
              "Password" must be six characters or longer and must match
              "Confirm Password".
            </em>
          </Form.Text>
          <Form.Group controlId="password" className="col-md-6 mb-3">
            <Form.Label className="w-100 d-flex justify-content-between align-items-center">
              Password*
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Six characters or longer</Tooltip>}
              >
                <InfoCircleFill className="text-info mr-2" />
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              value={user.password}
              onChange={handleChange}
              className={submitted && !user.password ? " is-invalid" : ""}
            />
            {submitted && !user.password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </Form.Group>
          <Form.Group controlId="passwordConfirm" className="col-md-6 mb-3">
            <Form.Label className="w-100 d-flex justify-content-between align-items-center">
              Confirm Password*{" "}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Must match "Password"</Tooltip>}
              >
                <InfoCircleFill className="text-info mr-2" />
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              value={user.passwordConfirm}
              onChange={handleChange}
              className={
                submitted && !user.passwordConfirm ? " is-invalid" : ""
              }
            />
            {submitted && !user.passwordConfirm && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </Form.Group>
          <Form.Group controlId="role" className="col-md-6">
            <Form.Label>Account Type</Form.Label>
            <Form.Control
              custom
              as="select"
              className="form-select"
              value={user.role}
              onChange={handleChange}
            >
              <option selected>Please make a selection...</option>
              <option value="U">Standard User</option>
              <option value="A">Admin</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Form.Group className="d-flex justify-content-between align-items-center pt-2">
          <Link to="/login" className="btn btn-outline-primary">
            Cancel
          </Link>
          <span>
            <em className="mx-4 text-muted">*Required fields</em>
            <Button variant="warning" className="text-white" type="submit">
              {registering && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Sign Up
            </Button>
          </span>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default RegisterPage;
