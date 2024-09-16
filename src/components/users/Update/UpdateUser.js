import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateUser.css'; // Le fichier CSS correspondant

const UpdateUser = () => {
  const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    codePostal: '',
    credits: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données d'un utilisateur spécifique
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/users/${id}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data); // Pré-remplit les champs avec les données de l'utilisateur
          setLoading(false);
        } else {
          setError('Utilisateur non trouvé');
          setLoading(false);
        }
      } catch (err) {
        setError('Erreur lors de la récupération des données utilisateur');
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Fonction pour mettre à jour les informations utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3005/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Envoyer les données modifiées
      });

      if (response.ok) {
        navigate('/users'); // Rediriger après la mise à jour réussie
      } else {
        setError('Erreur lors de la mise à jour de l\'utilisateur');
      }
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'utilisateur');
    }
  };

  // Fonction pour gérer le changement dans les champs de formulaire
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="update-user-container">
      <h2>Modifier les informations de l'utilisateur</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={userData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={userData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={userData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={userData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Pays"
            value={userData.country}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Ville"
            value={userData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={userData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="codePostal"
            placeholder="Code Postal"
            value={userData.codePostal}
            onChange={handleChange}
          />
          <input
            type="number"
            name="credits"
            placeholder="Crédits"
            value={userData.credits}
            onChange={handleChange}
          />

          <button type="submit">Mettre à jour</button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;
