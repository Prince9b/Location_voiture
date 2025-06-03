import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
        <footer class="footer">
        <div class="container">
    <div class="footer-section about">
      <h2>DisciversCars</h2>
      <p>Votre partenaire de confiance pour la location de voitures, offrant des services fiables et rapides.</p>
    </div>

    <div class="footer-section links">
      <h3>Liens utiles</h3>
      <ul>
        <li><Link to='/'>Acceuil</Link></li>
        <Link to='/voitures'>Nos voitures</Link>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div class="footer-section contact">
      <h3>Contactez-nous</h3>
      <p>Email : contact@disciverscars.com</p>
      <p>Téléphone : +228 90 00 00 00</p>
      <p>Adresse : Lomé, Togo</p>
    </div>
  </div>

  <div class="footer-bottom">
    &copy; 2025 DisciversCars. Tous droits réservés.
  </div>
</footer>

    </div>
  )
}
