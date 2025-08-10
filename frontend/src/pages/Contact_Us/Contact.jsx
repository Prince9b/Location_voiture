import React from 'react'
import Navbar from '../../composants/Navbar/Navbar'
import './Contact.css'
import Footer from '../../composants/Footer/Footer'

export default function Contact() {
  return (
    <div>
        <Navbar />
        <br />
        <br />
        <div className="con-container">
          <div className="contact"></div>
          <h1>Contactez-nous</h1>
          <p>Numero : 60219104</p>
          <p>Email : DiscoversCars@gmail.com</p>
          <p>Votre confort notre preoccupation</p>
        </div>
          <br />
          <Footer />
    </div>
  )
}
