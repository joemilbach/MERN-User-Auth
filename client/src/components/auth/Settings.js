import React, { useState, useEffect, useLayoutEffect, useContext } from 'react'
import createContext from './UserContext'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import ErrorAlert from '../layout/ErrorAlert'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

export default function Settings() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordCheck, setPasswordCheck] = useState()
  const [displayName, setDisplayName] = useState()
  const [autoLogin, setAutoLogin] = useState()
  const [alert, setAlert] = useState()
  const { userData } = useContext(createContext)
  const history = useHistory()
  const [userSettings, setUserSettings] = useState({})

  useEffect(() => {
    if(userData.token === undefined) {
      history.push("/login")
    }
  }, [userData.token, history])

  useLayoutEffect(() => {
    try {
      const userProfile = () => {
        Axios.get(
          "http://localhost:8000/users/profile",
          { headers: { "x-auth-token": userData.token } }
        ).then(response => {
          setUserSettings({
            email: response.data.email,
            displayName: response.data.displayName,
            autoLogin: response.data.autoLogin
          })
        })
      }

      userProfile()
    } catch (error) {
      error.response.data.msg && setAlert(error.response.data.msg)
    }
  }, [userData.token])

  const submit = async (e) => {
    e.preventDefault()

    try {
      const editUser = { email, password, passwordCheck, displayName, autoLogin }
      await Axios.post(
        "http://localhost:8000/users/edit",
        editUser
      )
    } catch (error) {
      error.response.data.msg && setAlert(error.response.data.msg)
    }
  }

  return (
    <Container as="main" className="register" fluid>
      <Col as="hgroup">
        <h1>Settings</h1>
      </Col>
      { userSettings.email &&
      <Form className="col-md-8 col-lg-6 mt-3" onSubmit={submit}>
        { alert && <ErrorAlert message={alert} /> }
        <Form.Group controlId="register-email">
          <Form.Label>Email address</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>{userSettings.email}</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="email" placeholder="Update your email address" onChange={e => setEmail(e.target.value)} />
            </InputGroup>
        </Form.Group>

        <Form.Group controlId="register-dispaly-name">
          <Form.Label>Display name</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>{userSettings.displayName}</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="text" placeholder="Update what should we call you?" onChange={e => setDisplayName(e.target.value)} />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="register-password">
          <Form.Label className="m-0">Password</Form.Label>
          <Form.Text className="mt-0 mb-3" muted>
            <em>Your password must be 6 characters long and "Password" and "Confirm Password" fields must match.</em>
          </Form.Text>
          <Form.Control type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="register-password-confirm">
          <Form.Label className="d-none">Password Confirm</Form.Label>
          <Form.Control type="password" placeholder="Confirm New Password" onChange={e => setPasswordCheck(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Check type="switch" id="register-autoLogin" label="Keep Me Logged In?" defaultChecked={userSettings.autoLogin} onChange={e => setAutoLogin(e.target.value)} />
        </Form.Group>

        <Button variant="warning" className="text-white mt-2 mr-2" type="submit">Register Me</Button> <em className="text-info">*Required fields</em>
      </Form>
      }
    </Container>
  );
}
