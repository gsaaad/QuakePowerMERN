import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Store } from "react-notifications-component";
import Auth from "../utils/authenticate";

import { LOGIN_USER } from "../utils/mutations";
const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { ...formState } });

      Store.addNotification({
        title: "Success!",
        message: "Login was successful!",
        type: "success",
        insert: "top",
        container: "center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
        width: 700,
      });
      setInterval(function () {
        Auth.login(data.login.token);
      }, 5000);

      // clear form values
      setFormState({
        email: "",
        password: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {error &&
              Store.addNotification({
                title: "Failed!",
                message:
                  "Login was unsuccessful.. Please check your credentials.. ",
                type: "danger",
                insert: "top",
                container: "center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                },
                width: 700,
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
