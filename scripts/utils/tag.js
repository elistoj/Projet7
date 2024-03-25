// Import des variables nécessaires depuis d'autres fichiers
import { selectedTags, allRecipes } from "../pages/index.js";
import { filterRecipes } from "./filterRecipes.js";

// Classe représentant un tag
export default class Tag {
    constructor(name) {
        this.name = name;
    }

    // Méthode pour créer un tag dans l'interface utilisateur
 // Crée un tag avec le nom spécifié
createTag(tags) {
    // Sélection de la section des tags dans le DOM
    const tagSection = document.querySelector('.tag_section');
    
    // Création d'un élément de tag
    const tag = document.createElement('div');
    tag.classList.add('tag'); // Ajout de la classe 'tag' à l'élément de tag
    
    // Ajout du nom du tag et d'un bouton de suppression à l'élément de tag
    tag.innerHTML = `
        ${this.name} 
        <button class="remove_tag_btn"></button>
    `;
    
    // Ajout de l'élément de tag à la section des tags dans le DOM
    tagSection.appendChild(tag);

    // Sélection du bouton de suppression à l'intérieur du tag
    const removeBtn = tag.querySelector('.remove_tag_btn');

    // Ajout d'un écouteur d'événements pour le clic sur le bouton de suppression
    removeBtn.addEventListener('click', () => this.removeTag(tag));

    return tag; // Retourne l'élément de tag créé
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