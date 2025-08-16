import React, { useState } from 'react';
import './SearchBar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [resultats, setResultats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await axios.get(`http://localhost:8000/api/voitures/search?q=${query}`);
      setResultats(res.data);
      setIsModalOpen(true); 
    } catch (err) {
      console.error('Erreur de recherche :', err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResultats([]);
  };

  return (
    <div className="searchcontainer">
      <div className="search">
        <input
          type="text"
          placeholder="Entrez la marque d'une voiture"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            {resultats.length > 0 ? (
              resultats.map((voiture) => (
                <div key={voiture.id} className="searchrendu">
                  <h3>{voiture.marque}</h3>
                  <img
                    src={`http://localhost:8000/storage/images/${voiture.image}`}
                    alt={voiture.marque}
                    className="imgsearch"
                  />
                  <Link to={`/details/${voiture.id}`} onClick={closeModal}>
                    Voir plus
                  </Link>
                </div>
              ))
            ) : (
              <p>Aucun résultat trouvé</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
