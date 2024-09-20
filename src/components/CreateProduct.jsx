
import React,{useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import {  useAuth} from "./context/auth";
import { useNavigate } from 'react-router-dom';

import {Select} from "antd";
const {Option} = Select;

const CreateProduct = () => {
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
      });
      const navigate = useNavigate();
      const[auth, setAuth] = useAuth();

      //get All Category
      const getAllCategory = async() => {
        try{
            const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/category/get-category',
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
      const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/product/create-product',
        {
          method: 'POST',
          headers : {
            //"Content-Type" :"application/json",
            "Authorization" : auth.token
          },
          body: formData,
        }
      );
      
      const data = await response.json();
      //console.log("clicked");
      //console.log(data);

      if(data?.success){
        toast.success("Product Created Successfully...");
        navigate('/dashboard/products');

      }else{
        toast.error(data?.message);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const offer = (((productData.oldPrice - productData.price) / productData.oldPrice) * 100).toString().substring(0,2);

  return (
    <>
    <div>CreateProduct</div>
    <form onSubmit={handleSubmit}>
    <div className='select-box'>
      <Select variant={false} placeholder="Select Category" size='large'  showSearch onChange={(value) => {setProductData(preState => ({...preState, category: value}))}}>
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
        {productData.photo && (
          <div>
            <img src={URL.createObjectURL(productData.photo)} alt='product-photo' height={'200px'}></img>
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
        <input type='number' name='oldPrice' value={productData.oldPrice} placeholder='Old Price' onChange={handleValChange} />
      </div>
      <h5>{offer}</h5>
      <div>
        <input type='text' name='off' value={productData.off} placeholder='offer' onChange={handleValChange} />
      </div>
      <div>
        <input type='number' name='quantity' value={productData.quantity} placeholder='Quantity' onChange={handleValChange} />
      </div>
      <Select variant={false} placeholder='Select Shipping' size='large' showSearch onChange={(value) => {setProductData(preState => ({...preState, shipping: value}))}}>
        <Option value='0'>No</Option>
        <Option value='1'>Yes</Option>
      </Select>
    </div>
    <button>Create Product</button>
    </form>
    </>

  )
}

export default CreateProduct
