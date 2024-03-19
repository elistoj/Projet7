// Import des fonctions nécessaires depuis d'autres fichiers
import { updateCurrentRecipes } from "./UpdateCurrentRecipes.js";
import { Normalization } from "./normalization.js";
import { updateWithFilteredRecipes } from "./updateWithFilteredRecipes.js";

// Fonction pour filtrer les recettes en fonction du texte saisi
export const filterRecipesByText = (recipes, inputValue) => {
    // Normalisation des valeurs d'entrée
    const normalizedInputValue = Normalization(inputValue);

// Filtrer les recettes en fonction du texte saisi
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const { description, ingredients, name } = recipe;

        if (
            Normalization(description).includes(normalizedInputValue) || // Vérifie si la description contient du texte
            ingredients.some(ingredient => Normalization(ingredient.ingredient).includes(normalizedInputValue)) || // Vérifie si un ingrédient contient du texte saisi
            Normalization(name).includes(normalizedInputValue) // Vérifie si le nom de la recette contient le texte saisi
        ) {
            filteredRecipes.push(recipe);
        }
    }

// Met à jour les recettes actuelles avec des recettes filtrées par texte
    updateCurrentRecipes(filteredRecipes);

// Met à jour la vue avec les recettes filtrées par texte
    updateWithFilteredRecipes(filteredRecipes);
};

//Ce code définit une fonction filterRecipesByText qui prend en entrée une liste de recettes 
//et une valeur de recherche textuelle. 
//Il filtre ensuite les recettes en fonction de cette valeur de recherche, en cherchant dans la description, les ingrédients et le nom de chaque recette. 
//Enfin, il met à jour l'affichage avec les recettes filtrées en appelant les fonctions updateCurrentRecipes et updateWithFilteredRecipes.