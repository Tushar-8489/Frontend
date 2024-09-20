
import React,{useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import {  useAuth} from "./context/auth";
import { useNavigate, useParams } from 'react-router-dom';

import {Select} from "antd";
const {Option} = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    let[productData, setProductData] = useState({
        name:"",
        description:"",
        price:"",
        oldPrice:"",
        off:"",
        category:"",
        quntity:"",
        photo:null,
        shipping:"",
        quantity:"",
        id:"",
      });
      const navigate = useNavigate();
      const[auth, setAuth] = useAuth();
      const params = useParams();
      const { id } = useParams();

      //get single Product
      const getSingleProduct = async() => {
        try{
          const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/get-products/${params.slug}`,
            {
              method: 'GET',
              headers : {
                "Content-Type" :"application/json",
              },
              //body: JSON.stringify(categories),
            }
          );
          const data = await response.json();
          //console.log(data);
          setProductData({
            name: data.product.name || '',
            description: data.product.description || '',
            price: data.product.price || '',
            oldPrice: data.product.oldPrice || '',
            off : data.product.off || '',
            category: data.product.category._id || '',
            quantity: data.product.quantity || '',
            shipping: data.product.shipping || '',
            id: data.product._id,
          });
        }catch(error){
          console.log(error);
        }
      };

      useEffect(() => {
        getSingleProduct()
      },[]);
 
      //get All Category
      const getAllCategory = async() => {
        try{
            const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/category/get-category',
                {
                  method: 'GET',
                  headers : {
                   // "Content-Type" :"application/json",
                  },
                  //body: JSON.stringify(categories),
                }
              );
              const data = await response.json();
              //console.log(data);
              if(data?.success){
                setCategories(data?.category);
              }
        } catch(error){
            console.log(error);
            toast.error("Something went wrong in getting category...")
        }
    };

    useEffect(() => {
        getAllCategory();
      },[]);

       // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData(prevState => ({
      ...prevState,
      [e.target.name]: file,
    }));
  };

  const handleValChange = (e) => {
    const value = e.target.value;
    setProductData(prevState => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in productData) {
        formData.append(key, productData[key]);
    }

    try{
      const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/update-product/${productData.id}`,
        {
          method: 'PUT',
          headers : {
            //"Content-Type" :"application/json",
            "Authorization" : auth.token
          },
          body: formData,
        }
      );

      //if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      //console.log("clicked");
      //console.log(data);

      if(data?.success){
        toast.success("Product Updated Successfully...");
        navigate('/dashboard/products');
        

      }else{
        toast.error(data?.message);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  const handleDelete = async() => {
    try{
      let answer = window.prompt("Are you sure want to delete this product");
      if(!answer) return;
      const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/delete-product/${productData.id}`,
        {
          method: 'DELETE',
          headers : {
            //"Content-Type" :"application/json",
            "Authorization" : auth.token
          },
          //body: formData,
        }
      );
      toast.success("Product Deleted Successfully...");
      navigate('/dashboard/products');
    }catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  const offer = (((productData.oldPrice - productData.price) / productData.oldPrice) * 100).toString().substring(0,2);

  return (
    <>
    <div><h1>Update Product</h1></div>
    
    <div className='select-box'>
      <Select variant={false} placeholder="Select Category" size='large'  showSearch onChange={(value) => {setProductData(preState => ({...preState, category: value}))}} value={productData.category}>
        {categories?.map(c => (
          <Option key={c._id} value={c._id}>{c.name}</Option>
        ))}
      </Select>
      <div>
        <label>
        {productData.photo ?  productData.photo.name : "Upload Photo"} 
          <input type='file' name='photo' accept='image/*' onChange={handleFileChange} hidden />
        </label>
      </div>
      <div>
        {productData.photo ? (
          <div>
            <img src={URL.createObjectURL(productData.photo)} alt='product-photo' height={'200px'}></img>
          </div>
        ) : (
          <div>
            <img src={`https://e-commerce-hxgq.onrender.com/api/v1/product/product-photo/${productData.id}`} alt='product-photo' height={'200px'}></img>
          </div>
        )}
      </div>
      <div>
        <input type='text' name='name' value={productData.name} placeholder='Write Name' onChange={handleValChange} />
      </div>
      <div>
        <textarea type='text' name='description' value={productData.description} placeholder='Write Description' onChange={handleValChange} />
      </div>
      <div>
        <input type='number' name='price' value={productData.price} placeholder='Price' onChange={handleValChange} />
      </div>
      <div>
        <input type='number' name='oldPrice' value={productData.oldPrice} placeholder='Price' onChange={handleValChange} />
      </div>
      <h5>{offer}</h5>
      <div>
        <input type='text' name='off' value={productData.off} placeholder='Offer' onChange={handleValChange} />
      </div>
      <div>
        <input type='number' name='quantity' value={productData.quantity} placeholder='Quantity' onChange={handleValChange} />
      </div>
      <Select variant={false} placeholder='Select Shipping' size='large' showSearch onChange={(value) => {setProductData(preState => ({...preState, shipping: value}))}} value={productData.shipping ? 'Yes' : 'No'}>
        <Option value='0'>No</Option>
        <Option value='1'>Yes</Option>
      </Select>
    </div>
    <button onClick={handleSubmit}>Update Product</button>
    <button onClick={handleDelete}>Delete</button>
    
    </>

  )
}

export default UpdateProduct;


