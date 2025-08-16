import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.svg';
import { FaBars, FaTimes } from 'react-icons/fa';
import {CiLogout} from "react-icons/ci"
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(() => {
      logout();
      navigate('/');
      setMenuOpen(false);
    });
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="logo-container" contentEditable="false">
        <img className="logo" src={logo} alt="Logo" />
      </div>

      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <NavLink onClick={closeMenu} className="nav-link" to="/">Home</NavLink>
        <NavLink onClick={closeMenu} className="nav-link" to="/voitures">Voitures</NavLink>
        <NavLink onClick={closeMenu} className="nav-link" to="/emplacement">Emplacement</NavLink>
        <NavLink onClick={closeMenu} className="nav-link" to="/contact">Contactez-nous</NavLink>
        

        {user ? (
          <>
            <Link onClick={closeMenu} to="/mesreservation" className="btn-reservation">Mes Réservations</Link>
            <CiLogout onClick={handleLogout} className='btn-logoutt' color='orange' size={30}/>
          </>
        ) : (
          <>
            <Link onClick={closeMenu} to="/login" className="btn-link">Connexion</Link>
            <Link onClick={closeMenu} to="/register" className="btn-link">Inscription</Link>
          </>
        )}
      </nav>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
};

export default Navbar;
