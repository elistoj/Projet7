// Import des classes nécessaires depuis d'autres fichiers
import CardRecipe from "../cards/CardRecipe.js";
import Recipe from "../cards/Recipe.js";

// Fonction pour mettre à jour l'affichage avec les recettes filtrées
export const updateWithFilteredRecipes = filteredRecipes => {
    // Sélection de la section des cartes de recette dans le DOM
    const cardSection = document.querySelector('.card_section');
    // Sélection de l'élément affichant le nombre de recettes trouvées dans le DOM
    const numberOfRecipes = document.querySelector('.recipes_count');
    
    // Si aucune recette n'est trouvée, afficher un message approprié
    if (!filteredRecipes.length) {
        cardSection.innerHTML = "<p>Aucune recette n'a été trouvée.</p>";
        numberOfRecipes.textContent = ``;
    } else {
        // Sinon, afficher les recettes filtrées
        cardSection.innerHTML = ""; // Efface tout contenu précédent dans la section des cartes de recette

        // Met à jour le nombre de recettes affichées
        numberOfRecipes.textContent = `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'recette' : 'recettes'}`;

        // Pour chaque recette filtrée, créer une carte de recette et l'ajouter à la section des cartes de recette
        filteredRecipes
            .map(recipe => new Recipe(recipe)) // Création d'une instance de la classe Recipe pour chaque recette
            .forEach(recipe => {
                const templateCard = new CardRecipe(recipe); // Création d'une carte de recette à partir de l'instance de Recipe
                templateCard.createCard(); // Ajout de la carte à la section des cartes de recette dans le DOM
            });
    }
  

};
//Cette fonction updateWithFilteredRecipes met à jour l'affichage des recettes dans la section
// des cartes de recette en fonction des recettes filtrées. 
//Si aucune recette n'est trouvée, un message approprié est affiché.
// Sinon, les recettes filtrées sont ajoutées à la section des cartes de recette dans le DOM.