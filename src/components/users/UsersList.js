import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/users') // Assure-toi que l'URL correspond à ton API
            .then(response => {
                setUsers(response.data); // Mettre à jour l'état avec la liste des utilisateurs
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            });
    }, []);

    return (
        <div>
            <h2>Liste des Utilisateurs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleDelete(user._id)}>Supprimer</button>
                                <button onClick={() => handleUpdate(user._id)}>Modifier</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Fonction pour supprimer un utilisateur
const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/users/${id}`)
        .then(() => {
            alert('Utilisateur supprimé');
            window.location.reload(); // Recharger la page après suppression
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        });
};

// Fonction pour rediriger vers la page de modification
const handleUpdate = (id) => {
    window.location.href = `/users/update/${id}`; // Redirige vers une page de mise à jour avec l'ID utilisateur
};

export default UsersList;
