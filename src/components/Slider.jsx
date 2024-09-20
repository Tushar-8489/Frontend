import React, { useState, useEffect } from 'react';
import '../components/Slider.css';

function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    
    const getAllProducts = async() => {
        try{
          
            const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/photo/get-photo`,
                {
                  method: 'GET',
                  headers : {
                    "Content-Type" :"application/json",
                    //"Authorization" : auth.token
                  },
                }
              );
              const data = await response.json();
              if (data?.photos) {
                setImages(data.photos.map(product => `https://e-commerce-hxgq.onrender.com/api/v1/photo/photo/${product._id}`));
            } else {
                toast.error("No products found");
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        // Set up an interval to change the slide every 5 seconds
        const intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
    
        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
      }, [images]);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <div className='main-box'>
        <button className='btn' onClick={handlePrev}>Prev</button>
        <div className="slider">
            <img src={images[currentIndex]} alt="Slider Image" />
            <div className="carousel-indicators">
            {images.map((_, index) => (
            <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
          ))}
          </div>
        </div>
        
            <button className='btn' onClick={handleNext}>Next</button>
           
          
        </div>
    );
}

export default Slider;
