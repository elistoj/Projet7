// Fonction principale pour la recherche
export  const performSearch = () => {
    const searchInput = document.querySelector('.search-recipe');
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