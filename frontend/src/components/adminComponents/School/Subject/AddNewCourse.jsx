// AddNewCourse.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseStyle.css';

export default function AddNewCourse() {
  const [course, setCourse] = useState({
    courseName: '',
    courseTeacher: '',
    courseDescription: '',
  });

  const [teacher, setTeacher] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/teachers')
      .then((res) => setTeacher(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/courses', course);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "AddNewTeacher") {
      navigate("/AddNewTeacher");
    }
    setCourse({ ...course, [name]: value });
  };

  return (
    <div className="add-course-container">
      <h1 className="form-title">📘 Add New Course</h1>
      <Link to="/AdminDashboard"><button className="back-button">⬅ Back</button></Link>

      <form onSubmit={handleSubmit} className="course-form">
        <input
          type="text"
          name="courseName"
          value={course.courseName}
          placeholder="Course Name"
          onChange={handleChange}
          className="form-input"
        />

        <label>Teacher:</label>
        <select
          name="courseTeacher"
          value={course.courseTeacher}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Pick a Teacher</option>
          {teacher.map(t => (
            <option value={t._id} key={t._id}>{t.name}</option>
          ))}
          <option value="AddNewTeacher">➕ Add New Teacher</option>
        </select>

        <input
          onChange={handleChange}
          type="text"
          name="courseDescription"
          value={course.courseDescription}
          placeholder="Course Description"
          className="form-input"
        />

        <button type="submit" className="submit-button">Add Course</button>
      </form>
    </div>
  );
}
