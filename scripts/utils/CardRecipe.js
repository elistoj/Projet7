
// Classe représentant une carte de recette
export default class CardRecipe {
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