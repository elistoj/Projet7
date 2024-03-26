import { displayRecipesCards } from "../pages/index.js"; // Importe la fonction pour afficher les cartes de recettes
import { selectedTags } from "../pages/index.js"; // Importe le tableau des tags sélectionnés
import { allRecipes } from "../pages/index.js"; // Importe le tableau de toutes les recettes
import { filterRecipesByLabels, recipesFilteredByLabels } from "./filterRecipesByLabels.js"; // Importe les fonctions pour filtrer les recettes par tags
import { updateCurrentRecipes } from "./UpdateRecipes.js"; // Importe la fonction pour mettre à jour les recettes actuelles
import { dropdowns } from "../pages/index.js"; // Importe le tableau des éléments de menu déroulant
import { filterRecipesByText } from "./filterRecipesByText.js"; // Importe la fonction pour filtrer les recettes par texte

// Définition de la fonction pour effectuer la recherche
export function performSearch() {
    const searchInput = document.querySelector('#search-recipe'); // Sélectionne l'élément HTML du champ de recherche
    const btnSearch = document.querySelector('.header_text div button'); // Sélectionne le bouton de recherche
    const cardSection = document.querySelector('.card_section'); // Sélectionne la section contenant les cartes de recettes
    const numberOfRecipes = document.querySelector('.recipes_count'); // Sélectionne l'élément affichant le nombre de recettes

    // Définition de la fonction pour réinitialiser le contenu de la page
    const resetContent = () => {
        cardSection.innerHTML = ''; // Efface le contenu de la section des cartes de recettes
        numberOfRecipes.textContent = `${allRecipes.length} recettes`; // Met à jour le nombre total de recettes affiché
        displayRecipesCards(); // Affiche à nouveau toutes les cartes de recettes
        updateCurrentRecipes(allRecipes); // Met à jour les recettes actuelles avec toutes les recettes
        dropdowns.forEach(dropdown => dropdown.resetItemList()); // Réinitialise les éléments de menu déroulant
    };

    // Définition de la fonction pour mettre à jour le contenu de la page en fonction de la recherche
    const updateContent = () => {
        const searchInputValue = searchInput.value.toLowerCase(); // Récupère la valeur du champ de recherche en minuscules
        btnSearch.style.display = searchInputValue.length > 0 ? 'block' : 'block'; // Affiche ou cache le bouton de recherche en fonction du contenu du champ de recherche

        // Si la longueur de la recherche est supérieure à 2 caractères
        if (searchInputValue.length > 2) {
            // Si des tags sont sélectionnés, filtre les recettes filtrées par tags, sinon utilise toutes les recettes
            const recipesToFilter = selectedTags.length > 0 ? recipesFilteredByLabels : allRecipes;
            // Filtre les recettes en fonction du texte de recherche
            filterRecipesByText(recipesToFilter, searchInputValue);
        };

        // Si le champ de recherche est vide et des tags sont sélectionnés, filtre les recettes par tags
        if (!searchInput.value && selectedTags.length > 0) {
            filterRecipesByLabels(allRecipes, selectedTags);
        } else if (!searchInput.value && selectedTags.length === 0) {
            resetContent(); // Si le champ de recherche est vide et aucun tag n'est sélectionné, réinitialise le contenu de la page
        }
    };

    // Ajout d'un écouteur d'événement pour la saisie de texte dans le champ de recherche
    searchInput.addEventListener('input', updateContent);
    const clearButton = document.querySelector('#clear-search');

    // Fonction pour afficher/masquer le bouton "X"
    function toggleClearButton() {
        if (searchInput.value.trim() === '') {
            clearButton.style.display = 'none'; // Masquer le bouton s'il n'y a pas de texte dans le champ
        } else {
            clearButton.style.display = 'block'; // Afficher le bouton s'il y a du texte dans le champ
        }
    }
    
    // Ajout d'un écouteur d'événements sur le champ de recherche
    searchInput.addEventListener('input', toggleClearButton);
    
    // Ajout d'un écouteur d'événements sur le bouton "X"
    clearButton.addEventListener('click', function() {
        searchInput.value = ''; // Effacer le texte dans le champ de recherche
        toggleClearButton(); // Réafficher ou masquer le bouton "X" en fonction du texte
    });
    
    // Ajout d'un écouteur d'événements supplémentaire pour la perte de focus sur le champ de recherche
    searchInput.addEventListener('blur', toggleClearButton);
    
    // Masquer initialement le bouton "X" s'il n'y a pas de texte dans le champ
    toggleClearButton();
    


    // Ajout d'un écouteur d'événement pour le clic sur le bouton de recherche
    btnSearch.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
        updateContent(); // Appelle la fonction de mise à jour du contenu
    });
}
//Ce code définit une fonction performSearch() qui gère la logique de recherche et de mise à jour du contenu de la page en fonction des entrées de recherche de l'utilisateur. Il sélectionne les éléments du DOM pertinents, définit des fonctions pour réinitialiser et mettre à jour le contenu de la page, puis ajoute des écouteurs d'événements 
//pour la saisie de texte dans le champ de recherche et le clic sur le bouton de recherche.