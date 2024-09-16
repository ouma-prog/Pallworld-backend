import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listById.css';

const ListGeneratedImagesByUserId = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of images per page

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:3005/api/generated-images/${userId}`, {
          params: {
            page,
            limit,
          },
        });
        setImages(response.data.images);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Erreur lors de la récupération des images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId, page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="list-container">
      <h2 className="list-title">Images générées pour l'utilisateur {userId}</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="image-grid">
            {images.map((image) => (
              <div key={image._id} className="image-card">
                <img src={image.imageUrl} alt={`Generated by ${image.promptUsed}`} className="generated-image" />
                <p>{image.promptUsed ? `Prompt: ${image.promptUsed}` : 'Pas de prompt utilisé'}</p>
                <p>Générée le : {new Date(image.dateGenerated).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Précédent
            </button>
            <span>
              Page {page} sur {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListGeneratedImagesByUserId;
