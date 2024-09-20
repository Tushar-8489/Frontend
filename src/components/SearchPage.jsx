import React from 'react'
import { useSearch } from './context/Search'
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/cart';
import toast from 'react-hot-toast'

const SearchPage = () => {
    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    const handleCartItem = (item) => {
      const isInCart = cart.some(cartItem => cartItem._id === item._id);
      const updatedCart = isInCart ? cart.filter(cartItem => cartItem._id !== item._id) : [...cart, item];
      
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success(isInCart ? "Item removed from cart" : "Item added to cart");
    };

  return (
    <div>
    <h1>SearchPage</h1>
        <h6>{values?.results.length < 1 ? "No Products Found " : `Found ${values?.results.length}`}</h6>
        <div>All Product</div>
    {values?.results.map((el) => {
      const isInCart = cart.some(cartItem => cartItem._id === el._id);
        return (
        
        <Product key={el._id} 
        image={`https://e-commerce-hxgq.onrender.com/api/v1/product/product-photo/${el._id}`} 
        title={el.name} 
        price={el.price} 
        old_price={el.oldPrice} 
        offer={el.off} 
        id={el._id} 
        onNavigate={() => navigate(`/product/${el.slug}`)} 
        BtnName={"More details"}
        cartItem={() => handleCartItem(el)}
        cart={isInCart ? "Remove from cart" : "Add to cart"}
        />
        )
    }
    )}
    <div></div>
    </div>
  )
}

export default SearchPage