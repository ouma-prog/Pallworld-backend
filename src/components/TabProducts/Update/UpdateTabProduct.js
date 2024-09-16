import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateTabProduct.css'; // Importation du fichier CSS

const UpdateTabProduct = ({ productId }) => {
  const [tabProduct, setTabProduct] = useState({
    name: '',
    quantity: '',
    color: '',
    size: '',
    customization: {
      position: '',
      customizationSize: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fonction pour récupérer le produit par ID
  useEffect(() => {
    const fetchTabProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/tabproducts/${productId}`);
        setTabProduct(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération du produit.');
      }
    };
    fetchTabProduct();
  }, [productId]);

  // Fonction pour mettre à jour le produit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put(`http://localhost:3005/api/tabproducts/${productId}`, tabProduct);
      setSuccess('Produit mis à jour avec succès !');
    } catch (err) {
      setError('Erreur lors de la mise à jour du produit.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('customization')) {
      setTabProduct({
        ...tabProduct,
        customization: {
          ...tabProduct.customization,
          [name.replace('customization.', '')]: value
        }
      });
    } else {
      setTabProduct({ ...tabProduct, [name]: value });
    }
  };

  return (
    <div className="update-tabproduct-container">
      <h1 className="page-title">Mise à jour du produit dans le panier</h1>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="update-form" onSubmit={handleUpdate}>
        <label>Nom du produit:</label>
        <input
          type="text"
          name="name"
          value={tabProduct.name}
          onChange={handleChange}
          required
        />

        <label>Quantité:</label>
        <input
          type="number"
          name="quantity"
          value={tabProduct.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <label>Couleur:</label>
        <input
          type="text"
          name="color"
          value={tabProduct.color}
          onChange={handleChange}
        />

        <label>Taille:</label>
        <input
          type="text"
          name="size"
          value={tabProduct.size}
          onChange={handleChange}
        />

        <label>Position de la personnalisation:</label>
        <input
          type="text"
          name="customization.position"
          value={tabProduct.customization.position}
          onChange={handleChange}
        />

        <label>Taille de la personnalisation:</label>
        <input
          type="text"
          name="customization.customizationSize"
          value={tabProduct.customization.customizationSize}
          onChange={handleChange}
        />

        <button type="submit" className="update-button" disabled={loading}>
          {loading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  );
};

export default UpdateTabProduct;
