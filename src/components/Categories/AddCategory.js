import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/category', { name })
            .then(response => {
                alert('Catégorie ajoutée');
                setName('');
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de la catégorie", error);
            });
    };

    return (
        <div>
            <h2>Ajouter une Catégorie</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom de la Catégorie:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddCategory;
