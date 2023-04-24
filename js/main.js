import pokemon from "./pokemon.js";

let urlPokemonBuscar=`https://pokeapi.co/api/v2/pokemon/`
let urlPokemon = `https://pokeapi.co/api/v2/pokemon?`;


addEventListener("DOMContentLoaded", (e) => {
  pokemon.show(`${urlPokemon}offset=0&limit=20`);
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

const button = document.getElementById('sensor-button');
const playButton = document.querySelector(".reproducir");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".close");
const myModal=document.querySelector("#exampleModal")




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




addEventListener("click", (e)=>{
 if (e.target.classList.contains("btnP")) {
      const valor=e.target.value
      console.log(valor);
      pokemon.show(`${urlPokemon}offset=${valor*20}&limit=20`);
  
 }
})
