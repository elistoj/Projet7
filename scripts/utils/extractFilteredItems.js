// Cette fonction `extractFilteredItems` prend en entrée un tableau d'objets représentant des recettes filtrées et retourne un tableau contenant tous les éléments filtrés normalisés.

// La fonction commence par initialiser un tableau vide pour stocker les éléments filtrés.
const filteredItems = [];

// Ensuite, elle itère à travers chaque recette dans le tableau des recettes filtrées.
filteredRecipes.forEach(recipe => {
    // Pour chaque recette, elle normalise le nom de l'appareil associé à la recette en utilisant la fonction Normalization et l'ajoute au tableau des éléments filtrés.
    filteredItems.push(Normalization(recipe.appliance));

    // Ensuite, elle itère à travers chaque ustensile de la recette.
    recipe.ustensils.forEach(ustensil => filteredItems.push(Normalization(ustensil)));

    // Enfin, elle itère à travers chaque ingrédient de la recette.
    recipe.ingredients.forEach(ingredient => filteredItems.push(Normalization(ingredient.ingredient)));
});

// Une fois toutes les recettes parcourues, la fonction retourne le tableau contenant tous les éléments filtrés normalisés.
return filteredItems;
