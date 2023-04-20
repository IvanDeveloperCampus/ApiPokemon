
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
}


//2. OBETNEMOS LOS LINK DE CADA POKEMON PARA PODER ACCEDER A SUS DATOS
const getPokemonIndividual = async (data) => {
  let templateHtml = "";
  try {
    //iteramos por cada pokemon para sacar su url
    for (let item of data.results) {
      const response = await fetch(item.url);
      const resultado = await response.json();
      templateHtml += `
      <div class=" card" style="width: 15rem;">
      <img src="${resultado.sprites.front_default}" class="" alt="">
        <div class="card-body text-center">
          <p class="card-text text-secondary">#${resultado.id}</p>
          <p class="card-text">${resultado.name}</p>
        </div>
    </div>`
    }
    btnNext = data.next ? `<button class="btn btn-dark" url="${data.next}">NEXT</button>` : ""
    btnPrev = data.previous ? `<button class="btn btn-dark" url="${data.previous}">PREVIOUS</button>` : ""
    templateHtml += btnNext + "" + btnPrev;

    return templateHtml;
  } catch (error) {
    console.log(error);
  }

}

const getPokemonByName = async (url) => {

  let templateHtml2 = "";
  try {
    const response = await fetch(url);
    const resultado = await response.json();
    templateHtml2 += `<div class=" card" style="width: 15rem;">
    <img src="${resultado.sprites.front_default}" class="" alt="">
      <div class="card-body text-center">
        <p class="card-text text-secondary">#${resultado.id}</p>
        <p class="card-text">${resultado.name}</p>
      </div>
    </div>`
    return templateHtml2;
  }
  catch (error) {
    console.log(error);
  }



}



self.addEventListener("message", async (e) => {

  if (e.data.length > 36) {
    const byName = await getPokemonByName(e.data);
    console.log(byName);
    postMessage(byName)
  } else {
    const resultado = await getPokemon(e.data);
    const template = await getPokemonIndividual(resultado);

    postMessage(template)
  }




})