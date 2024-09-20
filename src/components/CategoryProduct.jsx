import React,{useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import Product from './Product'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from './context/cart';

const CategoryProduct = () => {

    const [products, setProduct] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    
    //console.log(id);

    //get all products
    const getAllProducts = async() => {
        try{
          
            const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/get-products`,
                {
                  method: 'GET',
                  headers : {
                    "Content-Type" :"application/json",
                    //"Authorization" : auth.token
                  },
                }
              );
              const data = await response.json();
              //console.log(data);
              
              setProduct(data.products)
        }catch(error){
            console.log(error);
            
            toast.error("Something went wrong");
        }
    }

   

    //console.log(id);
    useEffect(() => {
        getAllProducts();
        
    },[]);

    const handleCartItem = (item) => {
      const isInCart = cart.some(cartItem => cartItem._id === item._id);
      const updatedCart = isInCart ? cart.filter(cartItem => cartItem._id !== item._id) : [...cart, item];
      
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success(isInCart ? "Item removed from cart" : "Item added to cart");
    };


    return (
        <>
          <div>Product</div>
          <div>
            {products
              .filter(product => product.category._id === id) // Filter by category
              .map(product => {
                const isInCart = cart.some(cartItem => cartItem._id === product._id);
                return (
                <Product
                  key={product._id}
                  image={`https://e-commerce-hxgq.onrender.com/api/v1/product/product-photo/${product._id}`}
                  title={product.name}
                  price={product.price}
                  old_price={product.oldPrice} offer={product.off}
                  id={product._id}
                  onNavigate={() => navigate(`/product/${product.slug}`)}
                  BtnName={"More details"}
                  cartItem={() => handleCartItem(product)}
                  cart={isInCart ? "Remove from cart" : "Add to cart"}
                />
                )}
              )}
          </div>
        </>
      );
    };

export default CategoryProduct