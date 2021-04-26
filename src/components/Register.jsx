import { Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Button } from "react-bootstrap";
const URL = "https://fierce-shore-80067.herokuapp.com/";

function Register(props) {
  const [btn, setBtn] = useState(0);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  function handleChangeEmail(event) {
    const { value } = event.target;
    console.log("Email", value);
    props.setEmail(value);
  }

  function handleChangePassword(event) {
    const { value } = event.target;
    console.log("Password", value);
    props.setPassword(value);
  }

  function handleClick() {
    axios
      .get(URL + "auth/" + props.email)
      .then((response) => {
        console.log(response.data);

        if (response.data.password) {
          alert(
            "Email ID already exists in the database. Please Login or select another Email ID"
          );
        } else {
          axios
            .post(URL + "auth", {
              email_id: props.email,
              password: props.password,
            })
            .then((response) => {
              console.log("Successfully added new user");

              props.setKeepPage(props.email);
              props.setLoginPage(0);
              props.setRegPage(0);
              props.setPassword("");

              console.log("User Added");

              setBtn(1);
            })
            .catch((error) => {
              console.log("Error : ", error);
              alert("There was some error while registering you!");
            });
        }
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  }

  function validate() {
    let email = props.email;
    let password = props.password;

    let errors = {};
    let isValid = true;

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter a valid password";
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter a valid email address.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter a valid email address.";
      }
    }

    console.log(errors, email, password);

    setError(errors);

    if (isValid) handleClick();

    return isValid;
  }

  function handleLogBtn(event) {
    event.preventDefault();
    props.setKeepPage(0);
    props.setLoginPage(1);
    props.setRegPage(0);
    props.setEmail("");
    props.setPassword("");
    setBtn(1);

    console.log("Going to Login Page");
  }

  return (
    <div>
      <Header status="Registration Page" />
      <input
        type="text"
        value={props.email}
        placeholder="Enter your Email ID"
        onChange={handleChangeEmail}
      ></input>
      <div className="text-danger">{error.email}</div>
      <br />
      <br />

      <input
        type="text"
        value={props.password}
        placeholder="Enter your Password"
        onChange={handleChangePassword}
      ></input>
      <div className="text-danger">{error.password}</div>
      <br />
      <br />

      <Button variant="outline-warning" onClick={validate}>
        Register
      </Button>

      <br />
      <br />

      <Button variant="link" onClick={handleLogBtn}>
        Already have an account ? Go to Login Page
      </Button>

      <br />
      <br />

      {setBtn && <Route path="/" exact strict />}

      <Footer />
    </div>
  );
}

export default Register;
