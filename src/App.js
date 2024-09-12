// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import des composants
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

import UsersList from './components/users/UsersList';
import AddUser from './components/users/AddUser';
import UpdateUser from './components/users/UpdateUser';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Gestion des catégories */}
                <Route path="/category" element={
                    <div>
                        <h1>Gestion des Catégories</h1>
                        <AddCategory />
                        <UpdateCategory />
                        <CategoriesList />
                    </div>
                }/>

                {/* Gestion des paniers */}
                <Route path="/panier" element={
                    <div>
                        <h1>Gestion des Paniers</h1>
                        <AddPanier />
                        <UpdatePanier />
                        <PanierList />
                    </div>
                }/>

                {/* Gestion des produits */}
                <Route path="/product" element={
                    <div>
                        <h1>Gestion des Produits</h1>
                        <SearchProducts />  
                        <AddProduct />      
                        <UpdateProduct />   
                        <ProductList />    
                    </div>
                }/>

                {/* Gestion des utilisateurs */}
                <Route path="/users" element={
                    <div>
                        <h1>Gestion des Utilisateurs</h1>
                        <UsersList />       
                        <AddUser />         
                        <UpdateUser />     
                    </div>
                }/>
            </Routes>
        </Router>
    );
};

export default App;
