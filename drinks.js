
// Popup elements
const searchSelect = document.getElementById('searchSelect');
const searcBtn = document.querySelector('.searcBtn');
const recipes = document.querySelector('#recipe-section');
const sectionTitle = document.getElementById('section-title');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');


function showPopup(drinks) {
  // Create ingredients list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = drinks[`strIngredient${i}`];
    const measure = drinks[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  // Build HTML
  popupText.innerHTML = `
    <h3 >${drinks.strDrink}</h3>
    <h4>Ingredients</h4>
    <ul>
      ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    <h4>Instructions</h4>
    <p>${drinks.strInstructions}</p>
  `;

  popup.style.display = 'flex'; // Show popup centered
}


popupClose.addEventListener('click', () => {
  popup.style.display = 'none'; // <- hide the whole popup div
});

// const createRecipeCard = (drinks) => {
//   const recipeDiv = document.createElement('div');
//   recipeDiv.classList.add('recipe-card');
//   recipeDiv.innerHTML = `
//     <img class="recipe-image" src="${drinks.strDrinkThumb}" alt="${drinks.strDrink}">
//     <h3>${drinks.strDrink}</h3>
//     <p><strong>Category:</strong> ${drinks.strCategory}</p>
//     <p><strong>Area:</strong> ${drinks.strArea}</p>
//     <button class="make-it-btn">Make It!</button>
//   `;

//   const makeItButton = recipeDiv.querySelector('.make-it-btn');
//   makeItButton.addEventListener('click', () => {
//     showPopup(drinks.strInstructions);
//   });

//   return recipeDiv;
// };
const createRecipeCard = (drinks) => {
  const recipeDiv = document.createElement('div');
  recipeDiv.classList.add('recipe-card');
  recipeDiv.innerHTML = `
    <img class="recipe-image" src="${drinks.strDrinkThumb}" alt="${drinks.strDrink}">
    <h3>${drinks.strDrink}</h3>
    <p><strong>Category:</strong> ${drinks.strCategory}</p>
    <p><strong>Type:</strong> ${drinks.strAlcoholic}</p>
    <button class="make-it-btn">Make It!</button>
  `;

  const makeItButton = recipeDiv.querySelector('.make-it-btn');
  makeItButton.addEventListener('click', () => {
    showPopup(drinks); // ← Pass whole drinks object now
  });

  return recipeDiv;
};


const preloadKeywords = ['coffee', 'tea', 'cocktail', 'smoothie', 'milkshake', 'juice', 'soda'];

const preloadFeaturedRecipes = async () => {
  recipes.innerHTML = '';
  for (const keyword of preloadKeywords) {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`);
      const data = await response.json();
      if (data.drinks && data.drinks.length > 0) {
        const randomDrinks = data.drinks[Math.floor(Math.random() * data.drinks.length)];
        const recipeCard = createRecipeCard(randomDrinks);
        recipes.appendChild(recipeCard);
      }
    } catch (error) {
      console.error(`Error loading ${keyword} recipes:`, error);
    }
  }
};

const fetchRecipes = async (query) => {
  recipes.innerHTML = '<p>Loading...</p>';
  try {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    if (!response.drinks) {
      recipes.innerHTML = '<p>No recipes found.</p>';
      return;
    }
    recipes.innerHTML = '';
    response.drinks.forEach(drinks => {
      const recipeCard = createRecipeCard(drinks);
      recipes.appendChild(recipeCard);
    });
    
  } catch (error) {
    console.error(error);
    recipes.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
  }
};

searcBtn.addEventListener('click', () => {
  const selectedValue = searchSelect.value;
  if (selectedValue) {
    fetchRecipes(selectedValue);
    sectionTitle.textContent = `${selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)} Recipes`; // <-- this changes heading
  }
});

window.addEventListener('DOMContentLoaded', preloadFeaturedRecipes);

// Preload recipes when page loads
window.addEventListener('DOMContentLoaded', preloadFeaturedRecipes);
