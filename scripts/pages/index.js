import CardRecipe from '../utils/CardRecipe.js';

class Api {
    constructor(url){
        this.url = url;
    }
    // Fonction asynchrone pour récupérer les données de l'API
    async get(){
        try{
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch(err){
            // En cas d'erreur, on lance une exception
            throw new Error(err);
        }
    }
};

// Initialisation de l'API de recettes
const recipesApi = new Api('./datas/recipes.json');
// Récupération de toutes les recettes
const allRecipes = await recipesApi.get();

// Copie du tableau de recettes pour pouvoir filtrer les recettes en cours
const currentRecipes = [...allRecipes];

// Fonction pour mettre à jour le tableau de recettes en cours
const updateRecipes = filteredRecipes => { currentRecipes.splice(0, currentRecipes.length, ...filteredRecipes) };

// Tableau pour stocker les tags sélectionnés
const selectedTags = [];

// Tableau pour stocker les dropdowns
const dropdowns = [];

// Récupération de l'élément input de recherche
const searchInput = document.querySelector('#search-recipe');

// Définition de la classe Recipe pour représenter une recette
class Recipe {
    constructor(data) {
        this.id = data.id
        this.image = data.image
        this.name = data.name
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.time = data.time
        this.description = data.description
        this.appliance = data.appliance
        this.ustensils = data.ustensils
    }
}


// Fonction pour afficher la section des dropdowns
const displayDropdownSection = () => {
    const numberOfRecipes = document.querySelector('.recipes_count');
    numberOfRecipes.textContent = `${allRecipes.length} recettes`;

    dropdowns.push(new Dropdown('Ingrédients', uniqueProperties(allRecipes).ingredients));
    dropdowns.push(new Dropdown('Appareils', uniqueProperties(allRecipes).appliances));
    dropdowns.push(new Dropdown('Ustensiles', uniqueProperties(allRecipes).ustensils));

    const filterSection = document.querySelector('.filter_section');
    dropdowns.forEach(dropdown => filterSection.insertBefore(dropdown.createDropdown(), numberOfRecipes));
};

// Fonction pour afficher les cartes de recettes
const displayRecipesCards = () => {
    allRecipes
        .map(recipe => new Recipe(recipe))
        .forEach(recipe => {
            const templateCard = new CardRecipe(recipe);
            templateCard.createCard();
        })
};

// Classe représentant un dropdown
class Dropdown {
    constructor(name, items) {
        this.name = name;
        this.items = items;
        this.filteredItems = [];
        this.itemList = null;
    }

    // Metoda za normalizaciju stringova
    static normalizeString(str) {
        return str.trim().toLowerCase();
    }

    // Metoda za kreiranje dropdown-a
    createDropdown() {
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.setAttribute('class', 'dropdown_wrapper');

        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        const button = document.createElement('button');
        button.classList.add('dropdown_btn');
        button.type = 'button';
        button.innerHTML = `
            <span>${this.name}</span>
            <span class="fa-solid fa-chevron-down" aria-hidden="true"></span>
        `;

        const dropdownContent = document.createElement('div');
        dropdownContent.classList.add('dropdown_content');

        const searchDiv = document.createElement('div');
        const inputElement = document.createElement('input');
        inputElement.setAttribute('tabindex', '-1');
        inputElement.type = 'text';
        inputElement.id = `search-${this.name}`;
        inputElement.setAttribute('maxlength', '12');
        const searchButton = document.createElement('button');
        searchButton.setAttribute('tabindex', '-1');
        const searchLabel = document.createElement('label');
        searchLabel.htmlFor = `search-${this.name}`;
        searchLabel.setAttribute('aria-label', `Search by ${this.name}`);

        searchDiv.appendChild(inputElement);
        searchDiv.appendChild(searchButton);
        searchDiv.appendChild(searchLabel);

        const itemList = document.createElement('ul');
        itemList.classList.add('dropdown_content_list');
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            itemList.appendChild(li);
        });

        dropdownContent.appendChild(searchDiv);
        dropdownContent.appendChild(itemList);

        dropdown.appendChild(button);
        dropdown.appendChild(dropdownContent);

        dropdownWrapper.appendChild(dropdown);

        this.itemList = itemList.querySelectorAll('li');

        inputElement.addEventListener('input', () => {
            this.search(Dropdown.normalizeString(inputElement.value));
        });

        this.tagHandler(inputElement);

        return dropdownWrapper;
    }

    // Metoda za ažuriranje stavki dropdown-a
    updateItems(filteredItems, inputValue, match) {
        this.filteredItems = filteredItems;

        this.itemList.forEach(item => item.style.display = 'none');

        let items = match ? match : this.filteredItems;

        items.forEach(itemText => {
            const itemElement = [...this.itemList].find(item => Dropdown.normalizeString(item.textContent) === Dropdown.normalizeString(itemText));
            if (itemElement)
                itemElement.style.display = 'block';
        });
    }

    // Metoda za pretragu u dropdown-u
    search(inputValue) {
        const itemsToSearch = !this.filteredItems.length ? this.items : this.filteredItems;

        const match = itemsToSearch.filter(item => {
            const normalizedItem = Dropdown.normalizeString(item);
            return normalizedItem.includes(inputValue);
        });

        this.updateItems(this.filteredItems, inputValue, match);
    }

    // Metoda za resetovanje stavki dropdown-a
    resetItemList() {
        this.itemList.forEach(item => item.style.display = 'block');
        this.filteredItems = [];
    }

    // Metoda za upravljanje dodavanjem tagova u dropdown
    tagHandler(inputElement) {
        this.itemList.forEach(item => {
            item.addEventListener('click', () => {
                this.addTag(item.textContent);
                inputElement.value = '';
            });
            item.addEventListener('keydown', e => {
                if (e.key === 'Enter') this.addTag(item.textContent);
                inputElement.value = '';
            });
        });
    }

    // Metoda za dodavanje taga
    addTag(tagText) {
        if (!selectedTags.includes(tagText)) {
            const tag = new Tag(tagText); // Pretpostavljam da je ova linija u redu
            tag.createTag(); // Pretpostavljam da je ova linija u redu
            selectedTags.push(tagText); // Pretpostavljam da je ova linija u redu
        }
        filterRecipesByLabels(currentRecipes, selectedTags); // Ova linija izgleda u redu
    }
}



// Fonction pour extraire les propriétés uniques des recettes
const uniqueProperties = recipes => {
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

    // Transformation des ensembles en tableaux et tri par ordre alphabétique
    const propertiesArray = {};
    for (const property in uniqueProperties) {
        propertiesArray[property] = Array.from(uniqueProperties[property]).sort();
    }

    return propertiesArray;
};

// Fonction principale pour la recherche
const performSearch = () => {
    const searchInput = document.querySelector('#search-recipe');
    const btnDelete = document.querySelector('.header_cta div button');
    const cardSection = document.querySelector('.card_section');
    const numberOfRecipes = document.querySelector('.recipes_count');

    // Fonction pour mettre à jour le contenu de la page en fonction de la recherche
    const updateContent = () => {
        const searchInputValue = searchInput.value.toLowerCase();
        btnDelete.style.display = searchInputValue.length > 0 ? 'block' : 'none';

        if(searchInputValue.length > 2) {
            const recipesToFilter = selectedTags.length > 0 ? recipesFilteredByTag : allRecipes;
            filterRecipesByText(recipesToFilter, searchInputValue);
        };

        // Si le champ de recherche est vide et qu'il y a des tags sélectionnés, afficher les recettes correspondantes aux tags sélectionnés
        if (!searchInput.value && selectedTags.length > 0) filterRecipesByLabels(allRecipes, selectedTags);

        // Sinon, réinitialiser le contenu
        else if (!searchInput.value && selectedTags.length === 0) resetContent();
    };
    
    // Fonction pour réinitialiser le contenu de la page
    const resetContent = () => {
        cardSection.innerHTML = '';
        numberOfRecipes.textContent = `${allRecipes.length} recettes`;
        displayRecipesCards();
        updateRecipes(allRecipes);
        dropdowns.forEach(dropdown => dropdown.resetItemList());
    };

    searchInput.addEventListener('input', updateContent);
    if (searchInput) {
        searchInput.addEventListener('input', updateContent);
    }

    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            searchInput.value = '';
            btnDelete.style.display = 'none';
            
            if(selectedTags.length > 0) filterRecipesByLabels(allRecipes, selectedTags);
            else if(selectedTags.length === 0) resetContent();
        });
    }
    
};

// Fonction pour ouvrir ou fermer les dropdowns
const openCloseDropdown = () => {
    const dropdownButtons = document.querySelectorAll('.dropdown_btn');
    let chevron;

    function toggleDropdown(btn) {
        const dropdownContent = btn.nextElementSibling;
        chevron = btn.querySelector('.fa-chevron-down');
        chevron.classList.toggle('rotate');
        dropdownContent.classList.toggle('active');
    };

    function closeOtherDropdowns(clickedButton) {
        dropdownButtons.forEach(btn => {
            chevron = btn.querySelector('.fa-chevron-down');
            if (btn !== clickedButton) {
                chevron.classList.remove('rotate');
                btn.nextElementSibling.classList.remove('active');
            }
        });
    };

    function focusableElements(btn) {
        const dropdownContent = btn.nextElementSibling;
        const focusableElements = dropdownContent.querySelectorAll('input, button, li');

        dropdownContent.classList.contains('active') ? 
        focusableElements.forEach(element => element.setAttribute('tabindex', '0')) : 
        focusableElements.forEach(element => element.setAttribute('tabindex', '-1'));
    };

    dropdownButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleDropdown(btn);
            closeOtherDropdowns(btn);
            focusableElements(btn);
        });
    });
};

// Affichage de la section des dropdowns
displayDropdownSection();
// Affichage des cartes de recettes
displayRecipesCards();
// Ouverture et fermeture des dropdowns
openCloseDropdown();
// Fonction principale de recherche
performSearch(currentRecipes);
