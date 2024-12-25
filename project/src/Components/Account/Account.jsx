import '../Account/Account.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const dispatch = useDispatch();
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const openChangePasswordModal = () => setIsChangePasswordOpen(true);
    const closeChangePasswordModal = () => setIsChangePasswordOpen(false);

    return (
        <main className="accMain PixelFont">
            <div className="accDiv">
                <div>
                    {currentUser ? (
                        <div className='acc'>
                            <div className="accDiv1">
                                {currentUser.sex === 'male' ? (
                                    <img src="/data/images/boyProfile.png" alt="Boy Profile" className="profileImageAcc" />
                                ) : (
                                    currentUser.sex === 'female' && (
                                        <img src="/data/images/girlProfile.png" alt="Girl Profile" className="profileImageAcc" />
                                    )
                                )}
                                <div className="nameSurname">
                                    <p className="userName PixelFont">{currentUser.name}</p>
                                    <p className='userName PixelFont'>{currentUser.surname}</p>
                                </div>
                            </div>
                            <div className='otherInfo'>
                                <p>PHONE: {currentUser.phone}</p>
                                <p>BIRTH DATE: {currentUser.birthdate}</p>
                            </div>
                            <div className='accButtons PixelFont'>
                                <button >CHANGE PASSWORD</button>
                            </div>
                        </div>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
                
                {isChangePasswordOpen && (
                    <div className="modal">
                        <div className="modalContent">
                            <h2>Change Password</h2>
                            <label>
                                Current Password:
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </label>
                            <label>
                                New Password:
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                            <button>Change Password</button>
                            <button onClick={closeChangePasswordModal}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}