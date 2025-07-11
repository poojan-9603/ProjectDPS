import React from 'react';
import Navbar from '../navbar/Navbar.jsx';
import { Link } from 'react-router-dom';

export default function AdminDashboard(){

    return(
        <>
            <h1>DPS</h1>
            <Link to={"/TeachersList"}>  <button>Teacher</button> </Link>
            <Link to={"/AddNewStudent"}> <button>Add new Student</button> </Link>
            <Link to={"/AddNewClass"}> <button>Add new Class</button> </Link>
            <Link to={"/AddNewCourse"}> <button >Add new Course</button> </Link>
            <Link to={"/AddNewActivity"}> <button>Add new Activity</button> </Link>
            <Link to={"/MakeAnAnnouncement"}> <button>Make an Announcement</button> </Link>
            <Link to={"/AddNewExam"}> <button>Add new Exam</button> </Link>  
            <Navbar></Navbar>
                       

        </>
    );
}