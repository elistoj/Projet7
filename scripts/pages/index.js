import CardRecipe from '../cards/CardRecipe.js'; // Importe la classe CardRecipe pour créer les cartes de recettes
import { fetchRecipes } from '../utils/fetchRecipes.js'; // Importe la fonction fetchRecipes pour récupérer les recettes
import { performSearch } from '../utils/performSearch.js'; // Importe la fonction performSearch pour effectuer une recherche
import Dropdown from '../utils/Dropdown.js';
import {openCloseDropdown} from '../utils/dropdownEvent.js';
import {extractUniqueProperties} from '../utils/extractUniqueProperties.js';

// Récupère toutes les recettes via la fonction fetchRecipes et les stocke dans la variable allRecipes
export const allRecipes = await fetchRecipes();

// Crée une copie de toutes les recettes et les stocke dans currentRecipes
export const currentRecipes = [...allRecipes];

// Initialise un tableau vide pour stocker les tags sélectionnés
export const selectedTags = [];

// Initialise un tableau vide pour stocker les éléments de menu déroulant
export const dropdowns = [];

// Récupère l'élément HTML correspondant à la zone de recherche de recettes
export const searchInput = document.querySelector('#search-recipe');


const displayDropdownSection = () => {

    const numberOfRecipes = document.querySelector('.recipes_count');
    numberOfRecipes.textContent = `${allRecipes.length} recettes`;

    dropdowns.push(new Dropdown('Ingrédients', extractUniqueProperties(allRecipes).ingredients));
    dropdowns.push(new Dropdown('Appareils', extractUniqueProperties(allRecipes).appliances));
    dropdowns.push(new Dropdown('Ustensiles', extractUniqueProperties(allRecipes).ustensils));

    const filterSection = document.querySelector('.filter_section');
    dropdowns.forEach(dropdown => filterSection.insertBefore(dropdown.createDropdown(), numberOfRecipes));
};


// Fonction asynchrone pour afficher les cartes de recettes
export const displayRecipesCards = async () => {
    // Vérifie si des recettes ont été récupérées
    if (allRecipes) {
        // Parcourt toutes les recettes
        allRecipes.forEach(recipe => {
            // Crée une nouvelle instance de la classe CardRecipe avec la recette actuelle
            const templateCard = new CardRecipe(recipe);
            // Appelle la méthode createCard() pour générer la carte de recette correspondante
            templateCard.createCard();
        });
    }
};

// Appelle la fonction pour afficher les cartes de recettes
displayRecipesCards();

// Appelle la fonction pour exécuter la recherche
performSearch();

displayDropdownSection ();

openCloseDropdown();