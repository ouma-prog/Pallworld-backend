import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
    const [id, setId] = useState('');  // ID de l'utilisateur
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) {
            alert('Veuillez entrer l\'ID de l\'utilisateur.');
            return;
        }

        axios.put(`http://localhost:3001/api/users/${id}`, { name, email })
            .then(response => {
                alert('Utilisateur mis à jour avec succès');
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Mettre à jour l'utilisateur</h2>
            <input
                type="text"
                placeholder="ID de l'utilisateur"
                value={id}
                onChange={(e) => setId(e.target.value)}  // Ajouter un champ pour l'ID de l'utilisateur
            />
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Mettre à jour</button>
        </form>
    );
};

export default UpdateUser;
