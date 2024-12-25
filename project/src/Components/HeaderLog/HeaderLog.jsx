import './HeaderLog.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function HeaderLog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.users.currentUser);

   
    return (
        <header>
            <Link to="/">
                <img src="data/images/logo.png" alt="Logo" />
            </Link>
            <div className="options">
            
                {currentUser ? (
                    <>
                    <Link to="/bot" className="homelink">BOT</Link>
                        <Link to = "/homePage" className="homelink">HOME</Link>
                        {currentUser.sex === 'male' ? (
                            <img src="/data/images/boyProfile.png" alt="Boy Profile" className="profileImage" />
                        ) : (
                            currentUser.sex === 'female'&& (
                                <img src="data/images/girlProfile.png" alt="Girl Profile" className="profileImage" />
                            )
                        )}
                        <Link to='/account'>
                            <span className="userName PixelFont">{currentUser.name}</span>
                        </Link>
                        
                    </>
                ) : null}
            </div>
        </header>
    );
}