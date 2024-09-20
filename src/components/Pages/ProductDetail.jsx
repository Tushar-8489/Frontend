import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Btn from '../btn.jsx';
import Product from '../Product.jsx';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart.jsx';
import toast from 'react-hot-toast';
import './Style/productDetail.css';


const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const[warning,setWarning] = useState(false);




  useEffect(() => {
    if(params?.slug) getProduct()
  },[params?.slug])

  //get Products
  const getProduct = async() => {
    try{
      const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/get-products/${params.slug}`,
        {
          method: 'GET',
          headers : {
            "Content-Type" :"application/json",
            //"Authorization" : auth.token
          },
        }
      );
      const data  = await response.json();
      //console.log(data);
      setProduct(data?.product)
      getSimilarProduct(data?.product._id, data?.product.category._id);
    }catch(error){
      console.log(error);
    }
  }

  const getSimilarProduct = async(pid, cid) => {
    try{
      const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/related-product/${pid}/${cid}`,
        {
          method: 'GET',
          headers : {
            "Content-Type" :"application/json",
            //"Authorization" : auth.token
          },
        }
      );
      const data  = await response.json();
      setRelatedProduct(data?.products);
    }catch(error){
      console.log(error);
    }
  }

  const handleCartItem = (item) => {
    const isInCart = cart.some(cartItem => cartItem._id === item._id);
    const updatedCart = isInCart ? cart.filter(cartItem => cartItem._id !== item._id) : [...cart, item];
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(isInCart ? "Item removed from cart" : "Item added to cart");
  };

  const isInCart = cart.some(cartItem => cartItem._id === product._id);

  return (
    <div>
    
    <h1>{product.name}</h1>
    <div className='product-detail'>
    
      <img src={`https://e-commerce-hxgq.onrender.com/api/v1/product/product-photo/${product._id}`}/>
  
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className='price-btn'>
      <div id='price'>
      <p>Price : &#8377;{product.price}</p>
      <p id='old'>&#8377;{product.oldPrice}</p>
      <p id='offer'>{product.off}% off</p>
      </div>
      <Btn 
      handleSubmit={() => handleCartItem(product)}
      name={isInCart ? "Remove cart" : "Add to cart"}
     />
     </div>
    </div>
    </div>
      <br />
      <hr />
      <div>
      <h2>Similar Products :</h2>
      <div className='related-product'>
      {relatedProduct?.map((el) => {
        const isInCart = cart.some(cartItem => cartItem._id === el._id);
        return (
        
        <Product key={el._id} image={`https://e-commerce-hxgq.onrender.com/api/v1/product/product-photo/${el._id}`} 
        title={el.name} 
        price={el.price} 
        old_price={el.oldPrice} 
        offer={el.off} 
        id={el._id} 
        onNavigate={() => navigate(`/product/${el.slug}`)} 
        BtnName={"More details"}
        cartItem={() => handleCartItem(el)}
        cart={isInCart ? "Remove cart" : "Add to cart"}
        />
        
        )
    }
    )}
      </div>
      </div>
    </div>
  )
}

export default ProductDetail