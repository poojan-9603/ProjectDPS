import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddNewStudent.css'; // Assuming you have a CSS file for styling

export default function AddNewStudent() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    classId: '',
    subjects: [],
  });

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/classes')
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:3000/api/courses')
      .then(res => setSubjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setStudent(prev => ({ ...prev, subjects: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/students', student);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="add-student-container">
      <h1 className="add-student-title">Add New Student</h1>
      <Link to="/AdminDashboard"><button className="back-button">Back</button></Link>

      <form onSubmit={handleSubmit} className="student-form">
        <input
          className="student-input"
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
        />

        <input
          className="student-input"
          type="email"
          name="email"
          placeholder="Student Email"
          value={student.email}
          onChange={handleChange}
        />

        <label className="form-label">Class:</label>
        <select
          className="student-select"
          name="classId"
          value={student.classId}
          onChange={handleChange}
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls._id} value={cls._id}>{cls.name}</option>
          ))}
        </select>

        <label className="form-label">Subjects:</label>
        <select
          className="student-multiselect"
          multiple
          name="subjects"
          value={student.subjects}
          onChange={handleSubjectSelect}
        >
          {subjects.map(sub => (
            <option key={sub._id} value={sub._id}>{sub.name}</option>
          ))}
        </select>

        <button className="submit-button" type="submit">Add Student</button>
      </form>
    </div>
  );
}
