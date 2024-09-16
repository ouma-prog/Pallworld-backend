import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//categories
import CreateCategory from './components/Categories/Create/CreateCategory';
import UpdateCategory from './components/Categories/Update/UpdateCategory';
import ListCategory from './components/Categories/Liste/ListCategory';
import DeleteCategory from './components/Categories/Delete/deleteCategory'; 

//produits
import ProductList from './components/products/Liste/ProductList';
import AddProduct from './components/products/Add/AddProduct';
import UpdateProduct from './components/products/Update/UpdateProduct';

//Header
import Header from './components/Header/header'; 

//Generate image 
import CreateGeneratedImage from './components/GenerateImmage/Add/CreateGeneratedImage';
import DeleteGeneratedImage from './components/GenerateImmage/Delete/DeleteGeneratedImage';
import ListGeneratedImagesByUserId from './components/GenerateImmage/Liste/ListImages';

//users
import AddUser from './components/users/Add/AddUser';
import DeleteUser from './components/users/Delete/deleteUser';
import ForgotPass from './components/users/ForgotPass/ForgotPass';
import ListUsers from './components/users/Liste/ListUsers';
import UpdateUser from './components/users/Update/UpdateUser';
import SignIn from './components/users/SignIn/SignIn';
import VerifyUser from './components/users/Verify/VerifyUser';
import SignUp from './components/users/SignUp/SignUp';


//panier
import Panier from './components/paniers/Add/AddPanier';
import ListPanier from './components/paniers/Liste/ListPanier';
import DeletePanier from './components/paniers/Delete/DeletePanier';

//tab produits
import TabProduct from './components/TabProducts/Add/TabProduct';
import DeleteTabProduct from './components/TabProducts/Delete/DeleteTabProduct';
import ListTabProducts from './components/TabProducts/Liste/ListTabProducts';
import UpdateTabProduct from './components/TabProducts/Update/UpdateTabProduct';

//orders
import Orders from './components/Ordres/Add/Orders';
import ListOrders from './components/Ordres/Liste/ListOrders';
import ResetPassword from './components/users/ResetPass/ResetPassword';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Category Routes */}
        <Route path="/categories" element={<ListCategory />} />
        <Route path="/categories/add" element={<CreateCategory />} />
        <Route path="/categories/update/:id" element={<UpdateCategory />} />
        <Route path="/categories/delete" element={<DeleteCategory />} /> 

        {/* Product Routes */}
        <Route path="/produit" element={<ProductList />} />
        <Route path="/produit/add" element={<AddProduct />} />
        <Route path="/produit/update/:id" element={<UpdateProduct />} />

         {/* Generate images Routes */}
         <Route path="/generateimage" element={<CreateGeneratedImage />} />
         <Route path="/generateimage/delete" element={<DeleteGeneratedImage />} />
         <Route path="/generateimage/:userId" element={<ListGeneratedImagesByUserId />} />
      
        {/* Users Routes */}
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/delete/:id" element={<DeleteUser />} />
        <Route path="/users/forgotpass" element={<ForgotPass />} /> 
        <Route path="/users" element={<ListUsers />} /> 
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/users/signin" element={<SignIn />} />
        <Route path="/users/verify" element={<VerifyUser />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/users/resetpass" element={<ResetPassword/>} />



        {/* Panier Routes */}
        <Route path="/paniers" element={<Panier />} /> 
        <Route path="/paniers/list" element={<ListPanier />} /> 
        <Route path="/paniers/delete" element={<DeletePanier />} /> 

        {/* tab produit routes */}
        <Route path="/tabproduct" element={<TabProduct />} /> 
        <Route path="/tabproduct/delete" element={<DeleteTabProduct />} /> 
        <Route path="/tabproduct/liste" element={<ListTabProducts />} /> 
        <Route path="/tabproduct/update" element={<UpdateTabProduct/>} /> 


        {/* orders routes */}
        <Route path="/orders" element={<Orders />} /> 
        <Route path="/orders/list" element={<ListOrders />} /> 








      </Routes>
    </Router>
  );
}

export default App;
