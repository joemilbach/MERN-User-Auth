import React, { useEffect, useContext } from 'react'
import createContext from '../auth/UserContext'
import { useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

export default function Home() {
  const { userData } = useContext(createContext)
  const history = useHistory()

  useEffect(() => {
    if(userData.token === undefined) {
      history.push("/login")
    }
  })



  return (
    <>
    <Container as="main" className="home" fluid>
      <Col as="hgroup">
        <h1>Home</h1>
      </Col>
    </Container>
    </>
  );
}
