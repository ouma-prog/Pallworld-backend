import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const AddOrder = () => {
  const [newOrder, setNewOrder] = useState({
    userId: '',
    items: '',
    totalAmount: '',
    shippingAddress: '',
    imageGenerated: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:3005/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      if (response.ok) {
        setSuccessMessage('Commande créée avec succès.');
        setNewOrder({
          userId: '',
          items: '',
          totalAmount: '',
          shippingAddress: '',
          imageGenerated: '',
        });
        setTimeout(() => {
          navigate('/orders/list'); // Navigate to the orders list page after success
        }, 1500); // Delay for better UX
      } else {
        setError('Erreur lors de la création de la commande.');
      }
    } catch (err) {
      setError('Erreur lors de la création de la commande.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orders-container">
      <h2 className="page-title">Créer une nouvelle commande</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form className="order-form" onSubmit={handleCreateOrder}>
        <input
          type="text"
          placeholder="ID utilisateur"
          value={newOrder.userId}
          onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
          required
        />
        <textarea
          placeholder="Articles (format JSON)"
          value={newOrder.items}
          onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Montant total"
          value={newOrder.totalAmount}
          onChange={(e) => setNewOrder({ ...newOrder, totalAmount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Adresse de livraison"
          value={newOrder.shippingAddress}
          onChange={(e) => setNewOrder({ ...newOrder, shippingAddress: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Image générée (URL)"
          value={newOrder.imageGenerated}
          onChange={(e) => setNewOrder({ ...newOrder, imageGenerated: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Création...' : 'Créer Commande'}
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
