import react from 'react';
import './Timetable.css';
import { useEffect , useState} from 'react';
import axios from 'axios';
import { set } from 'mongoose';
import e from 'cors';
import { useNavigate } from 'react-router-dom';

export default function AddNewTimetable() {

    const navigate = useNavigate(); 

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"];
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [formData, setFormData] = useState({
        classId: "",
        entries: [
            {
                period: "",
                day: "",
                time: "",
                subject: "",
                teacher: ""
            }
        ],
    }
    );


    useEffect(() => {
        axios.get("http://localhost:3000/api/classes")
            .then(res => {
                setClasses(res.data);
            })
            .catch(err => console.error(err));  

    }, []);

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
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/timetable', formData);
      alert("Timetable entry added successfully!");
      setFormData({ day: "", time: "", subject: "", teacher: "" });
      navigate('/Timetable'); // Redirect to TimetableLandingPage after successful submission
    } catch (error) {
        console.log("Timetable entry added successfully:", formData);
      console.error(error);
      alert("Failed to add timetable entry");
    }
  };


    return (
        <div className="add-new-timetable">
            <h2>Add New Timetable</h2>
            <form onSubmit={handleSubmit} className="timetable-form">
                <label>
                    Class:
                    <select onChange={handleChange} name="classId" value={formData?.classId || ''}>
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>{cls.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Period:
                    <input type="number" name='period' min="1" max="10" placeholder="Enter period number" onChange={handleChange}/>  
                </label>
                <label>
                    Day:
                    <select onChange={handleChange} name="day" value={formData?.day || ''}>
                        <option value="">Select Day</option>
                        {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Time:
                    <select onChange={handleChange} name="time" value={formData?.time || ''}>
                        <option value="">Select Time</option>
                        {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Subject:
                    <select onChange={handleChange} name="subject" value={formData?.subject || ''}>
                        <option value="">Select Subject</option>
                        {subjects.map(sub => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Teacher:
                    <select onChange={handleChange} name="teacher" value={formData?.teacher || ''}>
                        <option value="">Select Teacher</option>
                        {teachers.map(teacher => (
                            <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Timetable Entry</button>
            </form>
        </div>
    );
}