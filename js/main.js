import pokemon from "./pokemon.js";

let urlPokemonBuscar=`https://pokeapi.co/api/v2/pokemon/`
let urlPokemon = `https://pokeapi.co/api/v2/pokemon?`;


addEventListener("DOMContentLoaded", (e) => {
  pokemon.showAll(`${urlPokemon}offset=0&limit=20`);
});



const input = document.querySelector(".pokemon");
addEventListener("click", (e) => {
  if (e.target.classList.contains("buscar")) {
    const item = input.value;
    console.log(item);
    pokemon.showOne(urlPokemonBuscar + item);
  }
});


addEventListener("click", (e)=>{
  if (e.target.classList.contains("btnP")) {
       const valor=e.target.value
       console.log(valor);
       pokemon.showAll(`${urlPokemon}offset=${valor*20}&limit=20`);
   
  }
 })

const button = document.getElementById('sensor-button');
const playButton = document.querySelector(".reproducir");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".close");





playButton.addEventListener("click", () => {
  button.classList.add('pulsing');
  pokemon.playAudio();
  
});

pauseButton.addEventListener("click", () => {
  pokemon.pauseAudio();
  button.classList.remove('pulsing');
});

stopButton.addEventListener("click", () => {
  pokemon.stopAudio();
  button.classList.remove('pulsing');
});





