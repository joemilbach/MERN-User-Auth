import React, { useState, useContext } from "react";
import createContext from "./UserContext";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState();
  const { setUserData } = useContext(createContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const existingUser = { email, password };
      const loginResponse = await Axios.post(
        "http://localhost:8000/users/login",
        existingUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (error) {
      error.response.data.msg && setAlert(error.response.data.msg);
    }
  };

  return (
    <Container as="main" className="login" fluid>
      <Col as="hgroup">
        <h1>Login</h1>
      </Col>
      <Form className="col-md-8 col-lg-6 mt-3" onSubmit={submit}>
        {alert && <ErrorAlert message={alert} />}
        <Form.Group controlId="login-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@domain.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="login-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="d-flex align-items-center justify-content-between pt-3">
          <Button variant="warning" className="text-white mr-2" type="submit">
            Login
          </Button>
          <em>
            Don't have an account? <Link to="/register">Register</Link>
          </em>
        </Form.Group>
      </Form>
    </Container>
  );
}
