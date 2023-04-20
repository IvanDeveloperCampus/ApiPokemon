import pokemon from "./pokemon.js"

let urlPokemon = `https://pokeapi.co/api/v2/pokemon`;
pokemon.show(urlPokemon);


addEventListener("click", (e)=>{
    if (e.target.classList.contains("btn")) {
        const url=e.target.getAttribute("url")
        console.log(url);
        pokemon.show(url)

    }
})



