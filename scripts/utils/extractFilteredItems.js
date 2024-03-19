import { Normalization } from "../utils/normalization.js";

export const extractFilteredItems = filteredRecipes => {
    const filteredItems = [];

    filteredRecipes.forEach(recipe => {
        filteredItems.push(Normalization(recipe.appliance));

        recipe.ustensils.forEach(ustensil => filteredItems.push(Normalization(ustensil)));

        recipe.ingredients.forEach(ingredient => filteredItems.push(Normalization(ingredient.ingredient)));
    });

    return filteredItems;
};