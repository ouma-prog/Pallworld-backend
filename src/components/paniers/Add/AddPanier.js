import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate
import './Panier.css';

const Panier = () => {
  const [newPanier, setNewPanier] = useState({
    totalPrice: '',
    totalQuantity: '',
    tabProducts: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();  // Initialiser useNavigate pour la redirection

  // Fonction pour créer un nouveau panier
  const createPanier = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3005/api/paniers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPanier),
      });
      if (response.ok) {
        // Rediriger vers la page liste des paniers après création réussie
        navigate('/paniers/list');  // Redirection vers la page de la liste des paniers
      } else {
        setError('Erreur lors de la création du panier.');
      }
    } catch (err) {
      setError('Erreur lors de la création du panier.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panier-container">
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Chargement...</p>}

      <h2>Créer un nouveau panier</h2>
      <form className="panier-form" onSubmit={createPanier}>
        <input
          type="number"
          placeholder="Prix total"
          value={newPanier.totalPrice}
          onChange={(e) => setNewPanier({ ...newPanier, totalPrice: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantité totale"
          value={newPanier.totalQuantity}
          onChange={(e) => setNewPanier({ ...newPanier, totalQuantity: e.target.value })}
          required
        />
        <textarea
          placeholder="Produits (en JSON)"
          value={newPanier.tabProducts}
          onChange={(e) => setNewPanier({ ...newPanier, tabProducts: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Création...' : 'Créer le panier'}
        </button>
      </form>
    </div>
  );
};

export default Panier;
