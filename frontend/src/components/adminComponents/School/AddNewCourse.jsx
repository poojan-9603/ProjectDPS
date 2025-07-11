import React from 'react';
import { Link } from'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from'react';

export default function AddNewCourse(){
    const [course, setCourse] = useState({
        courseName: '',
        courseTeacher:'' ,
        courseDescription: '',
    });
    const [teacher, setTeacher] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/teachers')
            .then((res) => setTeacher(res.data))
           .catch((err) => console.log(err))
           
    },[])
      
    const teacherOptionSelect = (e) => {
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(course);

        axios.post('http://localhost:3000/api/courses', course);
    }



    const handleChange = (e) => {
        const {name, value} = e.target;
        setCourse({...course, [name]: value})

    }

    return(
        <>
            <h1>DPS Course List</h1>
            <Link to={"/AdminDashboard"}> <button>Back</button> </Link>

            <form onSubmit={handleSubmit} >
                <input type="text" name="courseName" value={course.courseName} placeholder="Course Name" onChange={handleChange}/>
                <label> Teacher: </label>
                <select name="courseTeacher" value={course.courseTeacher} onChange={handleChange}>
                    <option value="" > Pick a Teacher </option>
                    {teacher.map(t => (
                        <option value={t._id} key={t._id}>
                            {t.name}
                        </option>))
                    }
                </select>


                <input onChange={handleChange} type="text" name="courseClass" value={course.courseClass} placeholder="Course Class"/>
                <input onChange={handleChange} type="text" name="courseDescription" value={course.courseDescription} placeholder="Course Description"/>
                <button type="submit">Add Course</button>
            </form>
            
        </>
    )
}