import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListTabProducts.css';

const ListTabProducts = () => {
  const [tabProducts, setTabProducts] = useState([]); // Liste complète des produits
  const [displayedTabProducts, setDisplayedTabProducts] = useState([]); // Produits affichés
  const [searchTerm, setSearchTerm] = useState(''); // ID recherché
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Fonction pour récupérer tous les produits
  const fetchTabProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3005/api/tabproducts'); // URL pour récupérer tous les produits
      setTabProducts(response.data);
      setDisplayedTabProducts(response.data); // Affiche tous les produits par défaut
      setError(null);
    } catch (err) {
      setError('Erreur lors de la récupération des produits.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les produits par ID en temps réel
  useEffect(() => {
    if (!searchTerm.trim()) {
      setDisplayedTabProducts(tabProducts);
    } else {
      const filteredProducts = tabProducts.filter((product) =>
        product._id.includes(searchTerm) // Filtrer les produits par ID
      );
      setDisplayedTabProducts(filteredProducts);
    }
  }, [searchTerm, tabProducts]);

  // Charger les produits lors du premier rendu
  useEffect(() => {
    fetchTabProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Met à jour la valeur de recherche
  };

  return (
    <div className="list-tab-products-container">
      <h1 className="page-title">Liste des produits dans le tableau</h1>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par ID de produit..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Message d'erreur */}
      {error && <p className="error-message">{error}</p>}

      {/* Liste des produits */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="product-list">
          {displayedTabProducts.length > 0 ? (
            displayedTabProducts.map((product) => (
              <li key={product._id} className="product-item">
                <strong>Nom du produit :</strong> {product.name} <br />
                <strong>ID :</strong> {product._id} <br />
                <strong>Prix :</strong> {product.price} € <br />
                <strong>Quantité :</strong> {product.quantity}
              </li>
            ))
          ) : (
            <p>Aucun produit trouvé.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ListTabProducts;
