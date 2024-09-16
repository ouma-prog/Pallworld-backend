import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteCategory.css'; // Importer votre fichier CSS

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fonction pour récupérer toutes les catégories
  const fetchCategories = () => {
    axios
      .get('http://localhost:3005/api/category') // Assurez-vous que l'URL est correcte
      .then((response) => {
        setCategories(response.data);
        setError(null);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des catégories');
      });
  };

  // Fonction pour supprimer une catégorie
  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      axios
        .delete(`http://localhost:3005/api/category/${id}`)
        .then((response) => {
          setSuccess('Catégorie supprimée avec succès');
          setError(null);
          fetchCategories(); // Actualiser la liste après suppression
        })
        .catch(() => {
          setError('Erreur lors de la suppression de la catégorie');
        });
    }
  };

  return (
    <div className="page-container">
      <h1>Supprimer une Catégorie</h1>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <ul className="category-list">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id} className="category-item">
              <span>{category.name}</span>
              <button
                onClick={() => handleDelete(category._id)}
                className="delete-button"
              >
                Supprimer
              </button>
            </li>
          ))
        ) : (
          <p>Aucune catégorie disponible.</p>
        )}
      </ul>
    </div>
  );
};

export default DeleteCategory;
