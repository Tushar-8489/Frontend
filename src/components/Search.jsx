import React from 'react';
import { useSearch } from './context/Search';
import { useNavigate } from 'react-router-dom';
import './Searchinput.css' // Import CSS for styling

const SearchInput = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  const handleChange = async(event) => {
    event.preventDefault();
    try{
        const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/product/search/${values.keyword}`,
          {
            method: 'GET',
            headers : {
              "Content-Type" :"application/json",
              //"Authorization" : auth.token
            },
          }
        );
        const data = await response.json();
        setValues({ ...values, results: data});
        navigate('/search');
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div className="search-input-container">
    <form onSubmit={handleChange}>
      <input
        type="search"
        value={values.keyword}
        onChange={(e) => setValues({...values, keyword: e.target.value})}
        placeholder="Search..."
        className="search-input"
      />
       <button type='submit'>serach</button>
      </form>
    </div>
  );
};

export default SearchInput;
