import React, { createContext, useState } from 'react'
import './Product.css';


const Product = (props) => {
  
  const {image, title, price, old_price, onNavigate, BtnName, offer, cartItem, cart} = props;

 

  return (
    <>
    <div className='product-box'>
    <div className='img-box'>
        <img src={image}></img>
        </div>
        <div className='info-box'>
        <h3>{title}</h3>
        <div className='price'>
        <p>&#8377;<b>{price}</b></p>
        <p>&#8377;{old_price}</p>
        <p>{offer}% off</p>
        </div>
        <div  className='btns'>
        <div className='btn-class'>
        <button onClick={cartItem}>{cart}</button>
          
        <button onClick={onNavigate}>{BtnName}</button>
        </div>
        </div>
        </div>
    </div>
    </>
    
  )
}

export default Product;
