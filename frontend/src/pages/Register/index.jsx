import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState({ msg: "", status: false });
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role_id: "657ebfbcb93183d148eef5c6",
  });
  const HandleOnInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (values.confirmPassword !== values.password) {
      setError({
        msg: "passwords doesnt match",
        status: true,
      });
      return;
    }
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/register",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.status === "success") {
        navigate("/");
      }
    } catch (err) {
      setError({
        msg: "Something went Wrong",
        status: true,
      });
    }
  };
  return (
    <div>
      <form className="reg-form" onSubmit={handleRegister}>
        <div className="registerform-pair">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={values.name}
            onChange={HandleOnInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={values.email}
            onChange={HandleOnInputChange}
          />
        </div>
        <div className="registerform-pair">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={values.password}
            onChange={HandleOnInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={HandleOnInputChange}
            placeholder="Confirm Password"
          />
        </div>
        {error.status ? <span className="error">{error.msg}</span> : ""}
        <button type="submit" className="reg-btn">
          Register
        </button>
        <p>
          Already Have an Account? <Link to={"/"}>Login Here.</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
