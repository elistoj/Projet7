// Import des fonctions nécessaires depuis d'autres fichiers
import { updateCurrentRecipes } from "./UpdateCurrentRecipes.js";
import { Normalization } from "./normalization.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";

export const filterRecipesByText = (recipes, inputValue) => {
// Normalisation de la valeur d'entrée
    const normalizedInputValue = Normalization(inputValue);

    // Filtrage des recettes en fonction du texte saisi
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const { description, ingredients, name } = recipe;

        if (
            Normalization(description).includes(normalizedInputValue) || // Vérifie si la description contient le texte saisi
            ingredients.some(ingredient => Normalization(ingredient.ingredient).includes(normalizedInputValue)) || // Vérifie si un ingrédient contient du texte saisi
            Normalization(name).includes(normalizedInputValue) // Vérifie si le nom de la recette contient du texte saisi
        ) {
            filteredRecipes.push(recipe);
        }
    }

// Met à jour les recettes actuelles avec des recettes filtrées par texte
    updateCurrentRecipes(filteredRecipes);

// Met à jour la vue avec les recettes filtrées par texte
    updateWithFilteredRecipes(filteredRecipes);
};
