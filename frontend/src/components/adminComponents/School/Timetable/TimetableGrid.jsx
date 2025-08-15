
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Timetable.css";
import TimetableModal from "./TimetableModal.jsx";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"];

export default function TimetableGrid({ classId }) {
  const [modalData, setModalData] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false);

  // Fetch timetable when component mounts
  useEffect(() => {
    if (!classId) return;

    axios
      .get(`http://localhost:3000/api/timetable/${classId}`)
      .then((res) => {
        setSelectedClass(res.data); // res.data should be the object with .entries
      })
      .catch((err) => console.error("Error fetching timetable data:", err));
  }, [classId, refreshToggle]);

  const openModal = (day, time, entry) => {
    setModalData({
      day,
      time,
      entry, // null for add or the slot object for edit
      classId,
    });
  };

  const closeModal = () => setModalData(null);

  return (
    <div className="timetable-grid">
      <table>
        <thead>
          <tr>
            <th>Day / Time</th>
            {timeSlots.map((time) => (
              <th key={time}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td>
                <strong>{day}</strong>
              </td>
              {timeSlots.map((time) => {
                // Find matching entry for this day & time
                const matchingEntry = selectedClass?.entries?.find(
                  (slot) => slot.day === day && slot.time === time
                );

                return (
                  <td key={time}>
                    {matchingEntry ? (
                      <div
                        className="timetable-cell"
                        onClick={() => openModal(day, time, matchingEntry)}
                      >
                        <div className="subject">
                          {matchingEntry.subject?.name || "No Subject"}
                        </div>
                        <div className="teacher">
                          ({matchingEntry.teacher?.name || "No Teacher"})
                        </div>
                      </div>
                    ) : (
                      <button
                        className="add-slot-button"
                        onClick={() => openModal(day, time, null)}
                      >
                        Add
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <TimetableModal modalData={modalData} onClose={closeModal} setRefreshToggle={setRefreshToggle}/>
      )}
    </div>
  );
}
