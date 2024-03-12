import { recipes } from '../../datas/recipes.js'; // Importe les données de recettes à partir du fichier recipes.js

// Fonction asynchrone pour récupérer des recettes
export const fetchRecipes = async () => {
    return recipes; // Retourne les données de recettes
};


// Cette fonction fetchRecipes est une fonction asynchrone qui récupère des recettes. 
// Elle retourne simplement les données de recettes à partir du fichier recipes.js.