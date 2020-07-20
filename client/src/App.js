import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import createContext from "./components/auth/UserContext";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Settings from "./components/auth/Settings";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const loginCheck = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post(
        "http://localhost:8000/users/validToken",
        null,
        { header: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userResponse = await Axios.get("http://localhost:8000/users/", {
          header: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userResponse.data,
        });
      }
    };

    loginCheck();
  }, []);

  return (
    <>
      <BrowserRouter>
        <createContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </createContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
