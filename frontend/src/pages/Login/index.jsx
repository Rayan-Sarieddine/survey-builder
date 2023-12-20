import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const HandleOnInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  async function login(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.status === "success") {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        navigate("/surveys");
      }

      console.log(res.status);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form className="login-form" onSubmit={login}>
        <h2 className="form-title">Enter Your Credentials</h2>
        <div className="form-body">
          <div className="email-field-wrapper">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={HandleOnInputChange}
            />
          </div>
          <div className="password-field-wrapper">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={HandleOnInputChange}
              placeholder=" Enter Password"
            />
          </div>
          <div className="btn-wrapper">
            <button type="submit">login</button>
            <p>
              Don't have an account?
              <Link to={"/register"}>Register here.</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
