import React, {useState} from 'react'
import './Register.css'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ForgotPassword = () => {

    let[formData, setFormData] = useState({
        email:"",
        newPassword:"",
        answer:""
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
    
      const handleSubmit = async(event) => {
        event.preventDefault();
        //console.log(formData);
    
        try{
          const res = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/auth/forgot-password',
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
            navigate( "/login");
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
      <h1>Forgot Password</h1>
      <br/>
      <hr/>
      <br/>
        <label>Email</label>
        <input placeholder='Email' name='email'  type='email' value={formData.email} onChange={handleInputChange} required/>
        <label>Question</label>
        <input placeholder='What is Your Favourite Sport?' name='answer'  type='text' value={formData.answer} onChange={handleInputChange} required/>
        <label className='phone'>Password</label>
        <input placeholder='Enter new Password' name='newPassword' type='password'  value={formData.newPassword} onChange={handleInputChange} required/>
        <button className='reg-btn'>Reset Password</button>
        <p>If you haven't Account?<Link className='text' to='/signup' >SignIn</Link></p>
      </form>
    </div>
</div>
  )
}

export default ForgotPassword