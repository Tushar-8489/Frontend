// src/SpinnerWheel.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SpinnerWheel.css';

const SpinnerWheel = () => {

  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue => --preValue))
    },1000);
    count === 0 && navigate('/login',{
      state: location.pathname,
    });
    return () => clearInterval(interval);
  },[count, navigate, location])

  return (
    <div className="spinner-container">
    <h1>redirecting to you in {count} second</h1>
      <div
        className={`spinner`}
      ></div>
    </div>
  );
};

export default SpinnerWheel;
