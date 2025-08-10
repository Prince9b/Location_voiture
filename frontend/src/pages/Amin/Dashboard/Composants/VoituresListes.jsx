import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VoituresListes.css';

const VoituresListes = () => {
  const [voitures, setVoitures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit]= useState(false)
  const [selectedVoitureId, setSelectedVoitureId]= useState('')
  const [form, setForm] = useState({
    marque: '',
    description: '',
    prix_par_jour: '',
    quantite: '',
    status: 'disponible',
    image: null,
  });

  useEffect(() => {
    fetchvoitures();
  }, []);

  const fetchvoitures = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/voitures');
      setVoitures(res.data);
    } catch (err) {
      console.error('Erreur chargement des voitures', err);
    }
  };

  const deletevoiture = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      await axios.delete(`http://localhost:8000/api/voitures/${id}`);
      fetchvoitures();
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }

      await axios.post('http://localhost:8000/api/voitures')

      alert('Voiture ajoutée !');
      setShowModal(false);
      fetchvoitures();
      setForm({
        marque: '',
        description: '',
        prix_par_jour: '',
        quantite: '',
        status: 'disponible',
        image: null,
      });
    } catch (err) {
      console.error('Erreur ajout voiture', err);
    }
  };
  const handlePut= async (e,id) => {
    e.preventDefault()
    try {
      const formData= new FormData()
      for( let key in form){
        formData.append(key, form[key])
      }
      await axios.post(`http://localhost:8000/api/voitures/${selectedVoitureId}?_method=PUT`, formData,{
        headers: {'Content-Type':'multipart/form-data'}
      })
      alert('Voiture modifiée')
      setShowEdit(false)
      fetchvoitures()
      setForm({
        marque:'',
        description: '',
        prix_par_jour: '',
        quantite: '',
        status: 'disponible',
        image: null,
      })

    }catch(err){
      console.error('Erreur lors de la modif', err);
      
    }
  }

  return (
    <>
      <div className="voitures-header">
        <h1 className="voitures-title">Liste des voitures</h1>
        <button className="btn add-btn" onClick={() => setShowModal(true)}>Ajouter une voiture</button>
      </div>

      <div className="voitures-container">
        <table className="voitures-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Marque</th>
              <th>Description</th>
              <th>Prix / jour</th>
              <th>Quantité</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {voitures.map(voiture => (
              <tr key={voiture.id}>
                <td>
                  {voiture.image && (
                    <img src={`http://localhost:8000/storage/images/${voiture.image}`} alt={voiture.marque} className="imag" />
                  )}
                </td>
                <td>{voiture.marque}</td>
                <td>{voiture.description}</td>
                <td>{voiture.prix_par_jour} €</td>
                <td>{voiture.quantite}</td>
                <td>{voiture.statut}</td>
                <td>
                  <button className="btn edit-btn" onClick={()=>{
                      setShowEdit(true)
                      setSelectedVoitureId(voiture.id)
                      setForm({
                        marque: voiture.marque,
                        description: voiture.description,
                        prix_par_jour: voiture.prix_par_jour,
                        quantite: voiture.quantite,
                        status: 'disponible',
                        image: null,
                      })
                      
                   }}
                   >Éditer</button>
                  <button className="btn delete-btn" onClick={() => deletevoiture(voiture.id)}>Enlever</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Ajouter une voiture</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>Marque</label>
              <input type="text" name="marque" value={form.marque} onChange={handleChange} required />

              <label>Description</label>
              <input type="text" name="description" value={form.description} onChange={handleChange} required />

              <label>Prix / jour</label>
              <input type="number" name="prix_par_jour" value={form.prix_par_jour} onChange={handleChange} required />

              <label>Quantité</label>
              <input type="number" name="quantite" value={form.quantite} onChange={handleChange} required />

              <label>Statut</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="disponible">Disponible</option>
                <option value="indisponible">Indisponible</option>
              </select>

              <label>Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} />

              <div className="modal-actions">
                <button type="submit" className="btn add-btn">Valider</button>
                <button type="button" className="btn cancel-btn" onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEdit && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Modifier une voiture</h2>
            <form onSubmit={(e) => handlePut(e, selectedVoitureId)} className="modal-form">
            <label>Marque</label>
            <input type="text" name="marque" value={form.marque} onChange={handleChange} required />
          
            <label>Description</label>
            <input type="text" name="description" value={form.description} onChange={handleChange} required />
          
            <label>Prix / jour</label>
            <input type="number" name="prix_par_jour" value={form.prix_par_jour} onChange={handleChange} required />
          
            <label>Quantité</label>
            <input type="number" name="quantite" value={form.quantite} onChange={handleChange} required />
          
            <label>Statut</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="disponible">Disponible</option>
              <option value="indisponible">Indisponible</option>
            </select>
          
            <label>Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />

        <div className="modal-actions">
          <button type="submit" className="btn add-btn">Valider</button>
          <button type="button" className="btn cancel-btn" onClick={() => setShowEdit(false)}>Annuler</button>
        </div>
      </form>
    </div>
  </div>
)}

    </>
  );
};

export default VoituresListes;
