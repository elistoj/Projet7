// Import de la variable nécessaire depuis le fichier index.js
import { currentRecipes } from "../pages/index.js";

// Fonction pour mettre à jour les recettes actuelles
export const updateCurrentRecipes = filteredRecipes => {
    // Remplace toutes les recettes actuelles par les recettes filtrées
    currentRecipes.splice(0, currentRecipes.length, ...filteredRecipes);
};
//Ce code définit une fonction updateCurrentRecipes qui prend en entrée les recettes filtrées 
//et met à jour la variable currentRecipes en remplaçant son contenu par ces recettes filtrées.