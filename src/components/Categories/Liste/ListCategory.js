import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour naviguer vers une autre page
import axios from 'axios';
import './ListCategory.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showText, setShowText] = useState(false); // Pour gérer l'affichage du texte
  const navigate = useNavigate(); // Pour rediriger

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setDisplayedCategories(categories);
      return;
    }
    const filteredCategories = categories.filter((category) =>
      category._id.includes(searchTerm)
    );
    setDisplayedCategories(filteredCategories);
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3005/api/category');
      setCategories(response.data);
      setDisplayedCategories(response.data);
      setError(null);
    } catch (error) {
      setError('Erreur lors de la récupération des catégories.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  // Gérer le clic du bouton pour ajouter une catégorie
  const handleAddCategoryClick = () => {
    setShowText(true); // Afficher le texte "Ajouter catégorie"
    setTimeout(() => {
      navigate('/categories/add'); // Naviguer vers la page d'ajout après 1 seconde
    }, 1000); // Délai d'1 seconde pour voir le texte avant la redirection
  };

  return (
    <div className="page-container">
      {/* Bouton Ajouter Catégorie */}
      <button className="add-category-button" onClick={handleAddCategoryClick}>
        +
      </button>
      {showText && <p className="add-category-text">Ajouter catégorie</p>}

      <h1 className="page-title">Liste des Catégories</h1>

      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Rechercher par ID de catégorie..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="button" onClick={resetSearch} className="reset-button">
          Réinitialiser
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="category-list">
          {displayedCategories.length > 0 ? (
            displayedCategories.map((category) => (
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
