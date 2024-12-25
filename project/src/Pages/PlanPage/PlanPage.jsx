import React, { useEffect, useState } from 'react';
import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTrainingPlan, updateTrainingPlan } from '../../slices/tplanSlice';
import UpdatePlanModal from '../../Components/UpdatePlanModal/UpdatePlanModal'; 
import '../PlanPage/PlanPage.css';
import { useNavigate } from 'react-router-dom'; 

export default function PlanPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentPlan = useSelector((state) => state.trainingPlans.currentPlan);
    const role = localStorage.getItem('role')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeletePlan = async () => {
        if (currentPlan && window.confirm('Are you sure you want to delete this plan?')) {
            await dispatch(deleteTrainingPlan(currentPlan._id));
            navigate('/allPlans'); 
            window.location.reload()
        }
    };

    useEffect(() => {
        if (!currentPlan) {
            navigate('/allPlans'); 
        }
    }, [currentPlan, navigate]);

    if (!currentPlan) {
        return <p>Loading...</p>; 
    }

    return (
        <>
            <HeaderLog />
            <main className='planMain'>
                <div className='imgDescrPlan'>
                    <img src={`http://localhost:5000/${currentPlan.img}`} alt="" />
                    <div>
                        <p className="planTitle">{currentPlan.title}</p>
                        <p className='planDescr'>Amount: {currentPlan.amount}</p>
                        <p className='planDescr'>Level: {currentPlan.level}</p>
                    </div>
                </div>
               
                {( role == 'admin' || role == 'trainer' )&&(
                <div className='buttons'>
                    <button onClick={handleDeletePlan}>DELETE PLAN</button>
                    <button onClick={() => setIsModalOpen(true)}>UPDATE PLAN</button>
                </div>
                
                )}
            </main>
            
            
            <Footer />
            <UpdatePlanModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                currentPlan={currentPlan}
            />
        </>
    );
}