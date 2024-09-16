import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css'; // Optional for styling

const ProductListWithSearch = () => {
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    // Fetch all products on page load
    useEffect(() => {
        axios.get('http://localhost:3005/api/products')
            .then(response => {
                setProducts(response.data);
                setSearchResults(response.data); // Display all products initially
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits:', error);
                setError("Erreur lors de la récupération des produits");
            });
    }, []);

    // Handle product search
    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setError("La recherche ne peut pas être vide");
            return;
        }

        // Search products by query
        axios.get(`http://localhost:3005/api/products/search?query=${query}`)
            .then(response => {
                setSearchResults(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('Erreur lors de la recherche des produits:', error);
                setError("Erreur lors de la recherche des produits");
            });
    };

    return (
        <div className="page-container">
            <h2>Liste des Produits</h2>
            
            {/* Search bar */}
            <form onSubmit={handleSearch} className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher un produit"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Rechercher</button>
            </form>

            {/* Error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Product list */}
            <ul className="product-list">
                {searchResults.length > 0 ? (
                    searchResults.map(product => (
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

export default ProductListWithSearch;
