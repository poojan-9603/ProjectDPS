import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import LoginPage from "./loginPage/LoginPage"
import CreateAccount from "./loginPage/CreateAccount"
import StudentDashboard from "./studentDashboard/StudentDashboard"


export default function Home() {
    return (
        <> 
         <Router> 
     
            <Routes>
                <Route path="/" element={
                    <>
                        <p> Welcome to DPS school </p>
                        <Link to="/LoginPage">Login</Link> | 
                        <Link to="/CreateAccount">Create Account</Link> 
                    </> 
                    }
                />  
                <Route path="/LoginPage" element={<LoginPage/>}/>
                <Route path="/CreateAccount" element={<CreateAccount/>}/>
                <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
                
            </Routes>
        </Router>
        
        </>
    )
}