// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCategory from './components/Categories/AddCategory';
import UpdateCategory from './components/Categories/UpdateCategory';
import CategoriesList from './components/Categories/ListCategories';
import AddPanier from './components/paniers/AddPanier';
import PanierList from './components/paniers/PanierList';
import UpdatePanier from './components/paniers/UpdatePanier';
import AddProduct from './components/products/AddProduct';
import UpdateProduct from './components/products/UpdateProduct';
import ProductList from './components/products/ProductList';
import SearchProducts from './components/products/SearchProducts'; 


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/category" element={
                    <div>
                        <h1>Gestion des Catégories</h1>
                        <AddCategory />
                        <UpdateCategory />
                        <CategoriesList />
                    </div>
                }/>
                <Route path="/panier" element={
                    <div>
                        <h1>Gestion des Paniers</h1>
                        <AddPanier />
                        <UpdatePanier />
                        <PanierList />
                    </div>
                }/>
                <Route path="/product" element={
                    <div>
                        <h1>Gestion des Produits</h1>
                        <SearchProducts />

                        <AddProduct />
                        <UpdateProduct />
                        <ProductList />
                    </div>
                }/>
            </Routes>
        </Router>
    );
};

export default App;
