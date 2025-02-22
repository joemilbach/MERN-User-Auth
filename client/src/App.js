import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { history, PrivateRoute } from "./utility";
import { alertActions } from "./actions";

import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import UserAccountsPage from "./pages/UserAccountsPage";

function App() {
  const dispatch = useDispatch();

  // Clear Alerts
  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  return (
    <>
      <Router history={history}>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/edit" component={SettingsPage} />
          <PrivateRoute exact path="/users" component={UserAccountsPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
