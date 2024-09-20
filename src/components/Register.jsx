import React, { useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/auth';
//import dotenv from 'dotenv';

//dotenv.config();

const Register = () => {

  let[formData, setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    answer:"",
  });

  const navigate = useNavigate();

  let handleInputChange = (event) => {
    let fieldName = event.target.name;
    let newValue = event.target.value;

    setFormData( (cuuData) => {
      cuuData[fieldName] = newValue;
      return {...cuuData, [fieldName] : newValue};
    })
    //console.log(fieldName);
    //console.log(newValue);
  }

  let handleSubmit = async(event) => {
    event.preventDefault();
    //console.log(formData);
    //toast.success('Registration Successfuly');
    /*
    try{
      
        const res = await Axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, formData);
        if(res.data.success){
          alert(res.data.message);
          navigate("/login");
        }else{
          console.log(res.data.message);
        }
          */

        try{

      const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/auth/register',
        {
          method: 'POST',
          headers : {
            "Content-Type" :"application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      
      const data = await response.json();
      
      if(data.success){
        toast.success(data.message);
        navigate("/");
      }else{
        toast.error(data.message);
      }
    } catch(error){
      console.log('register', error);
      toast.error("Something Went Wrong");
    }
      /*
      .then(event => event.json())
      .then(() => {
        console.log("Form submitted");
      })
      .catch(event => {
        console.log(event.message);
      })
/*
    }catch(error){
      console.log(error);
    }
      */
    setFormData({
      name:'',
      email:'',
      phone:'',
      password:''
    });
  }
    
  //console.log(env.REACT_APP_API);


  return (
    <div className='register'>
    
        <div className='inner-box'>
        
          <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <br/>
            <label>Name</label>
            <input placeholder='Enter Name' name='name' value={formData.name} onChange={handleInputChange} required/>
            <label>Email</label>
            <input placeholder='Email' name='email' type='email' onChange={handleInputChange} value={formData.email} required/> 
            <label className='phone'>Phone No.</label>
            <input placeholder='Phone' name='phone' onChange={handleInputChange} value={formData.phone} required/>
             <label className='phone'>Password</label>
            <input placeholder='Password' name='password' onChange={handleInputChange} value={formData.password} required/>
            <label className='phone'>Question</label>
            <input placeholder='What is Your Favourite Sport ?' name='answer' type='text' onChange={handleInputChange} value={formData.answer} required/>
            <button className='reg-btn'>Register</button>
            <p>If you have already Account?<Link className='text' to='/login' >LogIn</Link></p>
          </form>
        </div>
    </div>
  )
}

export default Register