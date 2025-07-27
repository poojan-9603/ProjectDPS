import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { set } from 'mongoose';

export default function CourseLandingPage() {

const [courses, setCourses] = useState([]);
const navigate = useNavigate();
const [teachers, setTeachers] = useState([]);
const [classes, setClasses] = useState([]);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(null);
 

useEffect(() => {
    axios.get('http://localhost:3000/api/courses') // Adjust API route if needed
      .then(res => {setCourses(res.data)})
      .catch(err => console.error('Error fetching courses:', err));
  }, []);

useEffect(() => {
    axios.get('http://localhost:3000/api/teachers')
        .then(res => setTeachers(res.data))

        .catch(err => console.error('Error fetching teachers:', err));
}, []);

useEffect(() => {
    axios.get('http://localhost:3000/api/classes')
    .then(res => setClasses(res.data))
    .catch(err => console.error('Error fetching classes:', err));
}, []);
// console.log("Courses:", classes);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:3000/api/courses/${id}`);
        setCourses(prev => prev.filter(course => course._id !== id));
      } catch (err) {
        console.error('Error deleting course:', err);
      }
    }
  };

  const handleEdit = (course) => {
    setIsEditModalOpen(true);
    setSelectedCourse(course);
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === 'teacher') {
        const selectedTeacher = teachers.find(t => t._id === value);
        setSelectedCourse((prev) => ({
            ...prev,
            teacher: selectedTeacher
        }));
    }
    else{

    setSelectedCourse((prev) => ({
        ...prev,
        [name]: value
    }))}
}

    const handleEditSubmit = async (e) => {
    e.preventDefault();
    

        axios.put(`http://localhost:3000/api/courses/${selectedCourse._id}`, selectedCourse)
        .then(() => {
            setIsEditModalOpen(false);
            axios.get("http://localhost:3000/api/courses").then(res => setCourses(res.data));

        })
        .catch(err => console.error('Error updating course:', err));
    }
    



    return (
        <>
        <div>
            <h1>Course Landing Page</h1>
            <p>Welcome to the Course Landing Page!</p>
            {/* Additional content can be added here */}
        </div>


    <div>
      <h2>📘 Course List</h2>
      <Link to="/AddNewCourse"><button>➕ Add New Course</button></Link>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Teachers</th>
            <th>Classes</th>
            <th>Description</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map(course => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>
                  {course.teacher?.map((t, idx) => (
                    <span key={idx}>{t.name || t} {idx < course.teacher.length - 1 ? ', ' : ''}</span>
                  ))}
                </td>
                <td>
                    {course.classes?.map((cls, idx) => (
                        <span key={idx}>{cls.name || cls} {idx < course.classes.length - 1 ? ', ' : ''}</span>

                    ))}
                </td>
                <td>{course.description}</td>
                <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(course)}>✏️ Edit</button>{' '}
                  <button onClick={() => handleDelete(course._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No courses available.</td></tr>
          )}
        </tbody>
      </table>


      
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div style={modalStyle}>
          <h3>Edit Course</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="name"
              value={selectedCourse.name}
              onChange={handleEditChange}
              placeholder="Course Name"
            />
            <select
              name="teacher"
              value={selectedCourse.teacher?._id || ''}
              onChange={handleEditChange}
            >
              <option value=""> Pick a Teacher</option>
              {Array.isArray(teachers) && teachers.map(t => (
                <option key={t._id} value={t._id}>
                    {t.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="description"
              value={selectedCourse.description}
              onChange={handleEditChange}
              placeholder="Description"
            />
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>

        </>

    );

};
    
const modalStyle = {
  position: "fixed",
  top: "20%",
  left: "35%",
  background: "#fff",
  border: "1px solid #ccc",
  padding: "20px",
  zIndex: 1000,
}




  

