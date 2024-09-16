import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListCategory.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all categories initially
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3005/api/category');
      setCategories(response.data);
      setError(null);
    } catch (error) {
      setError('Erreur lors de la récupération des catégories.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3005/api/category/${searchTerm}`);
      setCategories([response.data]);  // Display only the searched category
      setError(null);
    } catch (error) {
      setError('Erreur lors de la récupération de la catégorie.');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    fetchCategories();
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Liste des Catégories</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Rechercher par ID de catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Rechercher</button>
        <button type="button" onClick={resetSearch} className="reset-button">
          Réinitialiser
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Categories List */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="category-list">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className="category-item">
                {category.name} (ID: {category._id})
              </li>
            ))
          ) : (
            <p>Aucune catégorie trouvée.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CategoriesPage;
