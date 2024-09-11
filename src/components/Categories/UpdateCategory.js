import React, { useState } from 'react';
import axios from 'axios';

const UpdateCategory = () => {
    const [categoryId, setCategoryId] = useState(''); // Ajoutez un état pour l'ID de la catégorie
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!categoryId) {
            alert("Veuillez entrer l'ID de la catégorie.");
            return;
        }
        axios.put(`http://localhost:3001/api/category/${categoryId}`, { name })
            .then(response => {
                alert('Catégorie mise à jour');
                setName('');
                setCategoryId(''); // Réinitialise l'ID après mise à jour
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de la catégorie", error);
            });
    };

    return (
        <div>
            <h2>Mettre à jour une Catégorie</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    ID de la Catégorie:
                    <input
                        type="text"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)} // Champ pour l'ID
                    />
                </label>
                <br />
                <label>
                    Nouveau nom de la Catégorie:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateCategory;
