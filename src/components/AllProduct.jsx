
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Product from './Product';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './context/cart';
import './btn.css';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Fetch all products
  const fetchProducts = async (pageNum) => {
    try {
      setLoading(true);
      const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/product-list/${pageNum}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setProducts((prevProducts) => pageNum === 1 ? data.products : [...prevProducts, ...data.products]);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch total number of products
  const fetchTotalProducts = async () => {
    try {
      const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/product/product-count', {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setTotal(data?.total);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch products and total on component mount
  useEffect(() => {
    fetchProducts(page);
    fetchTotalProducts();
  }, [page]);

  // Load more products when page changes
  useEffect(() => {
    if (page > 1) fetchProducts(page+1);
  }, [page]);

  // Handle adding/removing item from cart
  const handleCartItem = (item) => {
    const isInCart = cart.some(cartItem => cartItem._id === item._id);
    const updatedCart = isInCart ? cart.filter(cartItem => cartItem._id !== item._id) : [...cart, item];
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(isInCart ? "Item removed from cart" : "Item added to cart");
  };

  

  return (
    <>
      <div>All Products</div>
      {products.map((product) => {
        const isInCart = cart.some(cartItem => cartItem._id === product._id);
        return (
        <Product
          key={product._id}
          image={`https://e-commerce-hxgq.onrender.com/api/v1/product/product-photo/${product._id}`}
          title={product.name}
          price={product.price}
          old_price={product.oldPrice}
          offer={product.off}
          id={product._id}
          onNavigate={() => navigate(`/product/${product.slug}`)}
          BtnName="More details"
          cartItem={() => handleCartItem(product)}
          cart={isInCart ? "Remove cart" : "Add to cart"}
        />
       );
       })}
      <div style={{ display : 'flex', justifyContent: 'center'}}>
        { products.length < total  &&(
          <div className='btn-class'>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setPage(prevPage => prevPage + 1);
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProduct;
