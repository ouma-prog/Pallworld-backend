import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListPanier.css';

const ListPanier = () => {
  const [paniers, setPaniers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour récupérer tous les paniers
  const fetchPaniers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3005/api/paniers');
      setPaniers(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des paniers.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour rechercher un panier par ID
  const searchPanierById = async (id) => {
    if (!id.trim()) return fetchPaniers(); // Si le champ est vide, afficher tous les paniers
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3005/api/paniers/${id}`);
      setPaniers([response.data]); // On met dans un tableau pour l'afficher comme une liste
    } catch (err) {
      setError('Panier non trouvé.');
      setPaniers([]); // Si erreur, vider la liste
    } finally {
      setLoading(false);
    }
  };

  // Récupérer tous les paniers au chargement initial de la page
  useEffect(() => {
    fetchPaniers();
  }, []);

  // Gestion du formulaire de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    searchPanierById(searchTerm);
  };

  const resetSearch = () => {
    setSearchTerm('');
    fetchPaniers();
  };

  return (
    <div className="panier-list-container">
      <h1 className="page-title">Liste des Paniers</h1>

      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Rechercher un panier par ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Rechercher</button>
        <button type="button" onClick={resetSearch} className="reset-button">
          Réinitialiser
        </button>
      </form>

      {/* Gestion des erreurs */}
      {error && <p className="error-message">{error}</p>}

      {/* Chargement */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="panier-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Prix total</th>
              <th>Quantité totale</th>
              <th>Produits</th>
            </tr>
          </thead>
          <tbody>
            {paniers.length > 0 ? (
              paniers.map((panier) => (
                <tr key={panier._id}>
                  <td>{panier._id}</td>
                  <td>{panier.totalPrice} €</td>
                  <td>{panier.totalQuantity}</td>
                  <td>{JSON.stringify(panier.tabProducts)}</td> {/* Affichage brut des produits */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Aucun panier trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListPanier;
