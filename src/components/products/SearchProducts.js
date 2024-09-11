import React, { useState } from 'react';
import axios from 'axios';

const SearchProducts = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3001/api/products/search?query=${query}`)
            .then(response => {
                setResults(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la recherche des produits:', error);
                alert('Erreur lors de la récupération des produits.');
            });
    };

    return (
        <div>
            <h2>Recherche de produits</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Rechercher un produit"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Rechercher</button>
            </form>
            <ul>
                {results.length > 0 ? (
                    results.map(product => (
                        <li key={product._id}>{product.name} - {product.price} €</li>
                    ))
                ) : (
                    <p>Aucun produit trouvé.</p>
                )}
            </ul>
        </div>
    );
};

export default SearchProducts;
