import pokemon from "./pokemon.js"

let urlPokemon = `https://pokeapi.co/api/v2/pokemon/`;
let value=""
pokemon.show(urlPokemon);


addEventListener("click", (e)=>{
    if (e.target.classList.contains("btn")) {
        const url=e.target.getAttribute("url")
        pokemon.show(url)

    }
})


addEventListener("input", (e)=>{
    value=e.target.value
    pokemon.show(urlPokemon+value)
})


