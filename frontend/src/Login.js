import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    // Example password validation: at least 8 characters long
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      setToken(response.data.token);
      // alert("Login successful");
      navigate('/profile');
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h5>LOGIN</h5>
      <form className="login" onSubmit={handleSubmit}>
        <div className="group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            required
          />
          <label>Email</label>
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>
        <div className="group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onBlur={() => validatePassword(password)}
            required
          />
          <label>Password</label>
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        <Link to="/" className="btn" type="submit">
          Register
        </Link>
      </form>
    </div>
  );
}

export default Login;
