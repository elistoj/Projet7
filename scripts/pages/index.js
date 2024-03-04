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

// Classe représentant une carte de recette
class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
    }
    // Méthode pour créer la carte de recette
    createCard() {
        const cardSection = document.querySelector('.card_section');
        const cardContent = `
        <article class="card" data-id=${this.recipe.id}> // Balise représentant une carte de recette avec l'identifiant de la recette
        ${
            this.recipe.time > 0
                ? ` <p class="card_time"> // Paragraphe affichant le temps de préparation si le temps est supérieur à zéro
                    ${
                        this.recipe.time > 60
                            ? `${Math.floor(this.recipe.time / 60)} h ${this.recipe.time % 60}` // Si le temps est supérieur à 60 minutes, affiche les heures et les minutes restantes
                            : `${this.recipe.time} min` // Sinon, affiche seulement les minutes
                    }
                    </p>`
                : ''
        }
        <img src="./photos/photos_plats/${this.recipe.image}" alt="${this.recipe.name}"> // Image de la recette avec le nom de la recette comme texte alternatif
        <div class="card_infos"> // Div contenant les informations de la carte de recette
            <h2>${this.recipe.name}</h2> // Titre de la recette
            <div class="card_infos_instructions"> // Div contenant les instructions de la recette
                <h3>Recette</h3> // Titre des instructions de la recette
                <p>${this.recipe.description}</p> // Paragraphe affichant la description de la recette
            </div>
            <div class="card_infos_ingredients"> // Div contenant les ingrédients de la recette
                <h3>Ingrédients</h3> // Titre des ingrédients de la recette
                <ul>
                    ${this.recipe.ingredients.map(ingredient => { // Liste des ingrédients de la recette
                        if (ingredient.quantity && ingredient.unit) { // Vérifie si la quantité et l'unité sont définies pour l'ingrédient
                            return `
                                <li>
                                    <span>${ingredient.ingredient}</span> // Nom de l'ingrédient
                                    <span>${ingredient.quantity} ${ingredient.unit}</span> // Quantité et unité de l'ingrédient
                                </li>
                                    `;
                        } else {
                            return `
                                <li>
                                    <span>${ingredient.ingredient}</span> // Nom de l'ingrédient
                                </li>
                                    `;
                        }
                    }).join('')} 
                </ul>
            </div>
        </div>
    </article>
</section>
        `;

        cardSection.innerHTML += cardContent;
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
            const templateCard = new RecipeCard(recipe);
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

    // Méthode pour créer le dropdown
    createDropdown() {
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
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.setAttribute('class', 'dropdown_wrapper');
        dropdownWrapper.innerHTML = dropdownContent;

        const inputElement = dropdownWrapper.querySelector(`#search-${this.name}`);
        this.itemList = dropdownWrapper.querySelectorAll('.dropdown_content_list li');

        inputElement.addEventListener('input', () => {
            this.search(normalizeString(inputElement.value));
            this.toggleDeleteBtn(inputElement);
        });

        this.tagHandler(inputElement);

        return dropdownWrapper;
    }

    // Méthode pour mettre à jour les items du dropdown
    updateItems(filteredItems, _inputValue, match) {
        this.filteredItems = filteredItems;

        this.itemList.forEach(item => item.style.display = 'none');

        let items = match ? match : this.filteredItems;

        items.forEach(itemText => {
            const itemElement = [...this.itemList].find(item => normalizeString(item.textContent) === normalizeString(itemText));
            if (itemElement)
                itemElement.style.display = 'block';
        });
    }

    // Méthode pour effectuer la recherche dans le dropdown
    search(inputValue) {
        const itemsToSearch = !this.filteredItems.length ? this.items : this.filteredItems;

        const match = itemsToSearch.filter(item => {
            const normalizedItem = normalizeString(item);
            return normalizedItem.includes(inputValue);
        });

        this.updateItems(this.filteredItems, inputValue, match)
    }

    // Méthode pour réinitialiser les items du dropdown
    resetItemList() {
        this.itemList.forEach(item => item.style.display = 'block');
        this.filteredItems = [];
    }

    // Méthode pour gérer l'ajout de tag dans le dropdown
    tagHandler(inputElement) {
        this.itemList.forEach(item => {
            item.addEventListener('click', () => {
                this.addTag(item.textContent)
                inputElement.value = '';
            });
            item.addEventListener('keydown', e => {
                if (e.key === 'Enter') this.addTag(item.textContent)
                inputElement.value = '';
            });
        });
    }

    // Méthode pour ajouter un tag
    addTag(tagText) {
        if (!selectedTags.includes(tagText)) {
            const tag = new Tag(tagText);
            tag.createTag();
            selectedTags.push(tagText);
        }
        filterRecipesByLabels(currentRecipes, selectedTags);
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
