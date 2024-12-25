import HeaderLog from '../Components/HeaderLog/HeaderLog';
import Footer from '../Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { findFavRecipes, setCurrentRecipe } from '../slices/recipeSlice';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';


export default function FavRecipes() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes.favRecipes)
   
    const isLoading = useSelector(state => state.recipes.loading)
    const userId = localStorage.getItem('userId')
    const [isModalOpen, setModalOpen] = useState(false);
    const favRecipes = localStorage.getItem('favRecipes')


    useEffect(() => {
        dispatch(findFavRecipes()); 
    }, []); 
    console.log(isLoading)
    

    const handleRecipeClick = (recipe) => {
        dispatch(setCurrentRecipe(recipe)); // Устанавливаем текущий план
    };

    const handleAddRecipe = () => {
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
                        <p>Loading recipes...</p>
                    ) : (
                        recipes ? (
                            recipes.map(recipe => (
                                <div key={recipe.idRecipe} className="planData PixelFont">
                                    <Link to='/recipe' key={recipe.idRecipe} onClick={() => handleRecipeClick(recipe)} style={{ textDecoration: 'none' }}>
                                        <img src={`http://localhost:5000/${recipe.img}`} alt={recipe.title} className="planImg" />
                                        <div className="planText">
                                            <b>{recipe.title}</b>
                                            <p>{recipe.time} minutes</p>
                                        </div>
                                    </Link>
                                    
                                </div>
                            ))
                        ) : (
                            <p>No recipes found.</p>
                        )
                    )}
                </div>
            <Footer />
        </>
    );
}