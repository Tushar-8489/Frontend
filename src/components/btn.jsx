import React, { useState } from 'react'
import './btn.css';



const btn = ({handleSubmit, name}) => {
  return (
    <div className='btn-class'>
        <button onClick={handleSubmit}>{name}</button>
    </div>
  )
}

export default btn