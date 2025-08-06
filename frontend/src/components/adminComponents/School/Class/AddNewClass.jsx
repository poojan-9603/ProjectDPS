import React from 'react';
import { Link } from'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherModel from '../../../../../../backend/models/Teacher.model';
import {useNavigate} from "react-router-dom"
import './AddNewClass.css';


export default function AddNewClass(){

    const [classInfo, setClassInfo] = useState({
        className:'',
        classTeacher:'',
        classSubject:''
    });
    const [teacher, setTeacher] = useState([]);
    const [subject, setSubject] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/teachers')
           .then((res) => {
            setTeacher(res.data);
            
           })
          .catch((err) => console.log(err))

    },[])

    useEffect(() => {
        axios.get('http://localhost:3000/api/courses')
          .then((res) => {
            setSubject(res.data)
    })
          .catch((err) => console.log(err))
    },[])

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(value === "AddNewTeacher"){
            navigate("/AddNewTeacher");
        }   else if(value === "AddNewCourse"){
            navigate("/AddNewCourse")
        }
        
        setClassInfo({...classInfo, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("this is the class added", classInfo)
        axios.post('http://localhost:3000/api/classes', classInfo);
        
    }

    return(
        <>
            <h1>DPS Class List</h1>
            {/* <Link to={}> <button>Add new Class</button> </Link> */}

           <form onSubmit={handleSubmit} onChange={handleChange} className="add-class-form">
  <h1 className="page-title">DPS Class List</h1>

  <input
    type="text"
    name="className"
    className="form-input"
    onChange={handleChange}
    placeholder="Class Name"
  />

  <select name="classSubject" value={classInfo.classSubject} onChange={handleChange} className="form-select">
    <option value="">Select Course</option>
    {subject.map((sub) => (
      <option key={sub._id} value={sub._id}>{sub.name}</option>
    ))}
    <option value="AddNewCourse">➕ Add New Course</option>
  </select>

  <select name="classTeacher" value={classInfo.classTeacher} onChange={handleChange} className="form-select">
    <option value="">Select Teacher</option>
    {teacher.map((tea) => (
      <option key={tea._id} value={tea._id}>{tea.name}</option>
    ))}
    <option value="AddNewTeacher">➕ Add New Teacher</option>
  </select>

  <button type="submit" className="form-submit-btn">Add New Class</button>
</form>


            
                
        </>
    )
}