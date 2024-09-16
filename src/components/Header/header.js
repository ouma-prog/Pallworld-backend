import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Correct import for CSS
import logo from '../../assets/Palworld-Pokemon-Style-Logo.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span>PALWORLD E-SHOP</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className="nav-item">ACCUEIL</Link>
          <Link to="/users" className="nav-item">Gestion Users </Link>
          <Link to="/categories" className="nav-item">Gestion Catégories</Link>
          <Link to="/produit" className="nav-item">Gestion Produits</Link>
          <Link to="/users" className="nav-item">Gestion Users </Link>
          <Link to="/generateimage" className="nav-item">Generate Image </Link>
          <Link to="/paniers" className="nav-item">Gestion Panier </Link>
          <Link to="/tabproduct" className="nav-item">Tableau Produit</Link>
          <Link to="/orders" className="nav-item">orders </Link>


        </nav>

        {/* Icons */}
        <div className="icons">
          <Link to="/profile">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-badge">2</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
