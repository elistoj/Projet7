import CardRecipe from '../cards/CardRecipe.js';
import { fetchRecipes } from '../utils/fetchRecipes.js';


// Prikaz kartica recepata
const displayRecipesCards = async () => {
    const allRecipes = await fetchRecipes();
    if (allRecipes) {
        allRecipes.forEach(recipe => {
            const templateCard = new CardRecipe(recipe);
            templateCard.createCard();
        });
    }
};





// Affichage des cartes de recettes
displayRecipesCards();

