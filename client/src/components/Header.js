import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "popper.js";

import { LayersHalf, GearFill } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  const user = useSelector((state) => state.authentication.user);

  return (
    <header id="app-header" className="mb-4">
      <Navbar bg="primary" fixed="top" expand="lg">
        <Container fluid>
          <Link className="navbar-brand text-white h6 mb-0" to="/">
            <LayersHalf className="text-warning mr-1" size="32" /> Login & Stuff
          </Link>
          {typeof user != "undefined" && (
            <Nav className="ml-auto">
              <Navbar.Text className="text-white mr-2">
                <strong>Account:</strong> {user.username}
              </Navbar.Text>
              <Dropdown alignRight className="dropdown-user">
                <Dropdown.Toggle
                  className="drop-down-toggle-empty text-white px-3"
                  id="user-menu"
                >
                  <GearFill className="text-white" />
                  <span className="sr-only">User Menu</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/">Dashboard</Dropdown.Item>
                  <Dropdown.Item href="/edit">Settings</Dropdown.Item>
                  <Dropdown.Item href="/Login">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
