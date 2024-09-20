import React from 'react'

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
            
            <input placeholder='Category Name' type='text' value={value} onChange={(e) =>setValue( e.target.value)}></input>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default CategoryForm