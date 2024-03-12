// Définit une fonction Normalization qui normalise une chaîne de caractères
export const Normalization = str => {
    console.log(typeof str); // Imprime le type de l'argument
    // Vérifie si l'argument passé n'est pas une chaîne de caractères, si c'est le cas, lance une erreur
    if (typeof str !== 'string') {
        throw new TypeError('Parameter must be a string');
    }
    // Convertit la chaîne en minuscules, la normalise en NFD (Forme Normalisée de Décomposition) et supprime les caractères diacritiques
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

//Cette fonction Normalization prend une chaîne de caractères en entrée, la normalise en convertissant les caractères en minuscules, puis en NFD (Forme Normalisée de Décomposition) et supprime les caractères diacritiques. 
//Si l'argument passé n'est pas une chaîne de caractères, une erreur de type est levée.