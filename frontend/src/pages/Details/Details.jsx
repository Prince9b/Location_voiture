import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReservationForm from './ReservationForm'
import './Details.css'

export default function Details() {
  const { id } = useParams()
  const [voiture, setVoiture] = useState(null)

  useEffect(() => {
    const fetchVoiture = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/voitures/${id}`)
        setVoiture(res.data)
      } catch (err) {
        console.error("Erreur lors du chargement de la voiture", err)
      }
    }

    fetchVoiture()
  }, [id])

  if (!voiture) return <div className="loading">Chargement...</div>

  return (
    <div className="details-container">
      <div className="car-details">
        <img src={`http://localhost:8000/storage/images/${voiture.image}`} alt={voiture.marque} className="car-image" />
        <div className="car-info">
          <h2>{voiture.marque}</h2>
          <p>{voiture.description}</p>
          <p><strong>Prix par jour:</strong> {voiture.prix_par_jour} CFA</p>
        </div>
      </div>

      <div className="reservation-section">
        <h3>Réserver cette voiture</h3>
        <ReservationForm voitureId={voiture.id} />
      </div>
    </div>
  )
}
