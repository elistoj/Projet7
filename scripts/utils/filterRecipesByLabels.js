// Import des fonctions nécessaires depuis d'autres fichiers
import { UpdateFilteredRecipes, updateCurrentRecipes } from "./UpdateRecipes.js";
import { Normalization } from "./normalization.js";

// Déclaration d'un tableau pour stocker les recettes filtrées par tags
export let recipesFilteredByLabels = [];

// Fonction pour filtrer les recettes en fonction des tags
export const filterRecipesByLabels = (recipes, tags) => {
    // Filtrage des recettes en fonction des tags
    const filteredRecipesByTags = recipes.filter(recipe => {
        const { appliance, ustensils, ingredients } = recipe;

        // Normalisation des tags
        const normalizedTags = tags.map(tag => Normalization(tag));

        // Vérifie que tous les tags sont présents dans la recette
        return (
            normalizedTags.every(tag => 
                Normalization(appliance).includes(tag) ||
                ustensils.some(ustensil => Normalization(ustensil).includes(tag)) ||
                ingredients.some(ingredient => Normalization(ingredient.ingredient).includes(tag))
            )
        );
    });

    // Met à jour le tableau des recettes filtrées par tags
    recipesFilteredByLabels = filteredRecipesByTags;
    
    // Met à jour les recettes actuelles avec les recettes filtrées
    updateCurrentRecipes(filteredRecipesByTags);

    // Met à jour l'affichage avec les recettes filtrées
    UpdateFilteredRecipes(filteredRecipesByTags);
}; 
//Ce code définit une fonction filterRecipesByLabels qui prend en entrée une liste de recettes et des étiquettes de filtre. Il filtre ensuite les recettes
// en fonction de ces étiquettes et met à jour le tableau recipesFilteredByLabels avec les recettes filtrées. 
//Enfin, il met à jour l'affichage avec les recettes filtrées en appelant les fonctions updateCurrentRecipes et UpdateFilteredRecipes.

