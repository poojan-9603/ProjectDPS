import react from "react";
import axios from "axios";
import { useState } from "react";
import cors from "cors";
import './AddNewTeacher.css'; // Assuming you have a CSS file for styling

export default function AddNewTeacher() {


    const [formData, setFormData] = useState({
        name: '',
        // email: '',
        // subject: [],
        // class: [], 
    })

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        formPayload.append('name', formData.name);
        // formPayload.append('email', formData.email);
        // formPayload.append('subject', formData.subject);
        // formPayload.append('class', formData.class);
        if(file){
          formPayload.append('file', file)
          alert('File uploaded successfully');
        }

        axios.post('http://localhost:3000/api/teachers', formPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
    }

    const handleChange = (e) => {

        // if(e.target.multiple){
        //     const selectedOptions = Array.from(e.target.options)
        //     .filter(option => option.selected)
        //     .map(option => option.value);

        //     setFormData(prev => ({
        //         ...prev,
        //         [e.target.name]: selectedOptions,
        //     }))
        // } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            })
       // }
        
    }

    return (
    <div className="add-teacher-container">
      <h1 className="add-teacher-heading">Add New Teacher</h1>
      <form onSubmit={handleSubmit} className="add-teacher-form">
        <label className="form-label">Teacher name:</label>
        <input
          type="text"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
        />
        <input type="file" name="file" className="form-file" onChange={handleFileChange} />
        <button type="submit" className="form-button">Add Teacher</button>
      </form>
    </div>
  )
  }