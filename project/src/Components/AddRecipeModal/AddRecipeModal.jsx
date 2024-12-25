import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminAddRecipe } from '../../slices/recipeSlice';
import '../AddRecipeModal/AddRecipeModal.css';

const AddRecipeModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        instructions: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (recipeData.title.length < 10 || recipeData.title.length > 50) {
            return alert('Title should have between 10 and 50 characters.');
        }

        const data = {
            title: recipeData.title,
            time: recipeData.time, // Убедитесь, что это число
            instructions: recipeData.instructions,
        };

        try {
            await dispatch(adminAddRecipe(data)); // Отправка данных на сервер
            window.location.reload()
            onClose(); // Закрытие модального окна
        } catch (error) {
            console.error("Error creating recipe:", error);
            alert("Error creating recipe. Please try again.");
        }
    };

    const resetForm = () => {
        setRecipeData({
            title: '',
            time: '',
            instructions: ''
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
                <h2>Add Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <input name="title" type="text" placeholder="Title" value={recipeData.title} onChange={handleChange} required />
                    <input name="time" type="text" placeholder="Time" value={recipeData.time} onChange={handleChange} required />
                    <input name="instructions" type="text" placeholder="Add Instruction" value={recipeData.instructions} onChange={handleChange} required />

                    <button type="submit">Add Recipe</button>
                    <button type="button" onClick={handleClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeModal;