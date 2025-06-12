import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Nav.css'

export default function Nav() {
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    const token = localStorage.getItem('admin_token');

    await axios.post('http://localhost:8000/api/admin/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });

    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  } catch (err) {
    console.error("Erreur lors de la déconnexion :", err.response?.data || err.message);
  }
};


  return (
    <div className='nav1'>
        <div className='nav1-container'>
            <h3>Admin</h3>
            <div className="nav1">
                <ul className='nav1-menu'>
                  <li><Link to='/admin/dashboard'>Dashboard</Link></li>
                  <li><Link to='/admin/dashboard/users'>Users</Link></li>
                  <li><Link to='/admin/dashboard/voitures'>Voitures</Link></li>
                  <li><Link to='/admin/dashboard/reservations'>Réservations</Link></li>
                </ul>
            <button className='bt-logout' onClick={handleLogout}>
                Se déconnecter
            </button>     
         </div>
      </div>
    </div>
  );
}
      