// Import des variables nécessaires depuis d'autres fichiers
import { selectedTags, allRecipes } from "../pages/index.js";
import { Normalization } from "./normalization.js";
import { updateCurrentRecipes } from "./UpdateRecipes.js";
import { UpdateFilteredRecipes } from "./UpdateRecipes.js";
// Classe représentant un tag
export default class Tag {
    constructor(name) {
        this.name = name;
    }

    // Méthode pour créer un tag dans l'interface utilisateur
createTag(tags, dropdown) {
    const tagSection = document.querySelector('.tag_section');
    let column;
    
    if (dropdown === 'Ustensiles') {
        column = document.querySelector('.tag-column-ustens');
        if (!column) {
            column = document.createElement('div');
            column.classList.add('tag-column', 'tag-column-ustens');
            tagSection.appendChild(column);
        }
    } else if (dropdown === 'Appareils') {
        column = document.querySelector('.tag-column-appar');
        if (!column) {
            column = document.createElement('div');
            column.classList.add('tag-column', 'tag-column-appar');
            tagSection.appendChild(column);
        }
    } else {
        column = document.querySelector('.tag-column-ingred');
        if (!column) {
            column = document.createElement('div');
            column.classList.add('tag-column', 'tag-column-ingred');
            tagSection.appendChild(column);
        }
    }

    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.setAttribute('data-dropdown', dropdown);
    tag.innerHTML = `
        ${this.name} 
        <button class="remove_tag_btn"></button>
    `;

    column.appendChild(tag);

    const removeBtn = tag.querySelector('.remove_tag_btn');
    removeBtn.addEventListener('click', () => this.removeTag(tag));

    return tag;
}

    
// Méthode de suppression des tags
removeTag(tag) {
    const tagName = tag.textContent.trim();

    const tagIndex = selectedTags.indexOf(tagName);
    if (tagIndex !== -1) {
        selectedTags.splice(tagIndex, 1);
    }

    const otherOpenTags = Array.from(document.querySelectorAll('.tag'))
        .filter(t => t !== tag)
        .map(t => t.textContent.trim());

    const combinedTags = otherOpenTags.length > 0 ? [...selectedTags, ...otherOpenTags] : selectedTags;

    const inputValue = document.querySelector('#search-recipe').value;
    filterRecipes(allRecipes, selectedTags, inputValue);

    tag.remove();
}
}

//Ce code définit une classe Tag pour créer et gérer les tags dans l'interface utilisateur. 



// Fonction principale pour filtrer les recettes
const filterRecipes = (recipes, tags, inputValue) => {
    // Normalisation des tags et de la valeur d'entrée
    const normalizedTags = tags.map(tag => Normalization(tag));
    const normalizedInputValue = Normalization(inputValue);

    // Filtrage des recettes en fonction des tags et de la valeur d'entrée
    const filteredByInputAndTags = recipes.filter(recipe => {
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
    updateCurrentRecipes(filteredByInputAndTags);

    // Met à jour l'affichage avec les recettes filtrées
    UpdateFilteredRecipes(filteredByInputAndTags);
};