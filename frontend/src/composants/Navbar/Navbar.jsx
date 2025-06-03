import React from 'react';
import { useAuth } from '../../AuthContext';
import { Link, useNavigate, } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(() => {
      logout();
      navigate('/login');
    });
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <img className='logo' src="" alt="logo" />
        <div className="nav">
                <ul className='navbar-menu'>
                  <li><Link to='/'>Acceuil</Link></li>
                  <li><Link to='/voitures'>Voitures</Link></li>
                  <li><Link to='/emplacement'>Emplacement</Link></li>
                  <li><Link to='/contact'>Contactez-nous</Link></li>
                </ul>
        {user ? (
          <>
            <span>Bienvenue, {user.name}</span>
            <button onClick={handleLogout} className="bt-logout">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="btn-login">
              Connexion
            </button>
            <button onClick={() => navigate('/register')} className="btn-register">
              Inscription
            </button>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
