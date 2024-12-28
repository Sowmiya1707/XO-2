import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState({});  // Initialize user as an empty object

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user)
      .then((res) => {
        const { token, userId, firstName, lastName, username, hashedPassword } = res.data;
        if (token) {
          cookies.set("token", token);
          cookies.set("userId", userId);
          cookies.set("username", username);
          cookies.set("firstName", firstName);
          cookies.set("lastName", lastName);
          cookies.set("hashedPassword", hashedPassword);
          setIsAuth(true);  // Successfully authenticated
        } else {
          alert("Error: Could not sign up.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred during signup.");
      });
  };

  return (
    <div className="signUp">
      <label> Sign Up</label>
      <input
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={signUp}> Sign Up</button>
    </div>
  );
}

export default SignUp;
