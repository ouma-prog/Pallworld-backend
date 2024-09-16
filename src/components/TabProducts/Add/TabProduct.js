import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection
import './TabProduct.css';

const TabProduct = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [customization, setCustomization] = useState({
    position: '',
    customizationSize: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate(); // Initialiser useNavigate pour la redirection

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:3005/api/tabproducts', {
        productId,
        quantity,
        color,
        size,
        customization,
      });
      setSuccess('Produit ajouté au panier avec succès !');

      // Réinitialiser les champs du formulaire après succès
      setProductId('');
      setQuantity(1);
      setColor('');
      setSize('');
      setCustomization({
        position: '',
        customizationSize: '',
      });

      // Rediriger vers la page ListPanier après ajout au panier
      navigate('/listpanier'); // Assurez-vous que cette route existe dans votre application
    } catch (err) {
      setError('Erreur lors de l\'ajout du produit au panier.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tabproduct-container">
      <h1 className="page-title">Ajouter un produit au panier</h1>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="tabproduct-form" onSubmit={handleAddToCart}>
        <label>Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />

        <label>Quantité:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />

        <label>Couleur:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label>Taille:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        <label>Personnalisation:</label>
        <input
          type="text"
          placeholder="Position de la personnalisation"
          value={customization.position}
          onChange={(e) => setCustomization({ ...customization, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Taille de la personnalisation"
          value={customization.customizationSize}
          onChange={(e) => setCustomization({ ...customization, customizationSize: e.target.value })}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Ajout en cours...' : 'Ajouter au panier'}
        </button>
      </form>
    </div>
  );
};

export default TabProduct;
