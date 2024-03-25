// Import des classes nécessaires depuis d'autres fichiers
import CardRecipe from "../cards/CardRecipe.js";
import Recipe from "../cards/Recipe.js";
import { dropdowns } from "../pages/index.js";
import { Normalization } from "./normalization.js";
// Import de la variable nécessaire depuis le fichier index.js
import { currentRecipes } from "../pages/index.js";

// Fonction qui extrait les éléments filtrés
const ExtractFiltered = filteredRecipes => {
    const filteredItems = []; // Initialisation d'un tableau vide pour les éléments filtrés

    // Itération à travers les recettes filtrées et ajout des éléments pertinents dans le tableau
    filteredRecipes.forEach(recipe => {
        // Ajout de l'appareil de la recette
        filteredItems.push(Normalization(recipe.appliance));

        // Ajout de tous les ustensiles de la recette
        recipe.ustensils.forEach(ustensil => filteredItems.push(Normalization(ustensil)));

        // Ajout de tous les ingrédients de la recette
        recipe.ingredients.forEach(ingredient => filteredItems.push(Normalization(ingredient.ingredient)));
    });

    return filteredItems; // Retourne le tableau des éléments filtrés
};

// Fonction qui met à jour les recettes filtrées
export const UpdateFilteredRecipes = filteredRecipes => {

    const cardSection = document.querySelector('.card_section'); // Sélection de la section de carte dans le document HTML
    const numberOfRecipes = document.querySelector('.recipes_count'); // Sélection du nombre de recettes dans le document HTML
    
    // Vérification s'il n'y a pas de recettes filtrées
    if (!filteredRecipes.length) {
        cardSection.innerHTML = "<p>Aucune recette n'a été trouvée.</p>"; // Affichage d'un message si aucune recette n'est trouvée
        numberOfRecipes.textContent = ``; // Effacement du contenu du nombre de recettes
    } else {
        cardSection.innerHTML = ""; // Effacement du contenu de la section de carte
        numberOfRecipes.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes'}`; // Affichage du nombre de recettes filtrées

        // Création des cartes de recettes pour chaque recette filtrée
        filteredRecipes
            .map(recipe => new Recipe(recipe)) // Création d'une instance de recette pour chaque recette filtrée
            .forEach(recipe => {
                const templateCard = new CardRecipe(recipe); // Création d'une carte de recette à partir du modèle
                templateCard.createCard(); // Création de la carte
            });
    };

    // Extraction des éléments filtrés pour les mises à jour des menus déroulants
    const filteredItems = ExtractFiltered(filteredRecipes);

    // Mise à jour des éléments des menus déroulants
    dropdowns.forEach(dropdown => dropdown.updateItems(filteredItems));

}; 
//Cette fonction UpdateFilteredRecipes met à jour l'affichage des recettes dans la section
// des cartes de recette en fonction des recettes filtrées. 
//Si aucune recette n'est trouvée, un message approprié est affiché.
// Sinon, les recettes filtrées sont ajoutées à la section des cartes de recette dans le DOM.



// Fonction pour mettre à jour les recettes actuelles
export const updateCurrentRecipes = filteredRecipes => {
    // Remplace toutes les recettes actuelles par les recettes filtrées
    currentRecipes.splice(0, currentRecipes.length, ...filteredRecipes);
};
//Ce code définit une fonction updateCurrentRecipes qui prend en entrée les recettes filtrées 
//et met à jour la variable currentRecipes en remplaçant son contenu par ces recettes filtrées.