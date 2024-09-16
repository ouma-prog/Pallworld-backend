import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css'; 

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [characteristics, setCharacteristics] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState([]);
    const [colors, setColors] = useState('');
    const [sizes, setSizes] = useState([]);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch categories from the backend
    useEffect(() => {
        axios.get('http://localhost:3005/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des catégories", error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !price || !quantity || !category) {
            setError("Nom, prix, catégorie, et quantité sont obligatoires");
            return;
        }

        const productData = {
            name,
            description,
            characteristics,
            price,
            quantity,
            images,
            colors: colors.split(',').map(color => color.trim()), // Convert comma-separated string to array
            sizes, // Direct array of sizes
            category: [category] // Ensure it's an array of category IDs
        };

        axios.post('http://localhost:3005/api/products', productData)
            .then(() => {
                setSuccess('Produit ajouté avec succès');
                // Clear form fields
                setName('');
                setDescription('');
                setCharacteristics('');
                setPrice('');
                setQuantity('');
                setImages([]);
                setColors('');
                setSizes([]);
                setCategory('');
                setError(null);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du produit", error);
                setError("Erreur lors de l'ajout du produit");
            });
    };

    return (
        <div className="page-container">
            <h2>Ajouter un Produit</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <label>
                    Nom du Produit:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <br />
                <label>
                    Caractéristiques:
                    <textarea value={characteristics} onChange={(e) => setCharacteristics(e.target.value)} />
                </label>
                <br />
                <label>
                    Prix du Produit:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <br />
                <label>
                    Quantité:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <br />
                <label>
                    Images (URLs séparées par des virgules):
                    <input
                        type="text"
                        value={images.join(',')}
                        onChange={(e) => setImages(e.target.value.split(','))}
                    />
                </label>
                <br />
                <label>
                    Couleurs (séparées par des virgules):
                    <input type="text" value={colors} onChange={(e) => setColors(e.target.value)} />
                </label>
                <br />
                <label>
                    Tailles (sélection multiple):
                    <select multiple value={sizes} onChange={(e) => setSizes([...e.target.selectedOptions].map(option => option.value))}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                    </select>
                </label>
                <br />
                <label>
                    Catégorie:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(c => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="submit">Ajouter</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
};

export default AddProduct;
