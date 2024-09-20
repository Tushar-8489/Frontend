import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DeletePhoto = () => {
    const [images, setImages] = useState([]);
    const [auth] = useAuth();
    const navigate = useNavigate();

    const getAllPhotos = async () => {
        try {
            const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/photo/get-photo', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth.token
                },
            });
            const data = await response.json();
            if (data?.photos) {
                setImages(data.photos.map(photo => ({
                    ...photo,
                    url: `https://e-commerce-hxgq.onrender.com/api/v1/photo/photo/${photo._id}`
                })));
            } else {
                toast.error("No photos found");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllPhotos();
    }, [auth.token]);

    const handleDelete = async (photoId) => {
        try {
            let answer = window.confirm("Are you sure you want to delete this photo?");
            if (!answer) return;
            const response = await fetch(`https://e-commerce-hxgq.onrender.com/api/v1/photo/delete-photo/${photoId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": auth.token
                },
            });
            if (response.ok) {
                toast.success("Photo deleted successfully");
                setImages(images.filter(photo => photo._id !== photoId));
            } else {
                toast.error("Failed to delete photo");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <h3>Delete Photos</h3>
            <div className="photo-list">
                {images.length > 0 ? (
                    images.map(photo => (
                        <div key={photo._id} className="photo-item">
                            <img src={photo.url} alt={`Photo ${photo._id}`} height="100" />
                            <button onClick={() => handleDelete(photo._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </div>
        </div>
    );
}

export default DeletePhoto;
