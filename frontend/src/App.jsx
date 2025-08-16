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
import VoituresPage from './pages/Amin/Dashboard/VoituresPage'
import UsersPage from './pages/Amin/Dashboard/UsersPage'
import Details from './pages/Details/Details'
import Reservation from './pages/Amin/Dashboard/Reservation'
import MesReservations from './pages/MesReservations/MesReservations'

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
        <Route path='/details/:id' element={<Details/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/mesreservation' element={<MesReservations/>} />
        <Route path='/admin' element={<LoginAdmin/>} />
        
        <Route path='/admin/dashboard' element={
          <AdminRoute>
            <AdminDashboard/>
          </AdminRoute>
        } />
        <Route path='/admin/dashboard/voitures' element={
          <AdminRoute>
            <VoituresPage/>
          </AdminRoute>
        } />

        <Route path='/admin/dashboard/users' element={
          <AdminRoute>
            <UsersPage/>
          </AdminRoute>
        } />

        <Route path='/admin/dashboard/reservations' element={
          <AdminRoute>
            <Reservation/>
          </AdminRoute>
        } />

      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
