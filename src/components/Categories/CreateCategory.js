import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Envoyer une requête POST à votre API backend
      const response = await axios.post('http://localhost:3005/api/category', { name: categoryName });
      console.log('Catégorie créée:', response.data);
      alert('Catégorie créée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      alert('Erreur lors de la création de la catégorie');
    }
  };

  return (
    <div>
      <h1>Créer une nouvelle catégorie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom de la catégorie:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateCategory;
