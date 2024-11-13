// src/pages/Login.js
import React, { useState } from "react";
import axios from "../axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //    mosasadi@example.com
  //   {
  //     "email": "jehad@example.com",
  //     "password": "password123"
  // }

  // تابع الإرسال
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/auth/login", formData);
      const token = response.data?.token;

      console.log(response);

      if (token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        localStorage.setItem("userId", userId);

        console.log("token : ", token);
        console.log("userId : ", userId);

        console.log("Login successful");
        navigate(`/dashboard/${userId}`);
      } else {
        setError("Token not received");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
