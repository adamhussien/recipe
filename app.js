'use strict'


const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
console.log(url);
const cards = document.querySelector(".cards")
const searchBtn = document.querySelector(".search-btn")
const inputField = document.querySelector(".search-input")

async function MealsBd(searchTerm) {
    try {
        if (searchTerm) { // Check if searchTerm is provided
            const res = await fetch(url + searchTerm);
            const data = await res.json();
          
            let { meals } = data;
            cards.innerHTML = "";
            if (meals) {
                meals.forEach(meal => {
                    let ingredients = [];
                    for (let i = 1; i <= 20; i++) {
                        if (meal['strIngredient' + i]) {
                            ingredients.push(`${meal['strIngredient' + i]} - ${meal["strMeasure" + i]}`);
                        } else {
                            break;
                        }
                    }

                    const card = document.createElement('div');
                    card.className = "card";
                    card.innerHTML = `<div class="card">
                        <img src="${meal.strMealThumb}" alt="">
                        <div class="details">
                            <h4 class="title">${meal.strMeal}</h4>
                            <ul>
                                ${ingredients.map((ing) => `<li class="list">${ing}</li>`).join('')}
                            </ul>
                           
                        </div>
                    </div>`;

                    cards.appendChild(card);
                });
                cards.style.display = "block"; // Show the cards container */
            } else {
                cards.innerHTML = `<h3>Nothing is found</h3>`;
                cards.style.display = "none"; // Hide the cards container if no meals found
            }
        }
    } catch (err) {
        console.log('Something went wrong', err);
    }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const searchTerm = inputField.value.trim();
    if (searchTerm !== '') {
        MealsBd(searchTerm);
        inputField.value = "";
    }
});

// Initially hide the cards container
cards.style.display = "none";
