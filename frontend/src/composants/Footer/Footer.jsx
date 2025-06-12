import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>DisciversCars</h2>
          <p>Location de voitures rapide, simple et fiable à Bamako et partout au Mali.</p>
        </div>

        <div className="footer-section">
          <h3>Liens utiles</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/voitures">Nos voitures</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email : contact@disciverscars.com</p>
          <p>Téléphone : +223 60219104</p>
          <p>Adresse : Bamako, Mali</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 DisciversCars. Tous droits réservés.
      </div>
    </footer>
  )
}
