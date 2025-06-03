import React from 'react'
import './Body.css'
import { Link } from 'react-router-dom'
import image from '../../assets/image-body.png'

export default function Body() {
  return (
    <div className='body'>
        <section className="body-container">
            <div className="details">
                <h1 className='title'>FACILE ET 
                    <br />
                    MOYEN RAPIDE
                    <br />
                    DE LOUER
                    <br />
                    VOTRE
                    <br />
                    VOITURE
                </h1>
                <p className='description'>Que vous prévoyiez un week-end Escapade ou aventure à travers le pays, nous avons
                    <br />
                    ce qu’il vous faut. Avec notre large sélection de véhicules et Système de
                    <br />
                    réservation pratique, la location d’une voiture n’a jamais été aussi facile</p>
                    
                    <div className="buttons">
                        <Link to='/voitures'><button className='btn-voitures'>Voitures</button></Link>
                        <Link to='/contact'><button className='btn-contact'>Contact Us</button></Link>
                    </div>
            </div>
            <div className="image">
                <img className='img' src={image} alt="image" />
            </div>
        </section>
        <hr color='black' style={{margin:20}} />
    </div>
  )
}
