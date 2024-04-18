import CardRecipe from '../cards/CardRecipe.js'; // Importe la classe CardRecipe pour créer les cartes de recettes
import { performSearch } from '../utils/performSearch.js'; // Importe la fonction performSearch pour effectuer une recherche
import Dropdown from '../utils/Dropdown.js';
import {openCloseDropdown} from '../utils/dropdownEvent.js';
import { recipes } from '../../datas/recipes.js'; // Importe les données de recettes à partir du fichier recipes.js
import Tag from '../utils/tag.js';

// Fonction asynchrone pour récupérer des recettes
 const fetchRecipes = async () => {
    return recipes; // Retourne les données de recettes
};

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

export const extractUniqueProperties = recipes => {
    const uniqueProperties = {
        ingredients: new Set(),
        appliances: new Set(),
        ustensils: new Set()
    };

    const addPropertyToSet = (propertySet, value) => propertySet.add(value.toLowerCase()) ;
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => addPropertyToSet(uniqueProperties.ingredients, ingredient.ingredient));
        addPropertyToSet(uniqueProperties.appliances, recipe.appliance);
        recipe.ustensils.forEach(ustensil => addPropertyToSet(uniqueProperties.ustensils, ustensil));
    });



    // Ensemble set en tableau et trie par ordre alphabétique
    const propertiesArray = {};
    for (const property in uniqueProperties) {
        propertiesArray[property] = Array.from(uniqueProperties[property]).sort();
    }

    return propertiesArray;
};
const displayDropdownSection = () => {


    dropdowns.push(new Dropdown('Ingrédients', extractUniqueProperties(allRecipes).ingredients, 'ingredients'));
    dropdowns.push(new Dropdown('Appareils', extractUniqueProperties(allRecipes).appliances, 'appliances'));
    dropdowns.push(new Dropdown('Ustensiles', extractUniqueProperties(allRecipes).ustensils, 'ustensiles'));
    
    const filterSection = document.querySelector('.filter_section');

    dropdowns.forEach(dropdown => {
        const dropdownContainer = dropdown.createDropdown();
        const selectedItems = getSelectedTagsForDropdown(dropdown.name);
        const tags = selectedItems.map(tag => new Tag(tag, dropdown.id));
    
        const tagSection = document.createElement('div');
        tagSection.classList.add('tag_section');

        const ingredientsTags = document.createElement('div');
        const appliancesTags = document.createElement('div');
        const ustensilesTags = document.createElement('div');
        ingredientsTags.classList.add('ingredients_tags');        
        appliancesTags.classList.add('appliances_tags');
        ustensilesTags.classList.add('ustensiles_tags');
        

        tags.forEach(tag => {
            const tagElement = tag.createTag(selectedTags, dropdown.id); 
            if (dropdown.name === 'Ingrédients') {
                ingredientsTags.appendChild(tagElement);
            } else if (dropdown.name === 'Appareils') {
                appliancesTags.appendChild(tagElement);
            } else if (dropdown.name === 'Ustensiles') {
                ustensilesTags.appendChild(tagElement);
            }
        });

        tagSection.appendChild(ingredientsTags);
        tagSection.appendChild(appliancesTags);
        tagSection.appendChild(ustensilesTags);

        if (selectedItems.length > 0) {
            filterSection.appendChild(dropdownContainer);
            filterSection.appendChild(tagSection);
        } else {
            filterSection.appendChild(dropdownContainer); 
        }
    });

    const numberOfRecipes = document.querySelector('.recipes_count');
    numberOfRecipes.textContent = `${allRecipes.length} recettes`;
    filterSection.appendChild(numberOfRecipes); 
};

export const dropdownName = (dropdownName) => {
    const uniqueProperties = extractUniqueProperties(allRecipes);

    switch(dropdownName) {
        case 'Ingrédients':
            return selectedTags.filter(tag => uniqueProperties.ingredients.includes(tag));
        case 'Appareils':
            return selectedTags.filter(tag => uniqueProperties.appliances.includes(tag));
        case 'Ustensiles':
            return selectedTags.filter(tag => uniqueProperties.ustensils.includes(tag));
        default:
            return [];
    }
};





// Fonction pour filtrer les balises sélectionnées pour une liste déroulante spécifique
const getSelectedTagsForDropdown = (dropdownName) => {
    return selectedTags.filter(tag => {
        if (dropdownName === 'Ingrédients') {
            return extractUniqueProperties(allRecipes).ingredients.includes(tag);
        } else if (dropdownName === 'Appareils') {
            return extractUniqueProperties(allRecipes).appliances.includes(tag);
        } else if (dropdownName === 'Ustensiles') {
            return extractUniqueProperties(allRecipes).ustensils.includes(tag);
        }
        
    });
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



// Appelle la fonction pour exécuter la recherche
performSearch();

displayDropdownSection ();
// Appelle la fonction pour afficher les cartes de recettes

displayRecipesCards();
openCloseDropdown();