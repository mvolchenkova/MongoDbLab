import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTrainingPlan } from '../../slices/tplanSlice'; 
import '../UpdatePlanModal/UpdatePlanModal.css'

const UpdatePlanModal = ({ isOpen, onClose, currentPlan }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('');

    useEffect(() => {
        if (currentPlan) {
            setTitle(currentPlan.title);
            setLevel(currentPlan.level);
        }
    }, [currentPlan]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPlan = { title, level };
        await dispatch(updateTrainingPlan({ id: currentPlan._id, ...updatedPlan }));
        window.location.reload()
        onClose(); // Close the modal after submitting
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Training Plan</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <textarea
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        placeholder="Level"
                        required
                    />
                    <button type="submit">Update Plan</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePlanModal;