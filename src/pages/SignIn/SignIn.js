import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";

import "../../styles/signIn.css";

const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
      return;
    }
    if (password === "") {
      alert("Password is required");
      return;
    }
    if (email !== "" && password !== "") {
      const data = {
        email,
        password,
      };
      try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, data, {
          // headers: { "Access-Control-Allow-Origin": "*" },
        });
        console.log(result);
        if (result.data.data.token) {
          // Set token from backend to local storage
          // {"data": { "token": "ini token" }}
          localStorage.setItem("token", result.data.data.token);
          setToken(result.data.data.token);

          navigate("/");
        }
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="signIn">
      <div className="signInAside" />
      <div className="signInForm">
        <div className="signInTitle">
          <h1>Sign In</h1>
        </div>
        <div className="signInCenter">
          <form className="signInField" onSubmit={handleSubmit}>
            <div className="signInField">
              <label className="signInFieldLabel">Email</label>
              <input type="email" id="email" className="signInFieldInput" placeholder="Enter your email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="signInField">
              <label className="signInFieldLabel">Password</label>
              <input type="password" id="password" className="signInFieldInput" placeholder="Enter your password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="signInField">
              <div className="signInFieldbutton">
                <button className="signInFieldButton">Sign In</button>
              </div>
              <div className="signInFieldbutton">
                <label className="signup">create an account? </label>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>

            <div className="signInFieldbutton">
              <label className="signup">or sign up using </label>
            </div>

            <div className="signInFieldbutton">
              <div className="googleButton">
                <button className="google">
                  <FaGoogle color="white" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
