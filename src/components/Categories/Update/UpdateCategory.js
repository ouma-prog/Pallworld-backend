import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdateCategory.css'; // Import the CSS file

const UpdateCategory = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3005/api/category/${id}`)
            .then(response => {
                setName(response.data.name);
                setLoading(false);
            })
            .catch(() => {
                setError('Erreur lors de la récupération de la catégorie');
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name.trim()) {
            setError('Le nom de la catégorie est requis');
            return;
        }

        axios.put(`http://localhost:3005/api/category/${id}`, { name })
            .then(() => {
                setSuccess('Catégorie mise à jour avec succès');
                setError(null);
            })
            .catch(() => {
                setError('Erreur lors de la mise à jour de la catégorie');
            });
    };

    return (
        <div className="page-container">
            <div className="inner-container">
                <h2 className="page-title">Mettre à jour la Catégorie</h2>

                {loading && <p>Chargement...</p>}

                {!loading && (
                    <form onSubmit={handleSubmit} className="form-container">
                        <div>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError(null);
                                    setSuccess(null);
                                }} 
                                className="form-input"
                                placeholder="Nom de la catégorie"
                            />
                        </div>
                        <button type="submit" className="form-button form-button-update">
                            Mettre à jour
                        </button>
                    </form>
                )}

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
};

export default UpdateCategory;
