import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom"
import GlobalStyle from "./GlobalStyle"
import Login from "./pages/Login"
import LogoIcon from "./assets/icons/logo-full.svg"
import Register from "./pages/Patient/Register"
import Appointment from "./pages/Patient/Appointment"
import Success from "./pages/Patient/Success"
import AppointmentAdmin from "./pages/Admin/Appointments"
import DoctorAdmin from "./pages/Admin/Doctor"
import PatientProfileAdmin from "./pages/Admin/PatientProfile"
import AppointmentHistory from "./pages/Patient/History"
import Profile from "./pages/Patient/Profile"
import ProfileForm from "./pages/Patient/PatientProfile"
import { UserProvider } from "./UserContextProvider"
import { useState } from "react"
import UserIcon from "./assets/icons/user.svg";
import axios from "axios"
import config from "./Config"
function App() {
  const [role, setRole] = useState<string>()
  const [showMenu, setMenu] = useState(false);
  const logOut = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/User/logout`, {withCredentials: true});
      if (response.status === 200) window.location.href = "/login"
    }
    catch(error) {
      console.log(error)
    }
  }
  return ( 
    <UserProvider setUserRole={setRole}>
      <BrowserRouter>
          <GlobalStyle/>
          <div className="logo">
            <a href="/">
              <img src={LogoIcon}/>
            </a>
            {role === "Patient" && 
              <div className="menu">
                <a href="/appointment">Đặt lịch khám</a>
                <a href="/history">Lịch sử đặt lịch</a>
                <section style={{position: "relative"}}>
                  <img src={UserIcon} alt="user" id="user-icon" onClick={() => setMenu(prev => !prev)}/>
                  {showMenu && 
                    <div className="user-menu">
                      <a href="/patient/profile">Hồ sơ bệnh nhân</a>
                      <span onClick={() => {setMenu(prev => !prev); logOut()}}>Đăng xuất</span>
                    </div>}
                </section>
              </div>}
            {role === "Admin" && 
              <div className="menu">
                <a href="/admin/appointments">Lịch hẹn khám</a>
                <a href="/admin/doctors">Bác sĩ</a>
                <a href="/admin/profiles">Hồ sơ bệnh nhân</a>
              </div>}
            </div>
          <Routes>
           {role &&  <Route path="/" element={role === "Patient" ? <Navigate to="/history"/> : role === "Admin" ? <Navigate to="/admin/appointments"/> : <Navigate to="/login"/>}/>}
            <Route path="/login" element={<Login setRole={setRole}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<ProfileForm/>}/>
            <Route path="/appointment" element={<Appointment/>}/>
            <Route path="/success/:id" element={<Success/>}/>
            <Route path="/admin/appointments" element={<AppointmentAdmin/>}/>
            <Route path="/admin/doctors" element={<DoctorAdmin/>}/>
            <Route path="/admin/profiles" element={<PatientProfileAdmin/>}/>
            <Route path="/history" element={<AppointmentHistory/>}/>
            <Route path="/patient/profile" element={<Profile/>}/>
          </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
