import React, { useEffect, useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    const toggle = document.getElementById('visual-toggle');

    function applyModePreference() {
      const mode = localStorage.getItem('mode');
      if (mode === 'light') {
        toggle.checked = true;
        document.body.classList.add('lightcolors');
        document.getElementById('visual-toggle-button').classList.add('lightmode');
      } else {
        toggle.checked = false;
        document.body.classList.remove('lightcolors');
        document.getElementById('visual-toggle-button').classList.remove('lightmode');
      }
    }

    applyModePreference();

    toggle.addEventListener('change', function () {
      if (toggle.checked) {
        localStorage.setItem('mode', 'light');
        document.body.classList.add('lightcolors');
        document.getElementById('visual-toggle-button').classList.add('lightmode');
      } else {
        localStorage.setItem('mode', 'dark');
        document.body.classList.remove('lightcolors');
        document.getElementById('visual-toggle-button').classList.remove('lightmode');
      }
    });
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
        <a href="#app-download" onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact us</a>
      </ul>

      <div className="navbar-right">
        <div className="navbar">
          <label htmlFor="visual-toggle" id="visual-toggle-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="svgIcon-toggle sun-svg" viewBox="0 0 24 24">
              <g fill="#f1bd00">
                <circle r="5" cy="12" cx="12"></circle>
                <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1-.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-.75.29zm-12.02 12.02a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1-.7.24zm6.36-14.36a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm0 17a1 1 0 0 1-1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1-1 1zm-5.66-14.66a1 1 0 0 1-.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.29zm12.02 12.02a1 1 0 0 1-.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1-.71.24z"></path>
              </g>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" className="svgIcon-toggle moon-svg" fill="#f9ba48" viewBox="0 0 384 512">
              <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
            </svg>

            <input type="checkbox" className="visual-toggle" id="visual-toggle" />
          </label>
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart"><img className="basketlogo" src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button className="signbutton" onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} className="white-filter" alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
