import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { LayersHalf } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  const user = useSelector((state) => state.authentication.user);
  const currentPath = useLocation().pathname;

  return (
    <header id="app-header" className="mb-4">
      <Navbar bg="primary" fixed="top" expand="lg">
        <Container fluid>
          <Link className="navbar-brand text-white h6 mb-0" to="/">
            <LayersHalf color="#ffa600" className="mr-2" size="32" /> Login &
            Stuff
          </Link>
          {typeof user != "undefined" && (
            <Nav className="ml-auto">
              <Navbar.Text className="text-white mr-4">
                <strong>Logged in as:</strong> {user.username}
              </Navbar.Text>
              {currentPath === "/edit" ? (
                <Link
                  className="nav-link btn btn-outline-warning text-white px-5 mr-3"
                  to="/"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  className="nav-link btn btn-outline-warning text-white px-5 mr-3"
                  to="/edit"
                >
                  Settings
                </Link>
              )}
              <Link
                className="nav-link btn btn-warning text-white px-5"
                to="/login"
              >
                Logout
              </Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
