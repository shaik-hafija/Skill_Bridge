import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: '',
        InterestedAreas: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_user_details', { withCredentials: true });
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put('http://localhost:5000/edit_profile', formData, { withCredentials: true });
            setUser(response.data.user || response.data.profession);
            setEditMode(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>

            {!editMode ? (
                <div className="profile-info">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone_number}</p>
                    <p>Interested Areas: {user.InterestedAreas}</p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="profile-edit">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                    <input
                        type="text"
                        name="InterestedAreas"
                        value={formData.InterestedAreas}
                        onChange={handleChange}
                        placeholder="Interested Areas"
                    />
                    <button onClick={handleUpdateProfile}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
