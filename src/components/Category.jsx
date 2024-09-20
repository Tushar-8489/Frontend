import React,{useState, useEffect} from 'react'
import { useAuth } from './context/auth.jsx';
import Btn from './btn.jsx'
import './category.css';
import { Link } from 'react-router-dom';



const Category = () => {

  const [categories, setCategories] = useState([]);

  const getAllCategory = async() => {
    try{
        const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/category/get-category',
            {
              method: 'GET',
              headers : {
                "Content-Type" :"application/json",
              },
              
            }
          );
          const data = await response.json();
        
          if(data?.success){
            setCategories(data?.category);
          }
    } catch(error){
        console.log(error);
    }
};

//Category Filter


useEffect(() => {
  getAllCategory();
},[]);

  

  return (
    <div className='category'>

    {categories?.map(c => (
      <Link style={{textDecoration: "none", color:"black"}} key={c._id} to={`/product/category/${c._id}`}>
      <Btn  key={c._id} name={c.name} />
      </Link>
    ))}
    </div>
  )
}

export default Category