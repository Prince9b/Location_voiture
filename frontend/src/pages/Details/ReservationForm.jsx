import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Details.css'

export default function ReservationForm({ voitureId }) {
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [prixParJour, setPrixParJour] = useState(0)
  const [prixTotal, setPrixTotal] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Charger le prix par jour au montage
    const fetchVoiture = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/voitures/${voitureId}`)
        setPrixParJour(res.data.prix_par_jour)
      } catch (error) {
        console.error("Erreur chargement du prix", error)
      }
    }
    fetchVoiture()
  }, [voitureId])

  useEffect(() => {
    if (dateDebut && dateFin) {
      const debut = new Date(dateDebut)
      const fin = new Date(dateFin)
      const diffTime = fin - debut
      const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1

      if (diffDays > 0) {
        setPrixTotal(diffDays * prixParJour)
      } else {
        setPrixTotal(0)
      }
    }
  }, [dateDebut, dateFin, prixParJour])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')

      await axios.post(
        'http://localhost:8000/api/reservations',
        {
          voiture_id: voitureId,
          date_debut: dateDebut,
          date_fin: dateFin,
          prix_total: prixTotal
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setMessage('✅ Réservation effectuée avec succès !')
    } catch (err) {
      console.error(err)
      setMessage(err.response?.data?.message || '❌ Une erreur est survenue')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <label>
        Date de début :
        <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} required />
      </label>
      <label>
        Date de fin :
        <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} required />
      </label>

      {prixTotal > 0 && (
        <p className="prix-total">💰 Prix total : <strong>{prixTotal.toLocaleString()} CFA</strong></p>
      )}

      <button type="submit">Réserver</button>
      {message && <p className="message">{message}</p>}
    </form>
  )
}
