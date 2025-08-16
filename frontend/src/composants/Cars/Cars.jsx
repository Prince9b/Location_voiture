import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Cars.css'
import {motion} from 'framer-motion'
import Footer from '../Footer/Footer'
import { ClipLoader } from 'react-spinners'

export default function Cars() {

    const [voitures, setVoitures]= useState([])
    const [loading, setLoading]= useState(true)
    

    useEffect(() => {
        fetchvoitures();
      }, []);

    const fetchvoitures = async () => {
    try {
        setLoading(true)
      const res = await axios.get('http://localhost:8000/api/voitures');
      setVoitures(res.data);
    } catch (err) {
      console.error('Erreur chargement des voitures', err);
    } finally{
        setLoading(false)
    }
  };
  if (loading) return (
    <div className="loading">
        <ClipLoader size={30} color='black' />
    </div>
  )

  return (
   <>
    <div className="voitures-container">
            <h2 className="voitures-title">Notre Collection Exclusive</h2>
            <div className="voitures-grid">
                {voitures.map((voiture) => (
                    <CarCard 
                        key={voiture.id} 
                        voiture={voiture}
                    />
                ))}
            </div>
    </div>
    <Footer/>
   </>
  )
}
function CarCard({ voiture }) {
    const [isHovered, setIsHovered] = useState(false)
    
    return (
        <div className="car-card-wrapper">
            <div 
                className={`car-card ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
            >
               
                
                <div className="car-image-container">
                    <img src={`http://localhost:8000/storage/images/${voiture.image}`} alt={voiture.marque}/>
                </div>
                
                <div className="car-info">
                    <div className="car-header">
                        <h3>{voiture.marque}</h3>
                        <div className="car-price">
                            <span>Cfa{voiture.prix_par_jour}</span>
                            <span>/jour</span>
                        </div>
                    </div>
                    
                    <p className="car-description">{voiture.description}</p>
                    
                </div>
                
                <Link to={`/details/${voiture.id}`} className="details-link">
                    Reserver
                </Link>
            </div>
        </div>
    )
}
