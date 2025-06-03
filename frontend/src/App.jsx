import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import LoginAdmin from './pages/Amin/Login/LoginAdmin'
import AdminRoute from './pages/Amin/Login/AdminRoute'
import AdminDashboard from './pages/Amin/Dashboard/AdminDashboard'
import Voitures from './pages/Voitures/Voitures'
import Contact from './pages/Contact_Us/Contact'
import Emplacement from './pages/Emplacement/Emplacement'
import { AuthProvider } from './AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/emplacement' element={<Emplacement/>} />
        <Route path='/voitures' element={<Voitures/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/admin/login' element={<LoginAdmin/>} />
        <Route path='/admin/dashboard' element={
          <AdminRoute>
            <AdminDashboard/>  
          </AdminRoute>
        } />
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
