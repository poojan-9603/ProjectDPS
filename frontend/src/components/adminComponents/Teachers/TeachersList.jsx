import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from'react-router-dom'
import { useState, useEffect } from'react'
import axios from'axios'




export default function TeachersList() {

    const [teachers, setTeachers] = useState([])
    const [isAllTeachers, setIsAllTeachers] = useState(true);


    useEffect(()=>{
        axios.get("http://localhost:3000/api/teachers")
        .then((res) => {
            console.log(res.data) //res.data is the array of teachers that we get from the backend, we can use this array to display the teachers inf
            setTeachers(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    if(isAllTeachers){
        return(
            <>
                <h1>Teachers List</h1>
                <Link to={"/AddNewTeacher"}>
                <button>Add New Teacher</button>
                </Link>
                <button name="viewToggleButton" value="viewToggleButton" onClick={()=>setIsAllTeachers(prev => !prev)}> Switch view </button>
                <p> All Teachers Views </p>


                <p>All Teachers (Table View)</p>
                <table border="1" cellPadding="8" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subjects</th>
                            <th>Classes</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.subjects.map(subject => subject.name).join(', ')}</td>
                            <td>{teacher.classes.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </>
        )

    }
 else{
    return (
        <>
        <Link to={"/AddNewTeacher"}>
                <button>Add New Teacher</button>
            </Link>
            <button name="viewToggleButton" value="viewToggleButton" onClick={()=>setIsAllTeachers(prev => !prev)}> Switch view </button>
            <h1>Teachers List</h1>
     <p>
        Card Views
     </p>
     </>
    )
 }
}