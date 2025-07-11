import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// Import icons from react-icons
import { FaHome, FaTachometerAlt, FaUser, FaBook, FaGraduationCap, FaCalendarAlt, FaBell, FaEnvelope, FaFolder, FaCog, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`navbar ${collapsed ? 'collapsed' : ''}`}>
            <div className="toggle-btn" onClick={toggleNavbar}>
                {collapsed ? '>' : '<'}
            </div>
            <div className="navbar-content">
                <div className="logo">
                    <h2>{collapsed ? 'DPS' : 'DPS School'}</h2>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                <span className="icon"><FaHome /></span>
                                <span className="text">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard">
                                <span className="icon"><FaTachometerAlt /></span>
                                <span className="text">Student Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentprofile">
                                <span className="icon"><FaUser /></span>
                                <span className="text">Student Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentcourses">
                                <span className="icon"><FaBook /></span>
                                <span className="text">Student Courses</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentgrades">
                                <span className="icon"><FaGraduationCap /></span>
                                <span className="text">Student Grades</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentattendance">
                                <span className="icon"><FaCalendarAlt /></span>
                                <span className="text">Student Attendance</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentnotifications">
                                <span className="icon"><FaBell /></span>
                                <span className="text">Student Notifications</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentmessages">
                                <span className="icon"><FaEnvelope /></span>
                                <span className="text">Student Messages</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentresources">
                                <span className="icon"><FaFolder /></span>
                                <span className="text">Student Resources</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentsettings">
                                <span className="icon"><FaCog /></span>
                                <span className="text">Student Settings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studenthelp">
                                <span className="icon"><FaQuestionCircle /></span>
                                <span className="text">Student Help</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/studentdashboard/studentlogout">
                                <span className="icon"><FaSignOutAlt /></span>
                                <span className="text">Student Logout</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}