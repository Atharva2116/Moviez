import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate=useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // Successful login
        navigate("/home");
      } else {
        // Login failed
        const data = await response.json();
        alert(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: signupUsername, password: signupPassword })
      });

      if (response.ok) {
        // Successful signup
        navigate("/home");
      } else {
        // Signup failed
        const data = await response.json();
        alert(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="background-container1">
      <div className="container1">
        {showLoginForm ? (
          <form id="login" onSubmit={handleLogin}>
            <h1 id="head">Login</h1>
            <p className="text required">Username</p>
            <input
              required
              type="text"
              placeholder="username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <p className="text required">Password</p>
            <input
              required
              type="password"
              placeholder="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button id="btn" type="submit">Sign in</button>
            <p className="content">Does not have account ?</p>
            <button id="btn-up" type="button" onClick={toggleForm}>
              Sign up
            </button>
          </form>
        ) : (
          <form id="login" onSubmit={handleSignup}>
            <h1 id="head">Sign up</h1>
            <p className="text required">Username</p>
            <input
              type="text"
              required
              placeholder="username"
              className="input"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
            <br />
            <p className="text required">Password</p>
            <input
              type="password"
              required
              placeholder="password"
              className="input"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <br />
            <button id="btn" type="submit">Register</button>
            <p className="content">Already have an account ?</p>
            <button id="btn-up" type="button" onClick={toggleForm}>
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
