import React, { useContext } from 'react'
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import './Style/cartPage.css';
import { Button } from 'antd';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const totalPrice = () => {
    try{
      let total = 0;
      cart?.map(item => {total = total + item.price * item.quantity});
      return total;
    }
    catch(error){
      console.log(error);
    }
  }


  const removeCartItem = (id) => {
    try{
      let myCart = [...cart];
      let index = myCart.findIndex(item => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    }catch(error){
      console.log(error);
    }
  }

  const updateQuantity = (el, delta) => {
    try {
      const updatedCart = cart.map(item => {
        if (item._id === el._id) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(newQuantity, 1) }; // Prevent quantity from dropping below 1
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <>
    <div>
      <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
      <h3>
        {cart?.length  ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please Login to checkout..."}` : "Your Cart is Empty"}
      </h3>
      {cart?.map((el) => {
        return (
          <div className='cart-page' key={el._id}>
      <div>
        <img src={`https://e-commerce-hxgq.onrender.com/api/v1/product/product-photo/${el._id}`} width={'200px'} alt='image'/>
      </div>
      <div className='detail'>
          <h4>{el.name}</h4>
          <p>{el.description}</p>
          <p>&#8377;{el.price}</p>
          <button onClick={() => updateQuantity(el, -1)}>-</button>
              <span> {el.quantity} </span>
          <button onClick={() => updateQuantity(el, 1)}>+</button>
          <button id='remove' onClick={() => removeCartItem(el._id)}>Remove</button>
          
      </div>
      </div>

      )})}
     
      {auth?.user?.address ? (
        <>
          <div className='login-btn'>
            <h4>Delivery Address</h4>
            <h5>{auth?.user?.address}</h5>
            
            <button  onClick={() => navigate('/profile')}>Update Address</button>
          </div>
        </>
      ) : (
        <div className='login-btn' >
        {auth?.token ? (
          <button  onClick={() => navigate('/profile')}>Add Delivery Address</button>
        ) : (
          <button onClick={() => navigate('/login',{state:"/cart"})}>Login to Checkout</button>
        )}
        </div>
      )}
      <button id='payment-btn'>Proceed to pay &#8377;{totalPrice()}</button>
    </div>
    
    </>
  )
}

export default CartPage;