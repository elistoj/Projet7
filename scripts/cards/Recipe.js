// Définit une classe Recipe qui représente une recette
export default class Recipe {
    // Constructeur de la classe, prend un objet de données en paramètre
    constructor(data) {
        // Initialise les propriétés de l'instance avec les valeurs fournies dans l'objet de données
        this.id = data.id; // Identifiant de la recette
        this.image = data.image; // URL de l'image de la recette
        this.name = data.name; // Nom de la recette
        this.servings = data.servings; // Nombre de portions de la recette
        this.ingredients = data.ingredients; // Liste des ingrédients de la recette
        this.time = data.time; // Temps de préparation de la recette
        this.description = data.description; // Description de la recette
        this.appliance = data.appliance; // Appareil nécessaire pour la recette
        this.ustensils = data.ustensils; // Liste des ustensiles nécessaires pour la recette
    }
}
