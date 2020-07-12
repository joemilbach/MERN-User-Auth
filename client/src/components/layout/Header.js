import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LayersHalf } from 'react-bootstrap-icons'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Header() {
  const history = useHistory()

  const register = () => history.push("/register")
  const login = () => history.push("/login")
  const logout = () => history.push("/login")

  return (
    <header id="app-header" className="mb-4">
      <Navbar bg="info" fixed="top" expand="lg">
        <Container fluid>
          <Link className="navbar-brand text-white h6 mb-0" to="/">
            <LayersHalf color="white" className="mr-2" size="32" /> Login & Stuff
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <button onClick={register} className="nav-link btn btn-link text-white" to="/register">Register</button>
              <button onClick={login} className="nav-link btn btn-warning text-white px-5" to="/login">Login</button>
              <button onClick={logout} className="nav-link btn btn-warning text-white px-5" to="/login">Logout</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
