import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Keep from "./Keep";

function App() {
  const [loginPage, setLoginPage] = useState(1);
  const [regPage, setRegPage] = useState(0);
  const [keepPage, setKeepPage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Route
        path="/"
        exact
        strict
        render={({ match }) =>
          loginPage ? (
            <Login
              email={email}
              password={password}
              setLoginPage={setLoginPage}
              setRegPage={setRegPage}
              setKeepPage={setKeepPage}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          ) : regPage ? (
            <Register
              email={email}
              password={password}
              setLoginPage={setLoginPage}
              setRegPage={setRegPage}
              setKeepPage={setKeepPage}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          ) : (
            <Keep
              email={email}
              password={password}
              setLoginPage={setLoginPage}
              setRegPage={setRegPage}
              setKeepPage={setKeepPage}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          )
        }
      />
    </div>
  );
}

export default App;
