import React, { useState } from 'react';
import axios from 'axios';

const UpdatePanier = () => {
    const [panierId, setPanierId] = useState('');
    const [total, setTotal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/api/paniers/${panierId}`, { total })
            .then(response => {
                alert('Panier mis à jour avec succès');
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du panier:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Mettre à jour un Panier</h2>
            <input
                type="text"
                placeholder="ID du Panier"
                value={panierId}
                onChange={(e) => setPanierId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Nouveau Total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
            />
            <button type="submit">Mettre à jour</button>
        </form>
    );
};

export default UpdatePanier;
