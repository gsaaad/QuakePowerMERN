import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Store } from "react-notifications-component";
import Auth from "../utils/authenticate";
import "animate.css/animate.compat.css";

const Signup = () => {
  const [addUser, { error }] = useMutation(ADD_USER);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log("front-end: successful registration");
      // reset form
      setFormState({ username: "", password: "", email: "" });
      Store.addNotification({
        title: "Success!",
        message: "Registration was successful!",
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
      // wait 5 seconds as user reads notification, Authenticate User + login and reload page
      setInterval(function () {
        Auth.login(data.addUser.token);
      }, 5000);

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
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
                message: "Registration was unsuccessful.. Try again",
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

export default Signup;
