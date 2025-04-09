import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import './LoginStyles.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("logged in successfully: ", user);
        navigate('/StudentDashboard');
     })
     .catch((error) => {
       setError(error.message);
       console.log("error: ", error);  
     }) 
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input 
            type="email" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email" 
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
          />
        </div>
        <button className="submit-btn" type="submit">Login</button>
        <p className="auth-link">Don't have an account? <Link to="/CreateAccount">Create Account</Link></p>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}