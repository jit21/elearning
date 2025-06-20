

import './App.css'
import { Routes,Route } from 'react-router-dom'
import Footer from './Components/Footer.jsx'
import HomeLayout from './Layout/HomeLayout.jsx'
import HomePage from './Pages/HomePage.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import NotFound from './Pages/NotFound.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import CourseList from './Pages/Course/CourseList.jsx'
import Contact from './Pages/Contact.jsx'
import Denied from './Pages/Denied.jsx'
import CourseDescription from './Pages/Course/CourseDescription.jsx'
import RequireAuth from './Components/Auth/RequireAuth.jsx'
import CreateCourse from './Pages/Course/CreateCourse.jsx'
import Profile from './Pages/User/Profile.jsx'
import EditProfile from './Pages/User/EditProfile.jsx'
import Checkout from './Pages/Payments/Checkout.jsx'
import CheckoutSuccess from './Pages/Payments/CheckoutSuccess.jsx'
import CheckoutFailure from './Pages/Payments/CheckoutFail.jsx'
import Displaylectures from './Pages/Dashboard/Displaylectures.jsx'
import AddLecture from './Pages/Dashboard/Addlecture.jsx'
import AdminDashboard from './Pages/Dashboard/AdminDashboard.jsx'
import ChangePassword from './Pages/User/ChangePassword.jsx'
import ForgotPassword from './ForgetPassword.jsx'
import ResetPassword from './ResetPassword.jsx'
function App() {
  

  return (
    <>
   
   <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/about" element={<AboutUs/>}></Route>
    <Route path="/courses" element={<CourseList/>}></Route>

    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/forget-password' element={<ForgotPassword/>}></Route>
    <Route path='/reset-password/:token' element={<ResetPassword/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    
    <Route path='/denied' element={<Denied/>}></Route>
    <Route path='/courses/description' element={<CourseDescription/>}></Route>
    <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
      <Route path='/course/create' element={<CreateCourse/>}></Route>
      <Route path='/course/addlecture' element={<AddLecture/>}></Route>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

    </Route>
    <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
    <Route path='/user/profile' element={<Profile/>}></Route>
    <Route path='/user/editprofile' element={<EditProfile/>}></Route>
    <Route path='/checkout' element={<Checkout/>}></Route>
    <Route path='/checkout/success' element={<CheckoutSuccess/>}></Route>
    <Route path='/checkout/fail' element={<CheckoutFailure/>}></Route>
    <Route path='/course/displaylectures' element={<Displaylectures/>}></Route> 
    <Route path='/changepassword' element={<ChangePassword/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>

    </Route>

    <Route path='*' element={<NotFound/>}></Route>


   </Routes>
      
    
    </>
  )
}

export default App
