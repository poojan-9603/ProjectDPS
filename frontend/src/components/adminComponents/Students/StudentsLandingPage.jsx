import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './StudentsLandingPage.css'; // Assuming you have a CSS file for styling

export default function StudentsLanding() {
  const [students, setStudents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchStudents();
    axios.get('http://localhost:3000/api/courses').then(res => setSubjects(res.data));
    axios.get('http://localhost:3000/api/classes').then(res => setClasses(res.data));
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/students');
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (student) => {
    setIsEditModalOpen(true);
    setSelectedStudent(student);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent(prev => ({
      ...prev,
      [name]: name === 'class' ? { _id: value } : value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedStudent = {
      ...selectedStudent,
      class: selectedStudent.class?._id ? { _id: selectedStudent.class._id } : null,
      subjects: selectedStudent.subjects.map(sub => ({ _id: sub._id }))
    };

    try {
      await axios.put(`http://localhost:3000/api/students/${selectedStudent._id}`, updatedStudent);
      setIsEditModalOpen(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const handleSubjectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    const selectedSubjects = subjects.filter(sub => selectedOptions.includes(sub._id));
    setSelectedStudent(prev => ({ ...prev, subjects: selectedSubjects }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="students-container">
      <h1 className="students-title">📚 Student List</h1>
      <div className="students-actions">
        <Link to="/AdminDashboard"><button className="students-btn">Back</button></Link>
        <Link to="/AddNewStudent"><button className="students-btn add">Add New Student</button></Link>
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="5">No students found.</td></tr>
          ) : (
            students.map(st => (
              <tr key={st._id}>
                <td>{st.name}</td>
                <td>{st.email}</td>
                <td>{st.class?.name || 'N/A'}</td>
                <td>{st.subjects?.map(sub => sub.name).join(", ") || 'N/A'}</td>
                <td>
                  <button className="students-btn small" onClick={() => handleEdit(st)}>Edit</button>
                  <button className="students-btn small delete" onClick={() => handleDelete(st._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isEditModalOpen && selectedStudent && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Edit Student</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Student Name:</label>
              <input type="text" name="name" value={selectedStudent.name} onChange={handleEditChange} />

              <label>Student Email:</label>
              <input type="email" name="email" value={selectedStudent.email} onChange={handleEditChange} />

              <label>Class:</label>
              <select name="class" value={selectedStudent.class?._id || ''} onChange={handleEditChange}>
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls._id} value={cls._id}>{cls.name}</option>
                ))}
              </select>

              <label>Subjects:</label>
              <select multiple name="subjects" value={selectedStudent.subjects.map(sub => sub._id)} onChange={handleSubjectChange}>
                {subjects.map(subject => (
                  <option key={subject._id} value={subject._id}>{subject.name}</option>
                ))}
              </select>

              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
