const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToogle = document.querySelector(".dark-light"),
      searchToogle = document.querySelector(".searchToggle");
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".sidebarClose"),

      
      modeToogle.addEventListener("click" , () =>{
        modeToogle.classList.toggle("active");
        body.classList.toggle("dark")

        if(!body.classList.contains("dark")){
            localStorage.setItem("mode" , "light-mode");
        }else{
            localStorage.setItem("mode" , "dark-mode");
        }


      });

      searchToogle.addEventListener("click" , () =>{
        searchToogle.classList.toggle("active");
        
      });
// toggle sidebar
      sidebarOpen.addEventListener("click", () =>{
        nav.classList.add("active");
      })

      body.addEventListener("click", e =>{
        let clickedElm = e.target;

        if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
            nav.classList.remove("active");

        }
        
      });





// Function to fetch cocktail data
async function fetchCocktails(query) {
    try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        displayCocktails(data.drinks);
    } catch (error) {
        console.error('Error fetching cocktails:', error);
    }
}

// Function to display cocktail data
function displayCocktails(cocktails) {
    const resultsContainer = document.querySelector('.results');
    resultsContainer.innerHTML = ''; // Clear previous results
    if (cocktails) {
        cocktails.forEach(cocktail => {
            const cocktailDiv = document.createElement('div');
            cocktailDiv.classList.add('cocktail');
            const strength = getCocktailStrength(cocktail);
            cocktailDiv.innerHTML = `
                <h3>${cocktail.strDrink}</h3>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
                <p>${cocktail.strInstructions}</p>
                <h4>Zutaten:</h4>
                <ul>
                    ${getIngredients(cocktail).map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <div class="strength">Stärke: ${strength}</div>
            `;
            resultsContainer.appendChild(cocktailDiv);
        });
    } else {
        resultsContainer.innerHTML = '<p>No cocktails found</p>';
    }
}

// Function to get ingredients from cocktail data
function getIngredients(cocktail) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${measure ? measure : ''} ${ingredient}`);
        }
    }
    return ingredients;
}

// Function to determine cocktail strength
function getCocktailStrength(cocktail) {
    const strongAlcohols = ["Rum", "Whisky", "Vodka", "Gin", "Tequila", "Brandy"];
    let strength = 0;
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        if (ingredient && strongAlcohols.includes(ingredient)) {
            strength++;
        }
    }
    return "🍹".repeat(strength) || "🥤";
}

// Event listener for search functionality
document.querySelector('.search-field input').addEventListener('keyup', (e) => {
    const query = e.target.value;
    if (query.length > 2) {
        fetchCocktails(query);
    }
});

// Set initial theme based on local storage
document.addEventListener('DOMContentLoaded', () => {
    const mode = localStorage.getItem("mode");
    if (mode === "dark-mode") {
        body.classList.add("dark");
        modeToogle.classList.add("active");
    }
});
