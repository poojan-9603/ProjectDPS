import React, { useState, useEffect } from 'react';
import './TimetableModal.css';
import axios from 'axios';

export default function TimetableModal({ modalData, onClose, setRefreshToggle }) {
  const { day, time, entry, classId } = modalData;
  const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
  const [isEditing, setIsEditing] = useState(!entry); // true if adding
  const [formData, setFormData] = useState({
    subject: entry?.subject || '',
    teacher: entry?.teacher || '',
  });

  useEffect(() => {
          axios.get("http://localhost:3000/api/teachers")
              .then(res => {
                  setTeachers(res.data);
              })
              .catch(err => console.error(err));
      }, []);
  
      useEffect(() => {
          axios.get("http://localhost:3000/api/courses")
              .then(res => {
                  setSubjects(res.data);
              })
              .catch(err => console.error(err));
      }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    day,
    time,
    classId
  };

  if (entry) {
    // UPDATE
    axios.put(`http://localhost:3000/api/timetable/${entry._id}`, payload)
      .then(res => {
        // Update the parent timetable instantly
        setRefreshToggle(prev => !prev);
        onClose();
      })
      .catch(err => console.error("Error updating timetable entry:", err));
  } else {
    // ADD
    axios.post('http://localhost:3000/api/timetable', payload)
      .then(res => {
        // Add the new entry to parent timetable instantly
       setRefreshToggle(prev => !prev);
        onClose();
      })
      .catch(err => console.error("Error adding timetable entry:", err));
  }
};


  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3 className="modal-title">{entry ? 'View Slot' : 'Add New Slot'}</h3>
        <p><strong>Day:</strong> {day}</p>
        <p><strong>Time:</strong> {time}</p>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="timetable-form">
            <label>Subject:</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subj) => (
                <option key={subj._id || subj} value={subj._id || subj}>
                  {subj.name || subj}
                </option>
              ))}
            </select>

            <label>Teacher:</label>
            <select
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((teach) => (
                <option key={teach._id || teach} value={teach._id || teach}>
                  {teach.name || teach}
                </option>
              ))}
            </select>

            <div className="modal-buttons">
              <button type="submit" className="save-button">
                {entry ? 'Update' : 'Add'}
              </button>
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="view-mode">
            <p><strong>Subject:</strong> {entry.subject?.name || entry.subject}</p>
            <p><strong>Teacher:</strong> {entry.teacher?.name || entry.teacher}</p>
            <div className="modal-buttons">
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Edit
              </button>
              <button onClick={onClose} className="okay-button">
                Okay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
