import CardRecipe from '../utils/CardRecipe.js';

// Učitavanje podataka iz datoteke koristeći fetch
const fetchRecipes = async () => {
    try {
        const response = await fetch('./datas/recipes.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        throw new Error('There was a problem fetching the recipes');
    }
};


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

