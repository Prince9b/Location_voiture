import React from 'react';
import { useAuth } from '../../AuthContext';
import { Link, useNavigate, } from 'react-router-dom';
import './Navbar.css'; 
import logo from '../../assets/logo.svg'; 

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
      navigate('/');
    });
  };

  return (
    <header className="header">
        <div className="logo-container" contentEditable="false">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <nav className="navbar">
                  <a className='a'><Link to='/'>Home</Link></a>
                  <a className='a'><Link to='/voitures'>Voitures</Link></a>
                  <a className='a'><Link to='/emplacement'>Emplacement</Link></a>
                  <a className='a'><Link to='/contact'>Contactez-nous</Link></a>
        {user ? (
          <>
            <Link to='/mesreservation' className='btn-reservation'>Mes Réservations</Link>
            <button onClick={handleLogout}>
              Déconnexion
            </button>
            <span>{user.name}</span>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>
              Connexion
            </button>
            <button onClick={() => navigate('/register')}>
              Inscription
            </button>
          </>
        )}
        </nav>
    </header>
  );
};

export default Navbar;
