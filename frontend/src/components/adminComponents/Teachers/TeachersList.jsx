import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { use } from 'react'
import './TeachersList.css'; // Assuming you have a CSS file for styling




export default function TeachersList() {

    const [teachers, setTeachers] = useState([])
    const [isAllTeachers, setIsAllTeachers] = useState(true);
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [actionSelectedTeacher, setActionSelectedTeacher] = useState(null);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);





    useEffect(() => {
        axios.get("http://localhost:3000/api/teachers")
            .then((res) => {
                // console.log(res.data) //res.data is the array of teachers that we get from the backend, we can use this array to display the teachers inf
                setTeachers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/api/classes")
            .then((res) => {
                setClasses(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/api/courses")
            .then((res) => {
                setSubjects(res.data)
            })
            .catch((err) => {
                console.log(err)
            })}, [])



    const handleView = (teacher) => {
        setViewModal(true);
        setActionSelectedTeacher(teacher);

    }
    


    const handleEdit = (teacher) => {
        setEditModal(true);
        setActionSelectedTeacher(teacher);
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;

        const selectedOptions = Array.from(e.target.selectedOptions);

        const selectedClasses = selectedOptions.map(option => (
            classes.find(sub => sub._id === option.value)

        ))

        setActionSelectedTeacher(prev => ({
            ...prev,
            classes: selectedClasses,
        }));       
        console.log("Selected Classes:", actionSelectedTeacher);
    }


    const handleSubjectChange = (e) => {
        const { name, value } = e.target;
        const selectedOptions = Array.from(e.target.selectedOptions);

        const selectedSubjects = selectedOptions.map(option => (
            subjects.find(sub => sub._id === option.value)
        ));
        setActionSelectedTeacher(prev => ({
            ...prev,
            subjects: selectedSubjects,
        }));
        console.log("Selected Subjects:", selectedSubjects);
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const updatedTeacher = actionSelectedTeacher
        console.log("Updated Teacher:", updatedTeacher);

        await axios.put(`http://localhost:3000/api/teachers/${updatedTeacher._id}`, updatedTeacher)
        .then(res => {
      console.log("Teacher updated:", res.data);
      setEditModal(false); // close modal
    })

    .catch(err => {
      console.error("Update failed:", err);})

        const teacherRes = await axios.get("http://localhost:3000/api/teachers")
        setTeachers(teacherRes.data);

        const classRes = await axios.get("http://localhost:3000/api/classes")
        setClasses(classRes.data);  

        const subjectRes = await axios.get("http://localhost:3000/api/courses")
        setSubjects(subjectRes.data);
    }


    const handleDelete = async (teacher) => {
        if (window.confirm("Are you sure you want to delete this teacher?")) {
            try {
                await axios.delete('http://localhost:3000/api/teachers/' + teacher._id);
                setTeachers(prevTeachers => prevTeachers.filter(t => t._id !== teacher._id));
            } catch (error) {
                console.error("Error deleting teacher:", error);
                alert("Failed to delete teacher. Please try again.");   
            }
    }}



    if (isAllTeachers) {
        return (
            <>

            <div className="teachers-container">
    <h1 className="teachers-title">Teachers List</h1>
    <div className="teachers-actions">
      <button onClick={() => setIsAllTeachers(prev => !prev)} className="toggle-view-button">Switch View</button>
      <Link to={"/AddNewTeacher"}><button className="add-teacher-button">Add New Teacher</button></Link>
    </div>
    </div>
            
                <p> All Teachers Views </p>


                <p>All Teachers (Table View)</p>
                <table className="teachers-table" border="1" cellPadding="8" cellSpacing="0">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Subjects</th>
      <th>Classes</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {teachers.map(teacher => (
      <tr key={teacher._id}>
        <td>{teacher.name}</td>
        <td>{teacher.email}</td>
        <td>{teacher.subjects.length > 0 ? teacher.subjects.map(subject => subject.name).join(', ') : <Link to={"/AddNewCourse"}>Add Subject</Link>}</td>
        <td>{teacher.classes.length > 0 ? teacher.classes.map(c => c.name).join(', ') : <Link to={"/AddNewClass"}>Add Class</Link>}</td>
        <td className="teachers-actions-buttons">
          <button onClick={() => handleView(teacher)}>View</button>
          <button onClick={() => handleEdit(teacher)}>Edit</button>
          <button onClick={() => handleDelete(teacher)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>



                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}

                {viewModal && actionSelectedTeacher && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h2 className="modal-title">Teacher Details</h2>
      <p><strong>Teacher Name:</strong> {actionSelectedTeacher.name}</p>
      <p><strong>Class:</strong> ...</p>
      <p><strong>Subjects:</strong> ...</p>
      <button onClick={() => setViewModal(false)} className="modal-close">Close</button>
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



                {editModal && actionSelectedTeacher && (
                    <div className="modal-backdrop">
                        <div className="modal-content">
                            <h2>Edit Teacher</h2>

                            <form onSubmit={handleEditSubmit}>
                                <label>Teacher Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={actionSelectedTeacher.name}
                                    onChange={handleEditChange}
                                />

                                <label>Class:</label>
                                <select
                                    name="classes"
                                    multiple
                                    value={actionSelectedTeacher.classes.map(cls => cls._id) || ''}
                                    onChange={handleEditChange}
                                >
                                    <option value="">Select Class</option>
                                    {Array.isArray(classes) && classes.map(cls => (
                                        <option key={cls._id} value={cls._id} >
                                            {cls.name}
                                        </option>
                                    ))}
                                </select>

                                <label>Subjects:</label>
                                <select
                                    name="subjects"
                                    multiple
                                    value={actionSelectedTeacher.subjects.map(sub => sub._id)}
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
    else {
        return (
            <>
                <Link to={"/AddNewTeacher"}>
                    <button>Add New Teacher</button>
                </Link>
                <button name="viewToggleButton" value="viewToggleButton" onClick={() => setIsAllTeachers(prev => !prev)}> Switch view </button>
                <h1>Teachers List</h1>
                <p>
                    Card Views
                </p>
            </>
        )
    }
}