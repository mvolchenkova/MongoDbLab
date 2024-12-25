import '../AllNutrition/AllNutrition.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, setCurrentRecipe } from '../../slices/recipeSlice'; 
import AddRecipeModal from '../AddRecipeModal/AddRecipeModal';

export default function AllNutrition() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes.recipes);
    const status = useSelector(state => state.recipes.status);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [getInput, setInput] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const role = localStorage.getItem('role')
    const userId = localStorage.getItem('userId')
    const isLoading = status === 'loading';

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRecipes());
        }
    }, [status, dispatch]);

    useEffect(() => {
        setFilteredRecipes(recipes);
    }, [recipes]);
    const handleAddRecipe = () => {
        setModalOpen(true); 
    };
    const closeModal = () => {
        setModalOpen(false); 
    };

    

    const handleGetInput = (e) => {
        setInput(e.target.value);
    };

    const handleSearch = () => {
        if (getInput.trim() === '') {
            setFilteredRecipes(recipes);
        } else {
            const searchRecipes = recipes.filter(item =>
                item.title.toLowerCase().includes(getInput.toLowerCase())
            );
            setFilteredRecipes(searchRecipes);
        }
    };


    const handleRecipeClick = (recipe) => {
        dispatch(setCurrentRecipe(recipe)); 
    };

    return (
        <main className="allplansMain">
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
                        <p>Loading recipes...</p>
                    ) : filteredRecipes ? (
                        filteredRecipes.map(recipe => (
                            <div key={recipe._id} className="planData PixelFont">
                                <Link to='/recipe' key={recipe._id} onClick={() => handleRecipeClick(recipe)} style={{ textDecoration: 'none' }}>
                                    <div className="planText">
                                        <b>{recipe.title}</b>
                                        <p>{recipe.time} minutes</p>
                                    </div>
                                </Link>
                                
                            </div>
                        ))
                    ) : (
                        <p>No recipes found.</p>
                    )}
                </div>
                {(role=='admin'||role=='trainer')&&(
                    <div className=''>
                        <button onClick={handleAddRecipe}>ADD RECIPE</button>
                    </div>
                )}
            </div>
            
            <AddRecipeModal isOpen={isModalOpen} onClose={closeModal} />
        </main>
    );
}