import React, {useState}from 'react'
import './Register.css'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from './context/auth';

const Login = () => {

  let[formData, setFormData] = useState({
    email:"",
    password:""
  });

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSubmit = async(event) => {
    event.preventDefault();
    //console.log(formData);

    try{
      const res = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/auth/login',
        {
          method: 'POST',
          headers : {
            "Content-Type" :"application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      //console.log(formData);
      
        const data = await res.json();
        if(data.success){
          toast.success(data.message);
          setAuth({
            ...auth,
            user: data.user,
            token:data.token
          });
          localStorage.setItem('auth', JSON.stringify(data));
        navigate(location.state || "/");
        }
      else{
        toast.error(data.message);
      }
      //console.log(res);
      
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='register'>
        <div className='inner-box'>
        
          <form onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <br/>
          <hr/>
          <br/>
            <label>Email</label>
            <input placeholder='Email' name='email'  type='email' value={formData.email} onChange={handleInputChange} required/>
            <label className='phone'>Password</label>
            <input placeholder='Password' name='password' type='password'  value={formData.password} onChange={handleInputChange} required/>
            <button className='reg-btn'>Log In</button>
            <p><Link className='text' to='/forgot-password'>Forgot Password</Link></p>
            <p>If you haven't Account?<Link className='text' to='/signup' >SignUp</Link></p>
          </form>
        </div>
    </div>
  )
}

export default Login