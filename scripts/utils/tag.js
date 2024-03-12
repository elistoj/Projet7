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
        // Sélection de la section des tags dans le DOM
        const tagSection = document.querySelector('.tag_section');

        // Création du HTML pour le tag
    const tag = `
        ${this.name}
        [X]
    `;

        // Ajout du tag à la section des tags dans le DOM
        tagSection.innerHTML += tag;

        // Sélection de tous les boutons de tag dans le DOM
        const tagBtn = tagSection.querySelectorAll('button');

        // Ajout d'un écouteur d'événement de clic à chaque bouton de tag pour supprimer le tag
        tagBtn.forEach(btn => btn.addEventListener('click', () => this.removeTag(tags)));

        return tag;
    }

    // Méthode pour supprimer un tag
    removeTag(tags) {
        // Récupération de la valeur de recherche actuelle
        const inputValue = document.querySelector('#search-recipe').value;

        // Sélection du tag parent à supprimer
        const tag = this.closest('.tag');

        // Enlever les espaces autour du texte du tag
        const tagName = tag.textContent.trim();

        // Suppression du tag de la liste des tags sélectionnés
        selectedTags.splice(selectedTags.indexOf(tagName), 1);

        // Filtrer les recettes avec les tags sélectionnés et la valeur de recherche actuelle
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