
// Popup elements
const searchSelect = document.getElementById('searchSelect');
const searcBtn = document.querySelector('.searcBtn');
const recipes = document.querySelector('#recipe-section');
const sectionTitle = document.getElementById('section-title');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');


function showPopup(meal) {
  // Create ingredients list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  // Build HTML
  popupText.innerHTML = `
    <h3 >${meal.strMeal}</h3>
    <h4>Ingredients</h4>
    <ul>
      ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    <h4>Instructions</h4>
    <p>${meal.strInstructions}</p>
  `;

  popup.style.display = 'flex'; // Show popup centered
}


popupClose.addEventListener('click', () => {
  popup.style.display = 'none'; // <- hide the whole popup div
});

// const createRecipeCard = (meal) => {
//   const recipeDiv = document.createElement('div');
//   recipeDiv.classList.add('recipe-card');
//   recipeDiv.innerHTML = `
//     <img class="recipe-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
//     <h3>${meal.strMeal}</h3>
//     <p><strong>Category:</strong> ${meal.strCategory}</p>
//     <p><strong>Area:</strong> ${meal.strArea}</p>
//     <button class="make-it-btn">Make It!</button>
//   `;

//   const makeItButton = recipeDiv.querySelector('.make-it-btn');
//   makeItButton.addEventListener('click', () => {
//     showPopup(meal.strInstructions);
//   });

//   return recipeDiv;
// };
const createRecipeCard = (meal) => {
  const recipeDiv = document.createElement('div');
  recipeDiv.classList.add('recipe-card');
  recipeDiv.innerHTML = `
    <img class="recipe-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3>${meal.strMeal}</h3>
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>
    <button class="make-it-btn">Make It!</button>
  `;

  const makeItButton = recipeDiv.querySelector('.make-it-btn');
  makeItButton.addEventListener('click', () => {
    showPopup(meal); // ← Pass whole meal object now
  });

  return recipeDiv;
};


const preloadKeywords = ['burger', 'pizza', 'noodles', 'sandwich', 'chicken', 'pasta', 'bread'];

const preloadFeaturedRecipes = async () => {
  recipes.innerHTML = '';
  for (const keyword of preloadKeywords) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];
        const recipeCard = createRecipeCard(randomMeal);
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
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    if (!response.meals) {
      recipes.innerHTML = '<p>No recipes found.</p>';
      return;
    }
    recipes.innerHTML = '';
    response.meals.forEach(meal => {
      const recipeCard = createRecipeCard(meal);
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
