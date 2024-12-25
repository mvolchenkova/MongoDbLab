import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../BecomeCoach/BecomeCoach.css';

export default function BecomeCoach() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [diploma, setDiploma] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDiplomaChange = (e) => {
        setDiploma(e.target.value); // Обновляем состояние диплома
    };

  

    return (
        <div className="becomeDiv">
            <form className="becomeForm">
                <h2>Welcome to our team!</h2>
                <div className="formGroup1">
                    <label htmlFor="diploma">Diploma (link)</label>
                    <input 
                        type="text" 
                        id="diploma" 
                        value={diploma} 
                        onChange={handleDiplomaChange} // Обработчик изменения
                        required 
                    />
                </div>
                <button type="submit" className="btnBecCoach" disabled={isLoading}>
                    {isLoading ? "Becoming a Coach..." : "Become a Coach"}
                </button>
            </form>
        </div>
    );
}