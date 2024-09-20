import React,{useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import Product from './Product'
import { Link } from 'react-router-dom';

const AdminProduct = () => {
    const [product, setProduct] = useState([]);
    const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

    //get all products
    const getAllProducts = async() => {
        try{
          setLoading(true);
            const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/product-list/${page}`,
                {
                  method: 'GET',
                  headers : {
                    "Content-Type" :"application/json",
                    //"Authorization" : auth.token
                  },
                }
              );
              const data = await response.json();
              setLoading(false);
              setProduct(data.products)
        }catch(error){
            console.log(error);
            setLoading(false);
            toast.error("Something went wrong");
        }
    }


    const getTotal = async() => {
      try{
        const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/product/product-count',
          {
            method: 'GET',
            headers : {
              "Content-Type" :"application/json",
              //"Authorization" : auth.token
            },
          }
        );
        const data = await response.json();
        setTotal(data?.total);
      }catch(error){
        console.log(error);
      }
    };


    useEffect(() => {
      if(page === 1) return;
      loadMore();
    },[page])

    const loadMore = async() => {
      try{
        setLoading(true);
        const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/product-list/${page}`,
          {
            method: 'GET',
            headers : {
              "Content-Type" :"application/json",
              //"Authorization" : auth.token
            },
          }
        );
        
        const data = await response.json();
        setLoading(false);
        setProduct((prevProducts) => [...prevProducts, ...data.products])
      }
      catch(error){
        console.log(error);
        setLoading(false);
      }
    }

    useEffect(() => {
        getAllProducts();
        getTotal();
    },[]);

  return (
    <>
    <div>All Product</div>
    {product?.map((el) => {
        return (
        <Link style={{textDecoration: "none", color:"black"}} key={el._id} to={`/dashboard/products/${el.slug}`}>
        <Product  image={`https://e-commerce-hxgq.onrender.com/api/v1/product/product-photo/${el._id}`} title={el.name} price={el.price} old_price={el.oldPrice} id={el._id} offer={el.off}/>
        </Link>
        )
    }
    )}
    <div>
      {product && product.length < total && (
        <button onClick={(e) => {
          e.preventDefault();
          setPage(page+1);
        }}>
          {loading ? "Loading ..." : "Loadmore"}
        </button>
      )}
    </div>
    </>
  )
}

export default AdminProduct