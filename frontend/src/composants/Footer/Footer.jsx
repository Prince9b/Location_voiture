import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='container'>
    <footer className="footer">
      <div className="liens">
          <h3>Liens utiles</h3>
          <a><Link to="/">Accueil</Link></a>
          <a><Link to="/voitures">Nos voitures</Link></a>
          <a><Link to="/contact">Contact</Link></a>
      </div>
      <div className="d2">
        <h3>Contact</h3>
        <p>Email : contact@disciverscars.com</p>
        <p>Téléphone : +223 60219104</p>
        <p>Adresse : Bamako, Mali</p>
      </div>
      <div className="reseaux">
        <h3>Nos réseaux</h3>
        <a href="/">Github</a>
        <a href="/">Fb</a>
        <a href="/">Pt</a>
      </div> 
      <div className="reseaux">
        <h3>Nos réseaux</h3>
        <a href="/">Github</a>
        <a href="/">Fb</a>
        <a href="/">Pt</a>
      </div>           
    </footer>
      <p className='f1'>&copy; 2025 DisciversCars. Tous droits réservés.</p>
    </div>
  )
}
