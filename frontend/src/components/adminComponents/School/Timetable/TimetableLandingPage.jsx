// TimetableLanding.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TimetableGrid from './TimetableGrid';
import './Timetable.css';
import { Link } from 'react-router-dom';

export default function TimetableLanding() {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/classes")
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      axios.get(`http://localhost:3000/api/timetable/${selectedClassId}`)
        .then(res => setTimetableData(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedClassId]);

  return (
    <div className="timetable-container">
        <Link to={"/AddNewTimetable"}> <button className="add-timetable-button">Add New Timetable Entry</button> </Link>
      <h2>Select a Class to View Timetable</h2>
      <select
        className="class-dropdown"
        value={selectedClassId}
        onChange={(e) => setSelectedClassId(e.target.value)}
      >
        <option value="">-- Select Class --</option>
        {classes.map(cls => (
          <option key={cls._id} value={cls._id}>{cls.name}</option>
        ))}
      </select>

      {selectedClassId && (
        <TimetableGrid timetable={timetableData} classId={selectedClassId} />
      )}
    </div>
  );
}
