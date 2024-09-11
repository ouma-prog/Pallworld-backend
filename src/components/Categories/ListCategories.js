import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);

    // Récupération des catégories au chargement du composant
    useEffect(() => {
        axios.get('http://localhost:3001/api/category')
            .then(response => {
                setCategories(response.data); // Stocke les catégories dans l'état local
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories:', error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des Catégories</h2>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesList;
