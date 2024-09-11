import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/api/products', { name, price })
            .then(response => {
                alert('Produit ajouté');
                setName('');
                setPrice('');
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du produit", error);
            });
    };

    return (
        <div>
            <h2>Ajouter un Produit</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom du Produit:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Prix du Produit:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddProduct;
