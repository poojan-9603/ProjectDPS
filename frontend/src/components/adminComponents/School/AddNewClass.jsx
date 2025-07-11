import React from 'react';
import { Link } from'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherModel from '../../../../../backend/models/Teacher.model';


export default function AddNewClass(){

    const [classInfo, setClassInfo] = useState('');
    const [teacher, setTeacher] = useState([]);
    const [subject, setSubject] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/teachers')
           .then((res) => {
            setTeacher(res.data);
            console.log(res.data)
           })
          .catch((err) => console.log(err))

    },[])

    useEffect(() => {
        axios.get('http://localhost:3000/api/courses')
          .then((res) => {
            setSubject(res.data)
            console.log(res.data)
    })
          .catch((err) => console.log(err))
    },[])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setClassInfo({...classInfo, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/api/classes', classInfo);
        
    }

    return(
        <>
            <h1>DPS Class List</h1>
            {/* <Link to={}> <button>Add new Class</button> </Link> */}

            <form onSubmit={handleSubmit} onChange={handleChange}>
                <input type="text" name="className" placeholder="Class Name"/>
                <select name="subjectName" value={classInfo.subjectName}>
                    <option value="">Select Subject</option>
                    {subject.map((sub) => {
                        return(
                            <option key={sub._id} value={sub._id}>
                                {sub.name}
                            </option>
                        )
                    }) }
                </select>
                <select name="teacherName" value={classInfo.teacherName}>
                    <option value="">Select Teacher</option>
                    {teacher.map((tea) => {
                        return(
                            <option key={tea._id} value={tea._id}>
                                {tea.name}
                            </option>
                        )
                    }) }
                </select>
                <input type="text" name="classStudent" placeholder="Class Students"/>
                <button>Add new Class</button>

            </form>

            
                
        </>
    )
}