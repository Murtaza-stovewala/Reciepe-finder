// const searchBox = document.getElementById('searchInput');
// const searcBtn = document.querySelector('.searcBtn');
// const recipes = document.querySelector('#recipes');

// const fetchRecipes = async (query) =>{
//       const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//       const response = await data.json();
//       response.meals.forEach(meal =>{
//         const recipeDiv = document.createElement('div');
//         recipeDiv.ClassList.add('recipe');
//         recipeDiv.innerHtml = `
//              <img src="${meal.strMealThumb}">
//         `
//         recipes.appendChild(recipeDiv);
//       });
// }
// // to check button is working
// searcBtn.addEventListener('click',()=>{
//   const searchInput = searchBox.value.trim();
//   fetchRecipes(searchInput);
// })
/*-------------------------------------------------------------------------------------------------------------------------*/
// const searchBox = document.getElementById('searchInput');
// const searcBtn = document.querySelector('.searcBtn');
// const recipes = document.querySelector('#recipes');

// const fetchRecipes = async (query) => {
//   recipes.innerHTML = ''; // Clear previous results

//   try {
//     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//     const response = await data.json();

//     if (!response.meals) {
//       recipes.innerHTML = '<p>No recipes found.</p>';
//       return;
//     }

//     response.meals.forEach(meal => {
//       const recipeDiv = document.createElement('div');
//       recipeDiv.classList.add('recipe');
//       recipeDiv.innerHTML = `
//         <h3>${meal.strMeal}</h3>
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%; max-width:300px; border-radius:10px;">
//         <p><strong>Category:</strong> ${meal.strCategory}</p>
//         <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
//       `;
//       recipes.appendChild(recipeDiv);
//     });
//   } catch (error) {
//     console.error(error);
//     recipes.innerHTML = '<p>Something went wrong. Please try again.</p>';
//   }
// };

// // Search button event
// searcBtn.addEventListener('click', () => {
//   const searchInput = searchBox.value.trim();
//   if (searchInput) {
//     fetchRecipes(searchInput);
//   }
// });
/********************************filter search*******************************************************************************************/
// const searchBox = document.getElementById('searchInput');
// const searcBtn = document.querySelector('.searcBtn');
// const recipes = document.querySelector('#recipes');

// const allowedKeywords = ['burger', 'pizza', 'noodle', 'sandwich'];

// const fetchRecipes = async (query) => {
//   recipes.innerHTML = ''; // Clear previous results

//   try {
//     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//     const response = await data.json();

//     if (!response.meals) {
//       recipes.innerHTML = '<p>No recipes found.</p>';
//       return;
//     }

//     // Filter meals that match one of the allowed keywords
//     const filteredMeals = response.meals.filter(meal => {
//       const name = meal.strMeal.toLowerCase();
//       return allowedKeywords.some(keyword => name.includes(keyword));
//     });

//     if (filteredMeals.length === 0) {
//       recipes.innerHTML = '<p>No fast food items found.</p>';
//       return;
//     }

//     filteredMeals.forEach(meal => {
//       const recipeDiv = document.createElement('div');
//       recipeDiv.classList.add('recipe');
//       recipeDiv.innerHTML = `
//         <h3>${meal.strMeal}</h3>
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%; max-width:300px; border-radius:10px;">
//         <p><strong>Category:</strong> ${meal.strCategory}</p>
//         <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
//       `;
//       recipes.appendChild(recipeDiv);
//     });
//   } catch (error) {
//     console.error(error);
//     recipes.innerHTML = '<p>Something went wrong. Please try again.</p>';
//   }
// };

// searcBtn.addEventListener('click', () => {
//   const searchInput = searchBox.value.trim();
//   if (searchInput) {
//     fetchRecipes(searchInput);
//   }
// });
/*----------------- drop down-----------------------------------------------*/
// const searchSelect = document.getElementById('searchSelect');
// const searcBtn = document.querySelector('.searcBtn');
// const recipes = document.querySelector('#recipes');

// const fetchRecipes = async (query) => {
//   recipes.innerHTML = '<p>Loading...</p>';

//   try {
//     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//     const response = await data.json();

//     if (!response.meals) {
//       recipes.innerHTML = '<p>No recipes found.</p>';
//       return;
//     }

//     // Show matching meals
//     recipes.innerHTML = '';
//     response.meals.forEach(meal => {
//       const recipeDiv = document.createElement('div');
//       recipeDiv.classList.add('recipe');
//       recipeDiv.innerHTML = `
//         <h3>${meal.strMeal}</h3>
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%; max-width:300px; border-radius:10px;">
//         <p><strong>Category:</strong> ${meal.strCategory}</p>
//         <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
//       `;
//       recipes.appendChild(recipeDiv);
//     });
//   } catch (error) {
//     console.error(error);
//     recipes.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
//   }
// };

// searcBtn.addEventListener('click', () => {
//   const selectedValue = searchSelect.value;
//   if (selectedValue) {
//     fetchRecipes(selectedValue);
//   }
// });
/***************************adding meal befire****************************** */
const searchSelect = document.getElementById('searchSelect');
const searcBtn = document.querySelector('.searcBtn');
const recipes = document.querySelector('#recipes');

// Keywords to preload
const preloadKeywords = ['burger', 'pizza', 'noodles', 'sandwich', 'chicken'];;

// Function to fetch and show one random recipe per keyword
const preloadFeaturedRecipes = async () => {
  recipes.innerHTML = '<p>Loading featured recipes...</p>';
  recipes.innerHTML = ''; // Clear

  for (const keyword of preloadKeywords) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];

        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
          <h3>${randomMeal.strMeal}</h3>
          <img src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}" style="width:100%; max-width:300px; border-radius:10px;">
          <p><strong>Category:</strong> ${randomMeal.strCategory}</p>
          <p><strong>Instructions:</strong> ${randomMeal.strInstructions.slice(0, 200)}...</p>
        `;
        recipes.appendChild(recipeDiv);
      }
    } catch (error) {
      console.error(`Error loading ${keyword} recipes:`, error);
    }
  }
};

// Manual search
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
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add('recipe');
      recipeDiv.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:100%; max-width:300px; border-radius:10px;">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
      `;
      recipes.appendChild(recipeDiv);
    });
  } catch (error) {
    console.error(error);
    recipes.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
  }
};

// Trigger search on button click
searcBtn.addEventListener('click', () => {
  const selectedValue = searchSelect.value;
  if (selectedValue) {
    fetchRecipes(selectedValue);
  }
});

// Preload featured meals on page load
window.addEventListener('DOMContentLoaded', preloadFeaturedRecipes);
