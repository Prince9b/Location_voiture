import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './MesReservations.css'
import Navbar from '../../composants/Navbar/Navbar'

export default function MesReservations() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchMesReservations = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:8000/api/mes-reservations', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setReservations(res.data)
      } catch (err) {
        console.error("Erreur lors du chargement", err)
      }
    }

    fetchMesReservations()
  }, [])

  return (
    <div>
        <Navbar />
    <div className="mes-reservations">
      <h2>Mon Historique de Réservations</h2>
      {reservations.length === 0 ? (
        <p>Vous n'avez pas encore de réservations.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Voiture</th>
              <th>Du</th>
              <th>au</th>
              <th>Prix total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id}>
                <td>{res.voiture?.marque}</td>
                <td>{res.date_debut}</td>
                <td>{res.date_fin}</td>
                <td>{res.prix_total} CFA</td>
                <td>{res.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  )
}
