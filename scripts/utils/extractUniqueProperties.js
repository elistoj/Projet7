export const extractUniqueProperties = recipes => {
    const uniqueProperties = {
        ingredients: new Set(),
        appliances: new Set(),
        ustensils: new Set()
    };

    const addPropertyToSet = (propertySet, value) => propertySet.add(value.toLowerCase()) ;

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => addPropertyToSet(uniqueProperties.ingredients, ingredient.ingredient));
        
    });

    // Ensemble set en tableau et trie par ordre alphabétique
    const propertiesArray = {};
    for (const property in uniqueProperties) {
        propertiesArray[property] = Array.from(uniqueProperties[property]).sort();
    }

    return propertiesArray;
};