// Importation des modules et des dépendances nécessaires
import { Normalization } from '../utils/normalization.js'; // Importation de la fonction Normalization pour normaliser les chaînes de caractères
import Tag from './tag.js'; // Importation de la classe Tag pour la gestion des tags
import { filterRecipesByLabels } from '../utils/filterRecipesByLabels.js'; // Importation de la fonction filterRecipesByLabels pour filtrer les recettes en fonction des étiquettes
import { selectedTags } from '../pages/index.js'; // Importation de la liste des tags sélectionnés depuis la page index.js
import { currentRecipes } from '../pages/index.js'; // Importation de la liste des recettes actuelles depuis la page index.js

// Définition de la classe Dropdown pour la création et la gestion des menus déroulants
export default class Dropdown {
    constructor(name, items) {
        this.name = name; // Nom du menu déroulant
        this.items = items; // Liste des éléments du menu déroulant
        this.filteredItems = []; // Liste des éléments filtrés
        this.itemList = null; // Liste des éléments HTML du menu déroulant
    }

    // Méthode pour créer le contenu du menu déroulant
    createDropdown() {
        console.log('Creating dropdown for:', this.name);

        // Structure HTML du menu déroulant
        const dropdownContent = `
                <div class="dropdown"> 
                    <button class="dropdown_btn" type="button">
                        <span>${this.name}</span>
                        <span class="fa-solid fa-chevron-down" aria-hidden="true"></span>
                    </button>

                    <div class="dropdown_content">
                        <div>
                            <input tabindex="-1" type="text" id="search-${this.name}" maxlength="12">
                            <button tabindex="-1"></button>
                            <label for="search-${this.name}" aria-label="Search by ${this.name}"></label>
                        </div>
                        <ul class="dropdown_content_list">
                            ${this.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>                          
        `;

        // Création de l'élément div pour contenir le menu déroulant
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.setAttribute('class', 'dropdown_wrapper');
        dropdownWrapper.innerHTML = dropdownContent;

        // Récupération de l'élément input pour la recherche et de la liste des éléments du menu déroulant
        const inputElement = dropdownWrapper.querySelector(`#search-${this.name}`);
        this.itemList = dropdownWrapper.querySelectorAll('.dropdown_content_list li');

        // Ajout d'un écouteur d'événement pour la saisie dans le champ de recherche
        inputElement.addEventListener('input', () => {
            this.search(Normalization(inputElement.value)); // Appel de la méthode de recherche avec la valeur normalisée de l'entrée utilisateur
            this.toggleDeleteBtn(inputElement); // Appel de la méthode pour afficher ou masquer le bouton de suppression
        });

        // Gestion des tags sélectionnés
        this.tagHandler(inputElement);

        return dropdownWrapper; // Retourne l'élément HTML du menu déroulant
    }

    // Méthode pour mettre à jour les éléments du menu déroulant en fonction de la recherche
    updateItems(filteredItems, _inputValue, match) {
        this.filteredItems = filteredItems;

        // Masquer tous les éléments de la liste du menu déroulant
        this.itemList.forEach(item => item.style.display = 'none');

        // Afficher les éléments filtrés ou les correspondances de recherche
        let items = match ? match : this.filteredItems;
        items.forEach(itemText => {
            const itemElement = [...this.itemList].find(item => Normalization(item.textContent) === Normalization(itemText));
            if (itemElement)
                itemElement.style.display = 'block';
        });
    }

    // Méthode pour effectuer une recherche dans les éléments du menu déroulant
    search(inputValue) {
        const itemsToSearch = !this.filteredItems.length ? this.items : this.filteredItems;

        // Filtrer les éléments en fonction de la saisie de l'utilisateur
        const match = itemsToSearch.filter(item => {
            const normalizedItem = Normalization(item);
            return normalizedItem.includes(inputValue);
        });

        this.updateItems(this.filteredItems, inputValue, match); // Mettre à jour les éléments du menu déroulant
    }

    // Méthode pour réinitialiser la liste des éléments du menu déroulant
    resetItemList() {
        // Réafficher tous les éléments de la liste du menu déroulant
        this.itemList.forEach(item => item.style.display = 'block');
        this.filteredItems = []; // Réinitialiser la liste des éléments filtrés
    }

    // Méthode pour afficher ou masquer le bouton de suppression en fonction de la saisie de l'utilisateur
    toggleDeleteBtn(inputElement) {
        const btnDelete = inputElement.nextElementSibling;
        const inputValue = inputElement.value;
        inputValue.length > 0 ? btnDelete.style.display = 'block' : btnDelete.style.display = 'none';

        // Ajout d'un écouteur d'événement pour le clic sur le bouton de suppression
        btnDelete.addEventListener('click', () => {
            inputElement.value = ''; // Réinitialiser la valeur du champ de recherche
            btnDelete.style.display = 'none'; // Masquer le bouton de suppression

            const itemsToReset = !this.filteredItems.length ? this.items : this.filteredItems;
            this.updateItems(itemsToReset, inputValue, null); // Réinitialiser les éléments du menu déroulant
        });
    }

    // Méthode pour gérer les événements liés aux tags
    tagHandler(inputElement) {
        this.itemList.forEach(item => {
            // Ajout d'un écouteur d'événement pour le clic sur un élément du menu déroulant
            item.addEventListener('click', () => {
                this.addTag(item.textContent); // Ajouter le tag sélectionné
                inputElement.value = ''; // Réinitialiser la valeur du champ de recherche après la sélection d'un tag
            });

            // Ajout d'un écouteur d'événement pour la pression de la touche "Entrée" sur un élément du menu déroulant
            item.addEventListener('keydown', e => {
                if (e.key === 'Enter') this.addTag(item.textContent); // Ajouter le tag sélectionné
                inputElement.value = ''; // Réinitialiser la valeur du champ de recherche après la sélection d'un tag
            });
        });
    }

    // Méthode pour ajouter un tag à la liste des tags sélectionnés
    addTag(tagText) {
        if (!selectedTags.includes(tagText)) { // Vérifier si le tag n'existe pas déjà dans la liste des tags sélectionnés
            const tag = new Tag(tagText); // Créer une nouvelle instance de la classe Tag avec le texte du tag
            tag.createTag(); // Créer et afficher le tag dans l'interface utilisateur
            selectedTags.push(tagText); // Ajouter le tag à la liste des tags sélectionnés
        }
        filterRecipesByLabels(currentRecipes, selectedTags); // Filtrer les recettes en fonction des tags sélectionnés
    }
}
