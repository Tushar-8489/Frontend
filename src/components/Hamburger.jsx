import React, { useState } from 'react';
import './HamburgerMenu.css'; // Import CSS for styling
import Ham_icon from '../assets/menu.png';
import { Link } from 'react-router-dom';


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <div className="hamburger-container">
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <img src={Ham_icon}></img>
      </div>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
          <li>
           <Link to="/user/details">Account Info</Link>
           </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
