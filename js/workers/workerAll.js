


//1. PRIMERO OBTENEMOS LOS POKEMONES RESULTADOS PAGINADO
const getPokemon = async (valor) => {
  try {
    const value=(valor*20)
    console.log(value);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${value}&limit=20`);
    const resultado = await response.json();
    return getPokemonIndividual(resultado)
  } catch (error) {
    console.error(error);
  }
};

//2. OBETNEMOS LOS LINK DE CADA POKEMON PARA PODER ACCEDER A SUS DATOS
const getPokemonIndividual = async (data) => {
  let templateHtml = "";
  try {

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




const template = (resultado) => {
  return `<div class="pokemon-card">
  <div class="pokemon-image">
    <img src="${resultado.sprites.other.home.front_default}" alt="Pikachu">
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

const addNumber=()=>{
  let plantillaHTML3=""
  const page=1281/40;
  plantillaHTML3+=`<span><button><i class="bi bi-chevron-left"></i></button></span>`
  for (let index = 1; index < page; index++) {
    plantillaHTML3+=`<span><button class="btnP" value="${index}">${index}</button></span>`   
  }
  plantillaHTML3+=`<span><button><i class="bi bi-chevron-right"></i></button></span>`
  postMessage(plantillaHTML3)
}






self.addEventListener("message", async(e) => {
  
   const resultado = await getPokemon(e.data);
    postMessage(resultado);
    addNumber();
});
