// Classe représentant une carte de recette
export default class CardRecipe {
    // Constructeur de la classe, prend une recette en paramètre
    constructor(recipe) {
        this.recipe = recipe; // Initialise la recette associée à la carte
    }

    // Méthode pour créer la carte de recette dans le DOM
    createCard() {
        // Crée un nouvel élément <article> pour la carte de recette
        const cardArticle = document.createElement('article');
        cardArticle.classList.add('card'); // Ajoute la classe 'card' à l'élément <article>
        cardArticle.setAttribute('data-id', this.recipe.id); // Définit l'attribut 'data-id' avec l'identifiant de la recette

        // Ajoute un paragraphe pour afficher le temps de préparation s'il est supérieur à zéro
        if (this.recipe.time > 0) {
            const timeParagraph = document.createElement('p');
            timeParagraph.classList.add('card_time'); // Ajoute la classe 'card_time' au paragraphe
            // Affiche le temps de préparation en heures et minutes si supérieur à une heure, sinon en minutes seulement
            if (this.recipe.time > 60) {
                timeParagraph.textContent = `${Math.floor(this.recipe.time / 60)} h ${this.recipe.time % 60} min`;
            } else {
                timeParagraph.textContent = `${this.recipe.time} min`;
            }
            cardArticle.appendChild(timeParagraph); // Ajoute le paragraphe au <article>
        }

        // Crée un élément <img> pour afficher l'image de la recette
        const imageElement = document.createElement('img');
        imageElement.src = `./photos/photos_plats/${this.recipe.image}`; // Définit l'URL de l'image
        imageElement.alt = this.recipe.name; // Définit l'attribut 'alt' avec le nom de la recette
        cardArticle.appendChild(imageElement); // Ajoute l'image à l'article

        // Crée une <div> pour les informations de la carte de recette
        const cardInfosDiv = document.createElement('div');
        cardInfosDiv.classList.add('card_infos'); // Ajoute la classe 'card_infos' à la <div>

        // Ajoute un titre <h2> avec le nom de la recette
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = this.recipe.name;
        cardInfosDiv.appendChild(nameHeader); // Ajoute le titre à la <div>

        // Crée une <div> pour les instructions de la recette
        const instructionsDiv = document.createElement('div');
        instructionsDiv.classList.add('card_infos_instructions'); // Ajoute la classe 'card_infos_instructions' à la <div>
        // Ajoute un titre <h3> pour les instructions et un paragraphe avec la description de la recette
        const instructionsHeader = document.createElement('h3');
        instructionsHeader.textContent = 'Recette';
        const instructionsParagraph = document.createElement('p');
        instructionsParagraph.textContent = this.recipe.description;
        instructionsDiv.appendChild(instructionsHeader);
        instructionsDiv.appendChild(instructionsParagraph);
        cardInfosDiv.appendChild(instructionsDiv); // Ajoute la <div> des instructions à la <div> principale

        // Crée une <div> pour afficher les ingrédients de la recette
        const ingredientsDiv = document.createElement('div');
        ingredientsDiv.classList.add('card_infos_ingredients'); // Ajoute la classe 'card_infos_ingredients' à la <div>
        // Ajoute un titre <h3> pour les ingrédients et une liste <ul> pour les afficher
        const ingredientsHeader = document.createElement('h3');
        ingredientsHeader.textContent = 'Ingrédients';
        const ingredientsList = document.createElement('ul');
        // Parcourt la liste des ingrédients de la recette et crée un <li> pour chaque ingrédient
        this.recipe.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            // Affiche la quantité et l'unité de l'ingrédient s'ils sont spécifiés
            if (ingredient.quantity && ingredient.unit) {
                ingredientItem.innerHTML = `<span>${ingredient.ingredient}</span><span>${ingredient.quantity} ${ingredient.unit}</span>`;
            } else {
                ingredientItem.innerHTML = `<span>${ingredient.ingredient}</span>`;
            }
            ingredientsList.appendChild(ingredientItem); // Ajoute l'ingrédient à la liste
        });
        ingredientsDiv.appendChild(ingredientsHeader);
        ingredientsDiv.appendChild(ingredientsList);
        cardInfosDiv.appendChild(ingredientsDiv); // Ajoute la <div> des ingrédients à la <div> principale

        cardArticle.appendChild(cardInfosDiv); // Ajoute la <div> principale à l'article

        // Sélectionne la section contenant les cartes de recettes et ajoute la carte de recette à cette section
        const cardSection = document.querySelector('.card_section');
        cardSection.appendChild(cardArticle);
    }
}

//Cette classe représente une carte de recette avec différentes informations telles que le nom, l'image, 
//le temps de préparation, les instructions et les ingrédients. La méthode createCard() est utilisée pour créer 
//dynamiquement la structure HTML de la carte de recette en utilisant les données de la recette associée.