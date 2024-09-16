import React, { useState } from 'react';
import axios from 'axios';
import './UpdateProduct.css';

const UpdateProduct = () => {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!productId || !name || !price) {
            setError("Tous les champs sont obligatoires");
            return;
        }
        axios.put(`http://localhost:3005/api/products/${productId}`, { name, price })
            .then(() => {
                setSuccess('Produit mis à jour avec succès');
                setProductId('');
                setName('');
                setPrice('');
                setError(null);
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour du produit", error);
                setError("Erreur lors de la mise à jour du produit");
            });
    };

    return (
        <div className="page-container">
            <h2>Mettre à jour un Produit</h2>
            <form onSubmit={handleSubmit} className="form-container">
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
                <br />
                <button type="submit">Mettre à jour</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
};

export default UpdateProduct;
