import React, { useState } from 'react';
import axios from 'axios';
import './DeleteTabProduct.css';

const DeleteTabProduct = () => {
  const [tabProductId, setTabProductId] = useState(''); // ID du produit à supprimer
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.delete(`http://localhost:3005/api/tabproducts/${tabProductId}`);
      if (response.status === 200) {
        setSuccess('Produit supprimé avec succès.');
        setTabProductId(''); // Réinitialiser l'ID après suppression
      } else {
        setError('Erreur lors de la suppression du produit.');
      }
    } catch (err) {
      setError('Erreur lors de la suppression du produit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-container">
      <h2>Supprimer un produit du tableau</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleDelete}>
        <label htmlFor="tabProductId">ID du produit à supprimer:</label>
        <input
          type="text"
          id="tabProductId"
          value={tabProductId}
          onChange={(e) => setTabProductId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Suppression en cours...' : 'Supprimer le produit'}
        </button>
      </form>
    </div>
  );
};

export default DeleteTabProduct;
