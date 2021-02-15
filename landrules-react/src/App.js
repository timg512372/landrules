import React from "react";
import { render } from "react-dom";
import { Button } from "antd";
import { Router, Link } from "@reach/router";
import "./App.less";

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Form from "./pages/Form.js";
import NavBar from "./components/NavBar.js";

const App = () => (
  <div>
    <NavBar></NavBar>
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Register path="/register" />
      <Form path="form" />
    </Router>
  </div>
);

export default App;
