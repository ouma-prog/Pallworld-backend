import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3005/api/users', { name, email, password })
            .then(response => {
                alert('Utilisateur ajouté avec succès');
                setName('');
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter un Utilisateur</h2>
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
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddUser;
