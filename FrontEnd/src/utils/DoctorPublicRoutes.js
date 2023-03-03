import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const DoctorPublicRoutes = () => {

const doctorToken = JSON.parse(localStorage.getItem('doctorToken'))

return (

    doctorToken ? <Navigate to="/doctor"/> :  <Outlet/>
)
   

}

export default DoctorPublicRoutes