import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PanierList = () => {
    const [paniers, setPaniers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3005/api/paniers')
            .then(response => {
                setPaniers(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des paniers:', error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des Paniers</h2>
            <ul>
                {paniers.map(panier => (
                    <li key={panier._id}>
                        Utilisateur: {panier.userId} - Total: {panier.total} €
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PanierList;
