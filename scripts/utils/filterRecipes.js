// Import des fonctions nécessaires depuis d'autres fichiers
import { Normalization } from "./normalization.js";
import { UpdateFilteredRecipes } from "./UpdateFilteredRecipes.js";
import { updateCurrentRecipes } from "./UpdateCurrentRecipes.js";

// Fonction principale pour filtrer les recettes
export const filterRecipes = (recipes, tags, inputValue) => {
    // Normalisation des tags et de la valeur d'entrée
    const normalizedTags = tags.map(tag => Normalization(tag));
    const normalizedInputValue = Normalization(inputValue);

    // Filtrage des recettes en fonction des tags et de la valeur d'entrée
    const filteredRecipes = recipes.filter(recipe => {
        const { appliance, ustensils, ingredients, name } = recipe;

        // Vérifie que tous les tags sont présents dans la recette (uniquement s'il y a des tags)
        const tagsMatch = normalizedTags.length === 0 || normalizedTags.every(tag =>
            Normalization(appliance).includes(tag) ||
            ustensils.some(ustensil => Normalization(ustensil).includes(tag)) ||
            ingredients.some(ingredient => Normalization(ingredient.ingredient).includes(tag))
        );

        // Vérifie que la recherche est présente dans la recette (uniquement si le champs de recherche n'est pas vide)
        const searchMatch = !normalizedInputValue || (
            Normalization(appliance).includes(normalizedInputValue) ||
            ustensils.some(ustensil => Normalization(ustensil).includes(normalizedInputValue)) ||
            ingredients.some(ingredient => Normalization(ingredient.ingredient).includes(normalizedInputValue)) ||
            Normalization(name).includes(normalizedInputValue)
        );

        // Retourne vrai si la recette correspond aux critères de filtrage, sinon faux
        return tagsMatch && searchMatch;
    });

    // Met à jour les recettes actuelles avec toutes les recettes disponibles
    updateCurrentRecipes(filteredRecipes);

    // Met à jour l'affichage avec les recettes filtrées
    UpdateFilteredRecipes(filteredRecipes);
};
// Ce code importe plusieurs fonctions depuis d'autres fichiers, puis définit une fonction filterRecipes 
// qui prend en entrée une liste de recettes, des tags de filtre et une valeur de recherche. Il filtre ensuite 
// les recettes en fonction de ces critères et met à jour l'affichage avec les recettes filtrées.