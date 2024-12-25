import '../AllPlans/AllPlans.css';
import AddPlanModal from '../AddPlanModal/AddPlanModal';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainingPlans, setCurrentPlan } from '../../slices/tplanSlice'; 

export default function AllPlans() {
    const dispatch = useDispatch();
    const plans = useSelector(state => state.trainingPlans.plans);
    const status = useSelector(state => state.trainingPlans.status);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [getInput, setInput] = useState('');
    const [favorites, setFavorites] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const role = localStorage.getItem('role')
    const isLoading = status === 'loading';
    const userId = localStorage.getItem('userId')
    const user = (localStorage.getItem('currentUser'))
    const favPlans = localStorage.getItem('favPlans')
    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchTrainingPlans());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setFilteredPlans(plans);
    }, [plans]);

    const handleGetInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = () => {
        if (getInput.trim() === '') {
            setFilteredPlans(plans);
        } else {
            const searchPlans = plans.filter(item =>
                item.title.toLowerCase().includes(getInput.toLowerCase()) ||
                item.level.toLowerCase().includes(getInput.toLowerCase())
            );
            setFilteredPlans(searchPlans);
        }
    };

    

    const handlePlanClick = (plan) => {
        dispatch(setCurrentPlan(plan)); // Устанавливаем текущий план
    };

    const handleAddPlan = () => {
        setModalOpen(true); // Open the modal
    };
    const closeModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        <main className="allPlansMain">
            <p className="PixelFont allPlansTitle">
                Lose weight, gain weight or always stay in shape - choose what's right for you!
            </p>
            
            <div className="plans">
                <div className="searchFilter">
                    <input
                        className="inputSearch"
                        type="text"
                        placeholder='Search'
                        value={getInput}
                        onChange={handleGetInput}
                    />
                    <button onClick={handleSearch} className="searchButton">Search</button>
                </div>
                <div className="planDiv">
                    
                    {isLoading ? (
                        <p>Loading plans...</p>
                    ) : filteredPlans ? (
                        filteredPlans.map(plan => (
                            <div key={plan.idTplan} className="planData PixelFont">
                                <Link to='/plan' onClick={() => handlePlanClick(plan)} style={{ textDecoration: 'none' }}>
                                    <div className="planText">
                                        <b>{plan.title}</b>
                                        <p>{plan.amount} trainings</p>
                                        <p>{plan.level}</p>
                                    </div>
                                </Link>
                                
                            </div>
                        ))
                    ) : (
                        <p>No plans found.</p>
                    )}
                </div>
            </div>
            { ( role == 'admin' || role == 'trainer' ) &&(
                <div className=''>
                    <button onClick={handleAddPlan}>ADD PLAN</button>
                </div>
            )}
            
            <AddPlanModal isOpen={isModalOpen} onClose={closeModal} /> 
        </main>
    );
}