const searchBtn = document.getElementById("search-btn"); // search button
const inputField = document.getElementById("name-input"); // search field input
const nameScreen = document.getElementById("name-screen"); //name-screen
const imageScreen = document.getElementById("main-screen"); // image screen
const aboutScreen = document.getElementById("about-screen"); // about-text screen
const typeScreen = document.getElementById("type-screen"); // type screen
const idScreen = document.getElementById("id-screen"); // spices screen
const shinyBtn = document.getElementById("shiny-btn"); // shiny button
var shinyUrl = "";
var isShiny = false; // Flag to track if shiny is currently shown
var imgUrl = ""; // Global variable for normal image URL
var isError = false; // Flag to track if error is currently shown

const getPokemonData = (pokemon) => {
  const lowerCasePokemon = pokemon.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemon}`)
    .then((response) => response.json())
    .then((data) => {
      const fetchedImg = data.sprites.front_default;
      imgUrl = data.sprites.front_default;
      let id = ("00" + data.id).slice(-3);
      imageScreen.style.backgroundImage = `url('${fetchedImg}')`;
      nameScreen.innerHTML = data.name;
      typeScreen.innerHTML = data.types[0].type.name;
      idScreen.innerHTML = `#${data.id}`;
      aboutScreen.innerHTML = `Height: ${data.height * 10}cm Weight: ${
        data.weight / 10
      }kg`;
      inputField.value = "";
      shinyUrl = data.sprites.front_shiny;
    })
    .catch((error) => {
      imageScreen.style.backgroundImage = "url('./assets/not-found.gif";
      imageScreen.style.backgroundColor = "white";
      nameScreen.innerHTML = "Error";
      typeScreen.innerHTML = "Error";
      idScreen.innerHTML = "";
      aboutScreen.innerHTML = "Pokemon not found";
      inputField.value = "";
      isError = true;
      console.error("Error:", error);
    });
};

inputField.addEventListener(
  "keydown",
  (event) => event.key === "Enter" && searchBtn.click()
);
searchBtn.addEventListener("click", () => getPokemonData(inputField.value));

shinyBtn.addEventListener("click", () => {
  if (isError) return; // Don't do anything if error is currently shown
  if (isShiny) {
    // If shiny is currently shown, switch to normal
    if (imgUrl === "") {
      imageScreen.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png')`;
    } else {
      imageScreen.style.backgroundImage = `url('${imgUrl}')`;
    }
    shinyBtn.style.backgroundColor = ""; // or any color for normal state
  } else {
    // If normal is currently shown, switch to shiny
    if (shinyUrl === "") {
      imageScreen.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png')`;
    } else {
      imageScreen.style.backgroundImage = `url('${shinyUrl}')`;
    }
    shinyBtn.style.backgroundColor = "gold"; // Shiny state indicator
  }
  isShiny = !isShiny; // Toggle the state
});
