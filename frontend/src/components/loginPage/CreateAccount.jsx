import React, { useState } from 'react'
import {auth} from "../../../../firestore/config"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import LoginPage from './LoginPage';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("acc created successfully: ", user);  
                navigate('/LoginPage');
                
            })
    }

    return (
        <>
                 <div className="auth-container">
            <h1 className="auth-title">Create Account</h1>
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
                        placeholder="Create a password" 
                    />
                </div>
                <button className="submit-btn" type="submit">Create Account</button>
                <p className="auth-link">Already have an account? <Link to="/LoginPage">Login</Link></p>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>  
        </>
    )

}