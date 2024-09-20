import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import '../Register.css';

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (auth?.user) {
            const { email, name, phone, address } = auth.user;
            setFormData({
                name: name || '',
                email: email || '',
                phone: phone || '',
                address: address || '',
                password: '', // Password field should not be pre-filled
            });
        }
    }, [auth?.user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : auth.token,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth(prevAuth => ({ ...prevAuth, user: data?.updatedUser }));
                localStorage.setItem('auth', JSON.stringify({ ...JSON.parse(localStorage.getItem('auth')), user: data.updatedUser }));
                toast.success('Profile Updated Successfully');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Something Went Wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Your Profile</h1>
            <div className='register'>
                <div className='inner-box'>
                    <form onSubmit={handleSubmit}>
                        <h1>Update Profile</h1>
                        <br />
                        <label>Name</label>
                        <input
                            placeholder='Enter Name'
                            name='name'
                            value={formData.name || ''} // Ensure a default value
                            onChange={handleInputChange}
                        />
                        <label>Email</label>
                        <input
                            placeholder='Email'
                            name='email'
                            type='email'
                            value={formData.email || ''} // Ensure a default value
                            onChange={handleInputChange}
                            disabled
                            aria-disabled="true"
                        />
                        <label className='phone'>Phone No.</label>
                        <input
                            placeholder='Phone'
                            name='phone'
                            value={formData.phone || ''} // Ensure a default value
                            onChange={handleInputChange}
                        />
                        <label className='phone'>Password</label>
                        <input
                            placeholder='Password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password || ''} // Ensure a default value
                            onChange={handleInputChange}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='password-toggle'
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                        <label className='phone'>Address</label>
                        <input
                            placeholder='Address'
                            name='address'
                            value={formData.address || ''} // Ensure a default value
                            onChange={handleInputChange}
                        />
                        <button className='reg-btn' type='submit' disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
