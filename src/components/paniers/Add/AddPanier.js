import React, { useState } from 'react';
import axios from 'axios';

const AddPanier = () => {
    const [panier, setPanier] = useState({
        userId: '',
        products: [],
        total: 0,
    });

    const handleChange = (e) => {
        setPanier({ ...panier, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3005/api/paniers', panier)
            .then(response => {
                alert('Panier ajouté avec succès');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du panier:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un Panier</h2>
            <input
                type="text"
                name="userId"
                placeholder="ID de l'utilisateur"
                value={panier.userId}
                onChange={handleChange}
            />
            <input
                type="number"
                name="total"
                placeholder="Total du panier"
                value={panier.total}
                onChange={handleChange}
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddPanier;
