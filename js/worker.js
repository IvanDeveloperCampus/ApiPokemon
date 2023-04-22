//const buttons=document.querySelector(".buttons")

let btnNext;
let btnPrev;

//1. PRIMERO OBTENEMOS LOS POKEMONES RESULTADOS PAGINADO
const getPokemon = async (url) => {
  try {
    const response = await fetch(url);
    const resultado = await response.json();
    //retornamos el array

    return resultado;
  } catch (error) {
    console.error(error);
  }
};

//2. OBETNEMOS LOS LINK DE CADA POKEMON PARA PODER ACCEDER A SUS DATOS
const getPokemonIndividual = async (data) => {
  let templateHtml = "";
  try {
    //iteramos por cada pokemon para sacar su url

    for (let item of data.results) {
      const response = await fetch(item.url);
      const resultado = await response.json();
      templateHtml += template(resultado);
    }

    return templateHtml;
  } catch (error) {
    console.log(error);
  }
};

const getPokemonByName = async (url) => {
  let templateHtml2 = "";
  let templateHtml3=""
  try {
    const response = await fetch(url);
    const resultado = await response.json();
    templateHtml2+=`
    <img src="${resultado.sprites.other.dream_world.front_default}"/>
          
    `;
    templateHtml3+=`
           <h2>${resultado.name}</h2>
          <h3>Abilities</h3>
          <ul>
            <li>Solar-power</li>
            <li>Blaze</li>
          </ul>
          <h3>Moves</h3>
          <ul>
            <li>dragon-rage</li>
            <li>dragon-breath</li>
            <li>dragon-claw</li>
          </ul>`;

          try {
            const response2=await fetch(resultado.species.url);
            const pokemonSpecies=await response2.json();
            let drescripciones=pokemonSpecies.flavor_text_entries;
            let descripcionEs=drescripciones.filter((des)=>des.language.name==="es");
            console.log(descripcionEs);
          } catch (error) { 
            console.log(error);
          }
          return {
            templateHtml2: templateHtml2,
            templateHtml3: templateHtml3,
          };
  } catch (error) {
    console.log(error);
  }

  

};



const template = (resultado) => {
  return `<div class="pokemon-card">
  <div class="pokemon-image">
    <img src="${resultado.sprites.other.dream_world.front_default}" alt="Pikachu">
  </div>
  <div class="pokemon-info">
    <h2 class="pokemon-name">${resultado.name}</h2>
    <p class="pokemon-type">Tipo: <span>Eléctrico</span></p>
    <div class="pokemon-stats">
      <div class="pokemon-stat">
        <div class="stat-name">Ataque</div>
        <div class="stat-bar">
          <div class="stat-progress" style="width:${resultado.stats[1].base_stat}%; background-color: #FFCB05;"></div>
        </div>
        <div class="stat-value">${resultado.stats[1].base_stat}</div>
      </div>
      <div class="pokemon-stat">
        <div class="stat-name">Defensa</div>
        <div class="stat-bar">
          <div class="stat-progress" style="width: ${resultado.stats[2].base_stat}%; background-color: #FF3E3E;"></div>
        </div>
        <div class="stat-value">${resultado.stats[2].base_stat}</div>
      </div>
      <div class="pokemon-stat">
        <div class="stat-name">Velocidad</div>
        <div class="stat-bar">
          <div class="stat-progress" style="width: ${resultado.stats[5].base_stat}%; background-color: #49D0B9;"></div>
        </div>
        <div class="stat-value">${resultado.stats[5].base_stat}</div>
      </div>
    </div>
  </div>
</div>`;
};

self.addEventListener("message", async (e) => {
  if (e.data.length > 34) {
    const byName = await getPokemonByName(e.data);
    postMessage(byName);
  } else {
    const resultado = await getPokemon(e.data);
    const template = await getPokemonIndividual(resultado);

    postMessage(template);
  }
});
