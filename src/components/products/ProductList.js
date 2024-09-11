import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits:', error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des Produits</h2>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product._id}>
                            {product.name} - {product.price} €
                        </li>
                    ))
                ) : (
                    <p>Aucun produit disponible.</p>
                )}
            </ul>
        </div>
    );
};

export default ProductList;
