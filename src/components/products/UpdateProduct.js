import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3001/api/products/${productId}`, { name, price })
            .then(response => {
                alert('Produit mis à jour');
                setProductId('');
                setName('');
                setPrice('');
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du produit", error);
            });
    };

    return (
        <div>
            <h2>Mettre à jour un Produit</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    ID du Produit:
                    <input
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Nom du Produit:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Prix du Produit:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
