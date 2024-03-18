// Import des variables nécessaires depuis d'autres fichiers
import { selectedTags, allRecipes } from "../pages/index.js";
import { filterRecipes } from "./filterRecipes.js";

// Classe représentant un tag
export default class Tag {
    constructor(name) {
        this.name = name;
    }

    // Méthode pour créer un tag dans l'interface utilisateur
    createTag(tags) {
        const tagSection = document.querySelector('.tag_section');
        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.innerHTML = `
            ${this.name}
            <button class="remove_tag_btn"></button>
        `;
        tagSection.appendChild(tag);
    
        // Селектирање на копчето за бришење на тагот во тагот
        const removeBtn = tag.querySelector('.remove_tag_btn');
    
        // Додавање на слушател за клик на копчето за бришење
        removeBtn.addEventListener('click', () => this.removeTag(tag));
    
        return tag;
    }
    
    // Méthode pour supprimer un tag
    removeTag(tag) {
        // Enlever les espaces autour du texte du tag
        const tagName = this.name.trim();

        // Suppression du tag de la liste des tags sélectionnés
        const tagIndex = selectedTags.indexOf(tagName);
        if (tagIndex !== -1) {
            selectedTags.splice(tagIndex, 1);
        }

        // Filtrer les recettes avec les tags sélectionnés et la valeur de recherche actuelle
        const inputValue = document.querySelector('#search-recipe').value;
        filterRecipes(allRecipes, selectedTags, inputValue);

        // Suppression du tag du DOM
        tag.remove();
    }
}




//Ce code définit une classe Tag pour créer et gérer les tags dans l'interface utilisateur. 
//La méthode createTag crée un tag et l'ajoute à la section des tags dans le DOM. 
//La méthode removeTag supprime un tag lorsque son bouton est cliqué, 
//en supprimant également le tag de la liste des tags sélectionnés
// et en filtrant les recettes avec les tags restants et la valeur de recherche actuelle.