import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import LoginPage from "./loginPage/LoginPage"
import CreateAccount from "./loginPage/CreateAccount"
import AdminDashboard from "../components/adminComponents/AdminDashboard"
import AddNewTeacher from "../components/adminComponents/Teachers/AddNewTeacher"
import TeachersList from "../components/adminComponents/Teachers/TeachersList"
import AddNewClass from "./adminComponents/School/AddNewClass"
import AddNewCourse from "./adminComponents/School/AddNewCourse"
// import AllTeachers from "../components/adminComponents/Teachers/TeachersListViewsType/AllTeachers"
// import BySubjects from "../components/adminComponents/Teachers/TeachersListViewsType/BySubjects"
// import AddNewStudent from "./studentDashboard/studentManagement/AddNewStudent"
// import AddNewClass from "./studentDashboard/classManagement/AddNewClass"
// import AddNewCourse from "./studentDashboard/courseManagement/AddNewCourse"
// import AddNewActivity from "./studentDashboard/activityManagement/AddNewActivity"
// import MakeAnAnnouncement from "./studentDashboard/announcementManagement/MakeAnAnnouncement"
// import AddNewExam from "./studentDashboard/examManagement/AddNewExam"


export default function Home() {
    return (
        <> 
         <Router> 
     
            <Routes>
                <Route path="/" element={
                    <>
                        <p> Welcome to DPS school </p>
                        <Link to="/LoginPage">Login</Link> | 
                        <Link to="/CreateAccount">Create Account</Link> 
                    </> 
                    }
                />  
                <Route path="/LoginPage" element={<LoginPage/>}/>
                <Route path="/CreateAccount" element={<CreateAccount/>}/>
                <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
                <Route path="/AddNewTeacher" element={<AddNewTeacher/>}/>
                <Route path="/TeachersList" element={<TeachersList/>}/>
                <Route path="/AddNewClass" element={<AddNewClass/>}/>
                <Route path="/AddNewCourse" element={<AddNewCourse/>}/>
                {/* <Route path="/TeachersList/AllTeachers" element={<AllTeachers />} />
                <Route path="/TeachersList/BySubjects" element={<BySubjects />} /> */}
                {/* <Route path="/AddNewStudent" element={<AddNewStudent/>}/>
                <Route path="/AddNewClass" element={<AddNewClass/>}/>
                <Route path="/AddNewCourse" element={<AddNewCourse/>}/>
                <Route path="/AddNewActivity" element={<AddNewActivity/>}/>
                <Route path="/MakeAnAnnouncement" element={<MakeAnAnnouncement/>}/> 
                <Route path="/AddNewExam" element={<AddNewExam/>}/>      */}

                
            </Routes>
        </Router>
        
        </>
    )
}