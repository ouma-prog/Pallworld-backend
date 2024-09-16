import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import './ListUsers.css';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialisez useNavigate

  // Fonction pour obtenir tous les utilisateurs
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3005/api/users');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        setError('');
      } else {
        setError(data.error || 'Erreur lors de la récupération des utilisateurs');
      }
    } catch (err) {
      setError('Erreur lors de la récupération des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour obtenir un utilisateur par ID
  const fetchUserById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3005/api/users/${id}`);
      const data = await response.json();
      if (response.ok) {
        setUsers([data]); // Place the single user in an array
        setError('');
      } else {
        setError(data.error || 'Utilisateur non trouvé');
      }
    } catch (err) {
      setError('Erreur lors de la récupération de l\'utilisateur');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour rediriger vers la page de suppression
  const deleteUser = (id) => {
    navigate(`/users/delete/${id}`); // Redirection vers la page de suppression avec l'ID de l'utilisateur
  };

  // Fonction pour modifier un utilisateur
  const updateUser = (id) => {
    navigate(`/users/update/${id}`); // Redirection vers la page de mise à jour avec l'ID de l'utilisateur
  };

  // Gestion du changement dans la barre de recherche
  const handleSearchChange = (e) => {
    setUserId(e.target.value);
  };

  // Gestion de la soumission du formulaire
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      fetchUserById(userId);
    } else {
      fetchAllUsers();
    }
  };

  // Récupère tous les utilisateurs dès le chargement du composant
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="list-users-container">
      <h2>Liste des Utilisateurs</h2>

      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Rechercher un utilisateur par ID"
          value={userId}
          onChange={handleSearchChange}
        />
        <button type="submit">Rechercher</button>
      </form>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="user-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td> {/* Ajout de la colonne pour l'ID */}
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)} className="btn-delete">Supprimer</button> {/* Redirection avec ID */}
                  <button onClick={() => updateUser(user._id)} className="btn-modify">Modifier</button> {/* Redirection avec ID */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListUsers;
