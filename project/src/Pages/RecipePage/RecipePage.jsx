import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import '../RecipePage/RecipePage.css';

export default function RecipePage() {
    const currentRecipe = useSelector((state) => state.recipes.currentRecipe);

    return (
        <>
            <HeaderLog />
            <main className='recMain'>
                <div className='imgDescrRecipe'>
                    <div>
                        <p className="recipeTitle">{currentRecipe.title}</p>
                        <p>Time: {currentRecipe.time} minutes</p>
                        <p>Instruction: {currentRecipe.instructions}</p>
                    </div>
                    
                </div>
            </main>
            <Footer />
        </>
    );
}