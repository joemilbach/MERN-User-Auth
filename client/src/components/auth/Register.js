import React, { useState, useContext } from "react";
import createContext from "./UserContext";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [alert, setAlert] = useState();
  const { setUserData } = useContext(createContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const autoLoginRes = typeof autoLogin === "undefined" ? false : true;
      const newUser = {
        email,
        password,
        passwordCheck,
        displayName,
        autoLogin: autoLoginRes,
      };
      await Axios.post("http://localhost:8000/users/register", newUser);
      const loginResponse = await Axios.post(
        "http://localhost:8000/users/login",
        { email, password }
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
    <Container as="main" className="register" fluid>
      <Col as="hgroup">
        <h1>Register</h1>
      </Col>
      <Form className="col-md-8 col-lg-6 mt-3" onSubmit={submit}>
        {alert && <ErrorAlert message={alert} />}
        <Form.Group controlId="register-email">
          <Form.Label>
            Email address<em className="text-info">*</em>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@domain.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="register-dispaly-name">
          <Form.Label>Display name</Form.Label>
          <Form.Control
            type="text"
            placeholder="What should we call you?"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="register-password">
          <Form.Label className="m-0">
            Password<em className="text-info">*</em>
          </Form.Label>
          <Form.Text className="mt-0 mb-3" muted>
            <em>
              Your password must be 6 characters long and "Password" and
              "Confirm Password" fields must match.
            </em>
          </Form.Text>
          <Form.Control
            type="password"
            placeholder="Strong Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="register-password-confirm">
          <Form.Label className="d-none">
            Password Confirm<em className="text-info">*</em>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="d-flex align-items-center justify-content-between pt-3">
          <span>
            <Button variant="warning" className="text-white mr-2" type="submit">
              Register Me
            </Button>
            <em className="text-info">*Required fields</em>
          </span>
          <em>
            Already have an account? <Link to="/login">Login</Link>
          </em>
        </Form.Group>
      </Form>
    </Container>
  );
}
