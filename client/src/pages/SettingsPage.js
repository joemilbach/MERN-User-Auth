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
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function SettingsPage() {
  const settings = useSelector((state) => state.authentication.user);
  const [user, setUser] = useState({
    id: settings.id,
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    token: settings.token,
  });
  const registering = useSelector((state) => state.registration.registering);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof alert.type !== undefined && alert.type === "alert-success") {
      setUser((user) => ({
        ...user,
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
      }));
    }
  }, [alert.type]);

  function handleChange(e) {
    const { id, value } = e.target;
    setUser((user) => ({ ...user, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userActions.update(user));
  }

  return (
    <Container as="main" className="login" fluid>
      <Col as="hgroup" className="col-md-8 col-lg-6 mt-lg-5 mx-auto">
        <h1>Edit your settings or delete your account</h1>
      </Col>
      <Form
        className="col-md-8 col-lg-6 pt-2 mx-auto"
        name="form"
        onSubmit={handleSubmit}
      >
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <InputGroup.Text>{settings.email}</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="johndoe@domain.com"
              value={user.email}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Text>{settings.username}</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="John Doe"
              value={user.username}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Row className="mb-3">
          <Form.Text className="col-12 mt-2 mb-3 d-none">
            <em>
              "Password" must be six characters or longer and must match
              "Confirm Password".
            </em>
          </Form.Text>
          <Form.Group controlId="password" className="col-md-6">
            <Form.Label className="w-100 d-flex justify-content-between align-items-center">
              Password*
              <OverlayTrigger
                placement="top"
                target="tooltip-password"
                overlay={
                  <Tooltip id="tooltip-password">
                    Six characters or longer
                  </Tooltip>
                }
              >
                <InfoCircleFill className="text-info mr-2" />
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              value={user.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="passwordConfirm" className="col-md-6">
            <Form.Label className="w-100 d-flex justify-content-between align-items-center">
              Confirm Password*
              <OverlayTrigger
                placement="top"
                target="tooltip-passwordConfirm"
                overlay={
                  <Tooltip id="tooltip-passwordConfirm">
                    Must match "Password"
                  </Tooltip>
                }
              >
                <InfoCircleFill className="text-info mr-2" />
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              value={user.passwordConfirm}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Form.Group className="d-flex justify-content-between align-items-center pt-2">
          <Link to="/" className="btn btn-outline-primary">
            Back Home
          </Link>
          <Button variant="warning" className="text-white" type="submit">
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Edit Settings
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default SettingsPage;
