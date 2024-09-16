import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Add/Orders.css';

const ListOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les commandes (toutes ou par userId)
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = userId
        ? await axios.get(`http://localhost:3005/api/orders/user/${userId}`)
        : await axios.get('http://localhost:3005/api/orders');

      setOrders(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des commandes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return (
    <div className="orders-container">
      <h2 className="page-title">Liste des Commandes</h2>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Chargement...</p>}

      {/* Afficher les commandes */}
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID Commande</th>
              <th>ID Utilisateur</th>
              <th>Montant Total</th>
              <th>Adresse de Livraison</th>
              <th>Image Générée</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{order.totalAmount} €</td>
                <td>{order.shippingAddress}</td>
                <td>
                  {order.imageGenerated ? (
                    <a href={order.imageGenerated} target="_blank" rel="noopener noreferrer">
                      Voir l'image
                    </a>
                  ) : (
                    'Pas d\'image'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune commande trouvée.</p>
      )}
    </div>
  );
};

export default ListOrders;
