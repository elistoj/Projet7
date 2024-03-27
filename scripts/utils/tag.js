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

    
 // Metoda za uklanjanje taga
removeTag(tag) {
    // Ukloniti razmake oko imena taga
    const tagName = tag.textContent.trim(); // Dobi imeto na tagot od elementot tag

    // Pronalaženje indeksa taga u listi selektovanih tagova
    const tagIndex = selectedTags.indexOf(tagName);
    if (tagIndex !== -1) {
        // Uklanjanje taga iz liste selektovanih tagova
        selectedTags.splice(tagIndex, 1);
    }

    // Sakupljanje imena preostalih otvorenih tagova, isključujući uklonjeni tag
    const otherOpenTags = Array.from(document.querySelectorAll('.tag'))
        .filter(t => t !== tag)
        .map(t => t.textContent.trim());

    // Ako postoje preostali otvoreni tagovi, kombinujemo ih sa selektovanim tagovima,
    // inače koristimo samo selektovane tagove
    const combinedTags = otherOpenTags.length > 0 ? [...selectedTags, ...otherOpenTags] : selectedTags;

    // Ažuriranje prikaza recepata na osnovu kombinacije tagova i trenutne vrednosti pretrage
    const inputValue = document.querySelector('#search-recipe').value;
    filterRecipes(allRecipes, selectedTags, inputValue);

    // Uklanjanje taga iz DOM-a
    tag.remove();
}
}

//Ce code définit une classe Tag pour créer et gérer les tags dans l'interface utilisateur. 
//La méthode createTag crée un tag et l'ajoute à la section des tags dans le DOM. 
//La méthode removeTag supprime un tag lorsque son bouton est cliqué, 
//en supprimant également le tag de la liste des tags sélectionnés
// et en filtrant les recettes avec les tags restants et la valeur de recherche actuelle.


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
// Ce code importe plusieurs fonctions depuis d'autres fichiers, puis définit une fonction filterRecipes 
// qui prend en entrée une liste de recettes, des tags de filtre et une valeur de recherche. Il filtre ensuite 
// les recettes en fonction de ces critères et met à jour l'affichage avec les recettes filtrées.  // Import des fonctions nécessaires depuis d'autres fichiers
