// Import des fonctions nécessaires depuis d'autres fichiers
import { updateCurrentRecipes } from "./UpdateRecipes.js";
import { Normalization } from "./normalization.js";
import { UpdateFilteredRecipes } from "./UpdateRecipes.js";

// Fonction pour filtrer les recettes en fonction du texte saisi
 export const filterRecipesByText = (recipes, inputValue) => {
    // Normalisation de la valeur d'entrée
    const normalizedInputValue = Normalization(inputValue);

    // Filtrage des recettes en fonction du texte saisi
    const filteredRecipes = recipes.filter(recipe => {
        const { description, ingredients, name } = recipe;

        return (
            Normalization(description).includes(normalizedInputValue) || // Vérifie si la description contient le texte saisi
            ingredients.some(ingredient => Normalization(ingredient.ingredient).includes(normalizedInputValue)) || // Vérifie si un ingrédient contient le texte saisi
            Normalization(name).includes(normalizedInputValue) // Vérifie si le nom de la recette contient le texte saisi
        );
    });

    // Met à jour les recettes actuelles avec les recettes filtrées par texte
    updateCurrentRecipes(filteredRecipes);

    // Met à jour l'affichage avec les recettes filtrées par texte
    UpdateFilteredRecipes(filteredRecipes);
};