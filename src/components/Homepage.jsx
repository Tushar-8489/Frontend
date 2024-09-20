import React from 'react'
import Slider from "./Slider.jsx";
import AllProduct from "./AllProduct.jsx";
import Category from "./Category.jsx";
import Search from "./Search.jsx";
import { useAuth } from './context/auth.jsx';

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Search/>
      <Category/>
      <Slider/>
      <AllProduct/>
    </div>
  )
}

export default Homepage