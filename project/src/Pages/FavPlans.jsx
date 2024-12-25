import HeaderLog from '../Components/HeaderLog/HeaderLog';
import Footer from '../Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findFavPlans, setCurrentPlan } from '../slices/tplanSlice';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';


export default function FavPlans() {
    const dispatch = useDispatch();
    const plans = useSelector(state=>state.trainingPlans.favPlans)
    console.log(plans)
    const isLoading = useSelector(state=>state.tplans)
    const userId = localStorage.getItem('userId')
    const [isModalOpen, setModalOpen] = useState(false);
    const favPlans = localStorage.getItem('favPlans')


    useEffect(() => {
        dispatch(findFavPlans()); 
    }, [dispatch]); 

    
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
        <>
            <HeaderLog />
            <div className="planDiv">
                    
                    {isLoading ? (
                        <p>Loading plans...</p>
                    ) : plans ? (
                        plans.map(plan => (
                            <div key={plan.idTplan} className="planData PixelFont">
                                <Link to='/plan' key={plan.idTplan} onClick={() => handlePlanClick(plan)} style={{ textDecoration: 'none' }}>
                                    <img src={`http://localhost:5000/${plan.img}`} alt={plan.title} className="planImg" />
                                    <div className="planText">
                                        <b>{plan.title}</b>
                                        <p>{plan.author}</p>
                                        <p>{plan.amount} trainings</p>
                                    </div>
                                </Link>
                               
                            </div>
                        ))
                    ) : (
                        <p>No plans found.</p>
                    )}
                </div>
            <Footer />
        </>
    );
}