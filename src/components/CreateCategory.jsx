import React,{useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import CategoryForm from './form/CategoryForm';
import {  useAuth} from "./context/auth";
import { Link } from 'react-router-dom';
import {Modal} from 'antd';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const[auth, setAuth] = useAuth();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState();

    

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

    const handleSubmit = async(event) => {
      event.preventDefault();
      try{
        
        //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmJlZWNkYjI1Y2RkMGQ0Y2VlOGRiMzciLCJpYXQiOjE3MjM4OTAzNTQsImV4cCI6MTcyNDQ5NTE1NH0ej7TxPh9lDVdfz.efa_AGHkKlT_Jy9g0qj45BdHHYD_c";
        //console.log(auth.token);
        const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/category/create-category',
          {
            method: 'POST',
            headers : {
              "Content-Type" :"application/json",
              "Authorization" : auth.token
            },
            body: JSON.stringify({name}),
          }
        );

        const data = await response.json();
        if(data?.success){
          toast.success(`${name} is created`);
          getAllCategory();
        }else{
          toast.error(data.message);
        }
      }catch(error){
        console.log(error);
        toast.error("Something went wrong in Input Form...");
      }
    }

    useEffect(() => {
      getAllCategory();
    },[]);

    const handleUpdate = async(e) => {
      e.preventDefault();
      try{
        const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/category/update-category/${selected._id}`,
          {
            method: 'PUT',
            headers : {
              "Content-Type" :"application/json",
              "Authorization" : auth.token
            },
            body: JSON.stringify({name:updatedName}),
          }
        );
        const data = await response.json();
        //console.log(data);
        if(data.success){
          toast.success(`${updatedName} is Updated`);
          setSelected(null);
          setUpdatedName("");
          setVisible(false);
          getAllCategory();
        }else{
          toast.error(data.message);
        }
      }catch(error){
        toast.error("Something went wrong...");
      }
    }

    //delete method
    const handleDelete = async(Pid) => {
      try{
        const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/category/delete-category/${Pid}`,
          {
            method: 'DELETE',
            headers : {
              "Content-Type" :"application/json",
              "Authorization" : auth.token
            },
          }
        );
        const data = await response.json();
        //console.log(data);
        if(data.success){
          toast.success(`Category is Deleted`);
          getAllCategory();
        }else{
          toast.error(data.message);
        }
      }catch(error){
        toast.error("Something went wrong...");
      }
    }

  return (
    <>
    <div>Category</div>
    <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        
            {categories?.map((c) => (
              <tr key={c._id}>
              <>
              <td >{c.name}</td>
              <td>
              <button onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
              <button onClick={() => {handleDelete(c._id)}}>Delete</button>
              </td>
              </>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
      <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
    </Modal>
    </>
  )
}

export default CreateCategory;