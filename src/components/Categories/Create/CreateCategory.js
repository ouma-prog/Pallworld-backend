import React, { useState } from 'react';
import axios from 'axios';
import './CreateCategory.css'; // Assurez-vous que ce fichier CSS est correctement importé

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoryName.trim()) {
      setError('Le nom de la catégorie ne peut pas être vide.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:3005/api/category', { name: categoryName });
      setSuccess('Catégorie créée avec succès !');
      setCategoryName('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Erreur: ${err.response.data.message}`);
      } else {
        setError('Erreur lors de la création de la catégorie. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="inner-container">
        <h1 className="page-title">Créer une nouvelle catégorie</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            disabled={loading}
            className="form-input"
          />
          <button type="submit" disabled={loading} className="form-button">
            {loading ? 'Création en cours...' : 'Créer'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default CreateCategory;
