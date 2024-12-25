// AddUserModal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminAddUser } from '../../slices/userSlice';
import './AddUserModal.css'

const AddUserModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(adminAddUser(userData));
        onClose(); 
        setUserData({name: '', email: '', password: '' }); // Reset form
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" type="text" placeholder="Name" value={userData.name} onChange={handleChange} required />
                    <input name="email" type="tel" placeholder="Email" value={userData.email} onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
                    
                    <button type="submit">Add User</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;