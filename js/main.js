import pokemon from "./pokemon.js";
import pokedex from "./pokedex.js";


let valor = 0;

addEventListener("DOMContentLoaded", (e) => {
  pokemon.showAll(valor);
  pokedex.eventos();
});

const input = document.querySelector(".pokemon");
addEventListener("click", (e) => {
  if (e.target.classList.contains("buscar")) {
    const item = input.value;
    console.log(item);
    pokemon.showOne(item);
  }
});

addEventListener("click", (e) => {
  if (e.target.classList.contains("btnP")) {
    valor = e.target.value;
    console.log(valor);
    pokemon.showAll(valor);
  }
});


