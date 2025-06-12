import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Reservation.css'
import Nav from './Composants/Nav'

export default function Reservation() {
  const [reservations, setReservations] = useState([])

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:8000/api/admin/reservations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setReservations(res.data)
    } catch (err) {
      console.error("Erreur chargement réservations", err)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression de cette réservation ?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:8000/api/admin/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchReservations()
    } catch (err) {
      console.error("Erreur suppression", err)
    }
  }

  const handleValidate = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8000/api/admin/reservations/${id}/valider`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchReservations()
    } catch (err) {
      console.error("Erreur validation", err)
    }
  }

  return (
    <div>
      <Nav />
      <div className="admin-reservations">
        <h2>Liste des Réservations</h2>
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Voiture</th>
              <th>Du</th>
              <th>Au</th>
              <th>Prix total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id}>
                <td>{res.user?.name}</td>
                <td>{res.voiture?.marque}</td>
                <td>{res.date_debut}</td>
                <td>{res.date_fin}</td>
                <td>{res.prix_total} CFA</td>
                <td>{res.status}</td>
                <td>
                  <button onClick={() => handleValidate(res.id)} className="btn-validate">
                    Valider
                  </button>
                  <button onClick={() => handleDelete(res.id)} className="btn-delete">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
