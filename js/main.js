import pokemon from "./pokemon.js";

let urlPokemonBuscar=`https://pokeapi.co/api/v2/pokemon/`
let urlPokemon = `https://pokeapi.co/api/v2/pokemon?`;


addEventListener("DOMContentLoaded", (e) => {
  pokemon.show(`${urlPokemon}offset=0&limit=40`);
});

addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    const url = e.target.getAttribute("url");
    pokemon.show(url);
  }

});

const input = document.querySelector(".pokemon");
addEventListener("click", (e) => {
  if (e.target.classList.contains("buscar")) {
    const item = input.value;
    console.log(item);
    pokemon.show(urlPokemonBuscar + item);
  }
});

const playButton = document.querySelector(".reproducir");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".close");

playButton.addEventListener("click", () => {
  pokemon.playAudio();
});

pauseButton.addEventListener("click", () => {
  pokemon.pauseAudio();
});

stopButton.addEventListener("click", () => {
  pokemon.stopAudio();
});



addEventListener("click", (e)=>{
 if (e.target.classList.contains("btnP")) {
      const valor=e.target.value
      pokemon.show(`${urlPokemon}offset=${valor*80}&limit=80`);
  
 }
})
