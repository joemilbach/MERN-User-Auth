import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userActions, alertActions } from "../actions";

import {
  InfoCircleFill,
  ExclamationTriangleFill,
  ArrowRightCircleFill,
  ArrowLeftCircleFill,
} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
//import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
//import Collapse from "react-bootstrap/Collapse";

function UserAccountsPage() {
  const users = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState({});
  const [user, setUser] = useState({
    id: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    role: "",
    delete: "",
    token: "",
    sa: true,
  });
  const updating = useSelector((state) => state.registration.registering);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // Get all users
  useEffect(() => {
    dispatch(userActions.getAll());
  }, [dispatch]);

  // Reset form after successful update
  useEffect(() => {
    if (typeof alert.type !== undefined && alert.type === "alert-success") {
      setUser((user) => ({
        ...user,
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
        role: "",
      }));
    }
  }, [alert.type]);

  function handleSelectUser(e) {
    e.preventDefault();
    if (e.target.id !== "userListReset") {
      setSelectedUser(users.items[e.target.id]);
      const selectedUserId = users.items[e.target.id].id;
      setUser((user) => ({
        ...user,
        id: selectedUserId,
      }));
    } else {
      setSelectedUser({});
      setUser((user) => ({
        ...user,
        id: "",
      }));
    }
    dispatch(alertActions.clear());
  }

  function handleChange(e) {
    const { id, value } = e.target;
    setUser((user) => ({ ...user, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userActions.update(user));
  }

  function handleDeleteUser(e) {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <Container as="main" className="user-accounts" fluid>
      <Col as="hgroup" className="col-md-8 col-lg-6 mt-lg-5 mx-auto">
        <h1>Edit users settings</h1>
      </Col>
      <Col className="col-md-8 col-lg-6 py-2 mx-auto">
        {users.loading && <em>Loading users...</em>}
        {users.error && <div className="alert alert-danger">{users.error}</div>}
        {users.items && (
          <ListGroup>
            {selectedUser.id ? (
              <>
                <ListGroup.Item variant="info">
                  <h2 className="h5">
                    Editting:
                    <small>
                      {" " + selectedUser.username + " - " + selectedUser.email}
                    </small>
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item
                  id="userListReset"
                  variant="light"
                  action
                  onClick={(e) => handleSelectUser(e)}
                >
                  <ArrowLeftCircleFill className="text-warning mr-2" />
                  Back to user list
                </ListGroup.Item>
              </>
            ) : (
              <>
                <ListGroup.Item variant="info">
                  <h2 className="h5">Current Users</h2>
                </ListGroup.Item>
                {users.items.map((user, index) => (
                  <ListGroup.Item
                    key={user.id}
                    id={index}
                    variant="light"
                    action
                    onClick={(e) => handleSelectUser(e)}
                  >
                    <ArrowRightCircleFill className="text-warning mr-2" />
                    {user.username + " - " + user.email}
                  </ListGroup.Item>
                ))}
              </>
            )}
          </ListGroup>
        )}
      </Col>

      {selectedUser.id && (
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
              <InputGroup.Text>{selectedUser.email}</InputGroup.Text>
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
              <InputGroup.Text>{selectedUser.username}</InputGroup.Text>
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
            <Form.Group controlId="password" className="col-md-6 mb-3">
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
            <Form.Group controlId="passwordConfirm" className="col-md-6 mb-3">
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
            <Form.Group controlId="role" className="col-md-6">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                custom
                as="select"
                className="form-select"
                value={user.role}
                onChange={handleChange}
              >
                <option defaultValue>Please make a selection...</option>
                <option value="U">Standard User</option>
                <option value="A">Admin</option>
                <option value="SA">Super Admin</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="col-md-6 d-flex">
              <Button
                variant="outline-danger"
                className="align-self-end"
                block
                onClick={() => handleDeleteUser(selectedUser.id)}
              >
                <ExclamationTriangleFill className="mr-2" />
                Delete Account
              </Button>
            </Form.Group>
          </Row>
          <Form.Group className="d-flex justify-content-between align-items-center pt-2">
            <Button
              id="userListReset"
              variant="outline-primary"
              onClick={(e) => handleSelectUser(e)}
            >
              Back to User List
            </Button>
            <Button variant="warning" className="text-white" type="submit">
              {updating && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Edit Settings
            </Button>
          </Form.Group>
        </Form>
      )}
    </Container>
  );
}

export default UserAccountsPage;
