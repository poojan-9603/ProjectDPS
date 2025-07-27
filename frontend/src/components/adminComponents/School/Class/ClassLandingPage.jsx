import React from "react"
import AddNewClass from "./AddNewClass"
import {Link} from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { act } from "react"
import { useNavigate } from "react-router-dom"

export default function ClassLandingPage(){

    const [classes, setClasses] = useState([]);
    const [actionSelectedClass, setActionSelectedClass] = useState(null);
    const [viewModal, setViewModal] = useState(false);  
    const [editModal, setEditModal] = useState(false);
    const [teachers, setTeacher] = useState([]);
    const [subjects, setSubject] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/api/classes")
        .then((res) => {
            setClasses(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    

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

    // console.log(teachers)
    // console.log(subjects)

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}


    const handleView = (singleClass) => {
        setActionSelectedClass(singleClass)
        setViewModal(true)
        // alert("view button clicked on ", actionSelectedClass)
    }

             
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

    const handleEdit = (singleClass) => {
        setActionSelectedClass(singleClass)
        setEditModal(true)
        // alert("Edit button clicked on " , actionSelectedClass)
    }

    const handleEditChange = (e) => {
        const {name, value} = e.target;
        
        if (name === "teacher"){
          const selectedTeacher = teachers.find(t => t._id === value);

          setActionSelectedClass(prev => ({
            ...prev, 
            teacher: selectedTeacher
          }))
        }

          else {
            setActionSelectedClass( prev => ({
              ...prev,
              [name]: value
            }))
          }
        }
        

        

        
    


   const handleSubjectChange = (e) => {
    const {name,value} = e.target;
    

  const selectedOptions = Array.from(e.target.selectedOptions);
  const selectedSubjects = selectedOptions.map(opt =>
    subjects.find(sub => sub._id === opt.value)
  );
  setActionSelectedClass(prev => ({
    ...prev,
    subjects: selectedSubjects.filter(Boolean)
  }));
};


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedClass = actionSelectedClass

    await axios.put(`http://localhost:3000/api/classes/${updatedClass._id}`, updatedClass)
    .then(res => {
      console.log("Class updated:", res.data);
      setEditModal(false); // close modal
    })

    .catch(err => {
      console.error("Update failed:", err);
    });


    // There is a better way to do the above thing 
    // basically create a new payload and pass it to server to update
    // the info that needs to be updated instead of just passing the actionSelectedClass 
    const res = await axios.get("http://localhost:3000/api/classes")
    setClasses(res.data)
};
  


                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}


    const handleDelete = async (singleClass) => {
      const selectedClass = singleClass;
       const confirmed = window.confirm(`Delete class "${singleClass.name}"?`);
  if (!confirmed) return;

      await axios.delete(`http://localhost:3000/api/classes/${selectedClass._id}`);

      await axios.get("http://localhost:3000/api/classes")
    .then((res) => setClasses(res.data))
    .catch((err) => console.log(err));
};
    

    

    return (
        <>
            ClassLandingPage
            <Link to={"/AddNewClass"}>
            <button name="Add Class" value="Add Class"> Add Class
            </button>
            </Link>

            <div className="classes-table-container">
            <h2>All Classes</h2>
            <table className="classes-table">
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Teacher</th>
                        <th>Subject</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.length > 0 ? (
                        classes.map(singleClass => (
                            <tr key={singleClass._id}>
                                <td>{singleClass.name}</td>
                                <td>{singleClass.teacher?.name || 'N/A'}</td>
                                <td>{singleClass.subjects.map(sub => sub.name).join(', ')}</td>
                                <td>
                                    <button onClick={() => handleView(singleClass)} > View </button>
                                    <button onClick={() => handleEdit(singleClass)} > Edit </button>
                                    <button onClick={() => handleDelete(singleClass)} > Delete </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4"> No classes available </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
   




                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}

        {viewModal && actionSelectedClass && (
            <div className="modal-backdrop">
    <div className="modal-content">
      <h2>Class Details</h2>
      <p><strong>Class Name:</strong> {actionSelectedClass.name}</p>
      <p><strong>Teacher:</strong> {actionSelectedClass.teacher?.name || 'N/A'}</p>
      <p><strong>Subjects:</strong> {
        actionSelectedClass.subjects.length > 0
          ? actionSelectedClass.subjects.map(sub => sub.name).join(', ')
          : 'No subjects'
      }</p>

      {/* Optional: Add other info here */}

      <button onClick={() => setViewModal(false)}>Close</button>
    </div>
  </div>
        )}

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        {editModal && actionSelectedClass && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h2>Edit Class</h2>

      <form onSubmit={handleEditSubmit}>
        <label>Class Name:</label>
        <input
          type="text"
          name="name"
          value={actionSelectedClass.name}
          onChange={handleEditChange}
        />

        <label>Teacher:</label>
        <select
          name="teacher"
          value={actionSelectedClass.teacher?._id || ''}
          onChange={handleEditChange}
        >
          <option value="">Select Teacher</option>
          {Array.isArray(teachers) && teachers.map(teacher => (
            <option key={teacher._id} value={teacher._id} >
              {teacher.name}
            </option>
          ))}
        </select>

        <label>Subjects:</label>
        <select
          name="subjects"
          multiple
          value={actionSelectedClass.subjects.map(sub => sub._id)}
          onChange={handleSubjectChange}
        >
          {Array.isArray(subjects) && subjects.map(subject => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </select>

        <button type="submit">Save</button>
        <button type="button" onClick={() => setEditModal(false)}>Cancel</button>
      </form>
    </div>
  </div>
)}



        </>
    )
  }