
// Classe représentant une carte de recette
export default class CardRecipe {
    constructor(recipe) {
        this.recipe = recipe;
    }
    // Créer la carte de recette
    createCard() {
        const cardArticle = document.createElement('article');
        cardArticle.classList.add('card');
        cardArticle.setAttribute('data-id', this.recipe.id);
    
        if (this.recipe.time > 0) {
            const timeParagraph = document.createElement('p');
            timeParagraph.classList.add('card_time');
            if (this.recipe.time > 60) {
                timeParagraph.textContent = `${Math.floor(this.recipe.time / 60)} h ${this.recipe.time % 60} min`;
            } else {
                timeParagraph.textContent = `${this.recipe.time} min`;
            }
            cardArticle.appendChild(timeParagraph);
        }
    
        const imageElement = document.createElement('img');
        imageElement.src = `./photos/photos_plats/${this.recipe.image}`;
        imageElement.alt = this.recipe.name;
        cardArticle.appendChild(imageElement);
    
        const cardInfosDiv = document.createElement('div');
        cardInfosDiv.classList.add('card_infos');
    
        const nameHeader = document.createElement('h2');
        nameHeader.textContent = this.recipe.name;
        cardInfosDiv.appendChild(nameHeader);
    
        const instructionsDiv = document.createElement('div');
        instructionsDiv.classList.add('card_infos_instructions');
        const instructionsHeader = document.createElement('h3');
        instructionsHeader.textContent = 'Recette';
        const instructionsParagraph = document.createElement('p');
        instructionsParagraph.textContent = this.recipe.description;
        instructionsDiv.appendChild(instructionsHeader);
        instructionsDiv.appendChild(instructionsParagraph);
        cardInfosDiv.appendChild(instructionsDiv);
    
        const ingredientsDiv = document.createElement('div');
        ingredientsDiv.classList.add('card_infos_ingredients');
        const ingredientsHeader = document.createElement('h3');
        ingredientsHeader.textContent = 'Ingrédients';
        const ingredientsList = document.createElement('ul');
        this.recipe.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            if (ingredient.quantity && ingredient.unit) {
                ingredientItem.innerHTML = `<span>${ingredient.ingredient}</span><span>${ingredient.quantity} ${ingredient.unit}</span>`;
            } else {
                ingredientItem.innerHTML = `<span>${ingredient.ingredient}</span>`;
            }
            ingredientsList.appendChild(ingredientItem);
        });
        ingredientsDiv.appendChild(ingredientsHeader);
        ingredientsDiv.appendChild(ingredientsList);
        cardInfosDiv.appendChild(ingredientsDiv);
    
        cardArticle.appendChild(cardInfosDiv);
    
        const cardSection = document.querySelector('.card_section');
        cardSection.appendChild(cardArticle);
    }
    
}
