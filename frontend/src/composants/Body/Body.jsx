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
        <br />
        <br />
        <section className="body-container2">
            <div className="details2">
                <h1 className='title2'>Pourquoi nous choisir ?</h1>
                <p className='description2'>Nous Donnez la priorité à votre satisfaction et efforcez-vous de rendre votre expérience de location de voiture aussi transparente que possible. <br /> Grâce à notre large sélection de véhicules bien entretenus, à nos prix compétitifs et à notre processus de réservation simple, <br /> Vous pouvez nous faire confiance pour répondre à vos besoins. Notre équipe de service à la clientèle dédiée est disponible partout dans le monde. <br /> Clock pour vous aider, en veillant à ce que vous receviez le soutien que vous méritez. Que vous ayez besoin d’une voiture pour un <br /> Escapade d’un week-end ou un long voyage en voiture, choisissez-nous pour un voyage agréable et sans tracas..</p>
            </div>
        </section>
              <br />
              <br />  
    </div>
  )
}
