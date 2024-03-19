// Import des classes nécessaires depuis d'autres fichiers
import CardRecipe from "../cards/CardRecipe.js";
import Recipe from "../cards/Recipe.js";
import { extractFilteredItems } from "../utils/extractFilteredItems.js";
import { dropdowns } from "../pages/index.js";

export const updateWithFilteredRecipes = filteredRecipes => {

    const cardSection = document.querySelector('.card_section');
    const numberOfRecipes = document.querySelector('.recipes_count');
    
    if (!filteredRecipes.length) {
        cardSection.innerHTML = "<p>Aucune recette n'a été trouvée.</p>";
        numberOfRecipes.textContent = ``;
    } else {
        cardSection.innerHTML = "";
        numberOfRecipes.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes'}`;

        filteredRecipes
            .map(recipe => new Recipe(recipe))
            .forEach(recipe => {
                const templateCard = new CardRecipe(recipe);
                templateCard.createCard();
            });
    };

    const filteredItems = extractFilteredItems(filteredRecipes);

    dropdowns.forEach(dropdown => dropdown.updateItems(filteredItems));

};
//Cette fonction updateWithFilteredRecipes met à jour l'affichage des recettes dans la section
// des cartes de recette en fonction des recettes filtrées. 
//Si aucune recette n'est trouvée, un message approprié est affiché.
// Sinon, les recettes filtrées sont ajoutées à la section des cartes de recette dans le DOM.