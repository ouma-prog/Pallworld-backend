import React, { useState } from 'react';
import axios from 'axios';
import './DeletePanier.css';

const DeletePanier = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [panier, setPanier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fonction pour rechercher un panier par ID
  const searchPanierById = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Veuillez entrer un ID de panier.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.get(`http://localhost:3005/api/paniers/${searchTerm}`);
      setPanier(response.data);
      setError(null);
    } catch (err) {
      setError('Panier non trouvé.');
      setPanier(null);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un panier par ID
  const deletePanierById = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.delete(`http://localhost:3005/api/paniers/${panier._id}`);
      setSuccess('Panier supprimé avec succès.');
      setPanier(null);
    } catch (err) {
      setError('Erreur lors de la suppression du panier.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-panier-container">
      <h1 className="page-title">Supprimer un Panier</h1>

      {/* Formulaire de recherche */}
      <form onSubmit={searchPanierById} className="search-form">
        <input
          type="text"
          placeholder="Entrez l'ID du panier..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Rechercher
        </button>
      </form>

      {/* Affichage du panier trouvé ou du message d'erreur */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {loading && <p>Chargement...</p>}

      {panier && (
        <div className="panier-details">
          <p><strong>ID :</strong> {panier._id}</p>
          <p><strong>Prix total :</strong> {panier.totalPrice} €</p>
          <p><strong>Quantité totale :</strong> {panier.totalQuantity}</p>
          <p><strong>Produits :</strong> {JSON.stringify(panier.tabProducts)}</p>
          <button onClick={deletePanierById} className="delete-button">
            Supprimer ce panier
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletePanier;
