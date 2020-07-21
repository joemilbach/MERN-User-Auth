import React, { useContext } from "react";
import createContext from "../auth/UserContext";
import { Link, useHistory } from "react-router-dom";
import { LayersHalf } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  const { userData, setUserData } = useContext(createContext);
  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const settings = () => history.push("/settings");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  return (
    <header id="app-header" className="mb-4">
      <Navbar bg="primary" fixed="top" expand="lg">
        <Container fluid>
          <Link className="navbar-brand text-white h6 mb-0" to="/">
            <LayersHalf color="#ffa600" className="mr-2" size="32" /> Login &
            Stuff
          </Link>
          <Nav className="ml-auto">
            {userData.user ? (
              <>
                <Navbar.Text className="text-white mr-4">
                  <strong>Logged in as:</strong> {userData.user.displayName}
                </Navbar.Text>
                <button
                  onClick={settings}
                  className="nav-link btn btn-outline-warning text-white px-5 mr-3"
                  to="/register"
                >
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="nav-link btn btn-warning text-white px-5"
                  to="/logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={register}
                  className="nav-link btn btn-outline-warning text-white px-5 mr-3"
                  to="/register"
                >
                  Register
                </button>
                <button
                  onClick={login}
                  className="nav-link btn btn-warning text-white px-5"
                  to="/login"
                >
                  Login
                </button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}
