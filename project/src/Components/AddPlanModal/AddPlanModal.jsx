import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { adminAddPlan } from '../../slices/tplanSlice';
import '../AddPlanModal/AddPlanModal.css';
import axios from 'axios';

const AddPlanModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [planData, setPlanData] = useState({
        title: '',
        amount: '',
        level: ''
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlanData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Проверка длины заголовка
        if (planData.title.length < 10 || planData.title.length > 50) {
            return alert('Title should have between 10 and 50 characters.');
        }
    
        // Преобразование amount в число
        const parsedAmount = parseFloat(planData.amount);
        if (isNaN(parsedAmount)) {
            return alert('Amount must be a valid number.');
        }
    
        const formData = {
            title: planData.title,
            amount: parsedAmount,
            level: planData.level,
        };
    
        // Диспетчеризация действия для добавления плана
        await dispatch(adminAddPlan(formData));
        resetForm(); 
        window.location.reload()
        onClose(); 
    };
    
    const resetForm = () => {
        setPlanData({
            title: '',
            amount: '',
            level: ''
        });
    };
    
    const handleClose = () => {
        resetForm(); 
        onClose(); 
    };

    if (!isOpen) return null;


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Plan</h2>
                <form onSubmit={handleSubmit}>
                    <input id="addPlInput" name="title" type="text" placeholder="Title" value={planData.title} onChange={handleChange} required />
                    <input id="addPlInput" name="amount" type="text" placeholder="Amount" value={planData.amount} onChange={handleChange} required />
                    <input id="addPlInput" name="level" type="text" placeholder="Level" value={planData.level} onChange={handleChange} required />

                    <button type="submit">Add Plan</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                </form>
            </div>
           
        </div>
    );
};

export default AddPlanModal;