import react from "react";
import axios from "axios";
import { useState } from "react";
import cors from "cors";

export default function AddNewTeacher() {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
        formPayload.append('email', formData.email);
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
        console.log(formData);
        
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
        console.log(formData);
    }

    return (
    
      <>
        <h1>Add New Teacher</h1>
        <form onSubmit={handleSubmit} >

          <label> Teacher name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}/>

          <label> Teacher email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}/>

          {/* <label> Teacher subject: </label>
          <select multiple name="subject" value={formData.subject} onChange={handleChange}>
            <option> Math </option>
            <option> English </option>
            <option> Science </option>
            <option> History </option>
          </select>

          <label> Teacher class: </label>
          <select multiple name="class" value={formData.class} onChange={handleChange}>
            <option> Class 1 </option>
            <option> Class 2 </option>
            <option> Class 3 </option>
            <option> Class 4 </option>
          </select> */}
          
          <input type="file" name="file" onChange={handleFileChange}/>

          <button type="submit"> Add Teacher </button>

          

        </form>
      </>

    )
  }