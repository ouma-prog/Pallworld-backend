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
import ListGeneratedImagesByUserId from './components/GenerateImmage/Liste/listById';


//users
import AddUser from './components/users/Add/AddUser';
import DeleteUser from './components/users/Delete/deleteUser';
import ForgotPass from './components/users/ForgotPass/ForgotPass';
import ListUsers from './components/users/Liste/ListUsers';
import UpdateUser from './components/users/Update/UpdateUser';
import SignIn from './components/users/SignIn/SignIn';
import VerifyUser from './components/users/Verify/VerifyUser';

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
        <Route path="users/verify" element={<VerifyUser />} />


      </Routes>
    </Router>
  );
}

export default App;
