import React from 'react'
import './Body.css'
import { Link } from 'react-router-dom'
import image from '../../assets/image-body.png'
import { motion } from 'framer-motion'

export default function Body() {
  return (
    <div className='body'>

      <section className="body-container">

        <motion.div 
          className="details"
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className='title'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MOYEN RAPIDE &  FACILE DE LOUER VOTRE VOITURE
          </motion.h1>

          <motion.p 
            className='description'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Que vous prévoyiez un week-end escapade ou aventure à travers le pays, nous avons 
            ce qu’il vous faut. Avec notre large sélection de véhicules et système de 
            réservation pratique, la location d’une voiture n’a jamais été aussi facile.
          </motion.p>

          {/* Boutons avec effet cascade */}
          <div className="buttons">
            <div>
              <Link to='/voitures'><button className='btn-voitures'>Voitures</button></Link>
            </div>

            <div>
              <Link to='/contact'><button className='btn-contact'>Contact Us</button></Link>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="image"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.img 
            src={image} 
            alt="image" 
            className='img'
            animate={{
              y: [0, 20, 0], 
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </section>
    </div>
  )
}
