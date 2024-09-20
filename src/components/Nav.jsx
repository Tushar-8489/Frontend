import React, { useState } from 'react';
import './Nav.css'; // Import CSS for styling
import HamburgerMenu from './Hamburger';
import { Link } from 'react-router-dom';
import { useAuth } from './context/auth';
import { useCart } from './context/cart';
import toast from 'react-hot-toast';
import cart_icon from '../assets/shopping-cart.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth,setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth, user:null,token:""
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <HamburgerMenu/>
        <Link to='/' className="navbar-logo">MyLogo</Link>
      </div>
      {
        !auth.user ? (<><Link className='navbar-link' id='nav-login' to='/login'>Login</Link></>) :
        (<><Link onClick={handleLogout} className='navbar-link' id='nav-logout' to='/'>Logout</Link></>)
      }
      
      <div className='cart'>
        <Link className='navbar-link' to='/cart'><img src={cart_icon}/></Link>
        <p>{cart?.length}</p>
      </div>
      
    </nav>
  );
};

export default Navbar;
