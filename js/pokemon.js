import pokedex from "./pokedex.js";

const showAll = (valor) => {
  let selectores = [".cardss", ".paginacion"];
  let cont = 0;
  const ws = new Worker("js/workers/workerAll.js");

  //este es el mensaje que se envia
  ws.postMessage(valor);
  //ws.postMessage(urlPokemon)
  ws.addEventListener("message", (e) => {
    document.querySelector(`${selectores[cont]}`).innerHTML = "";
    document
      .querySelector(`${selectores[cont]}`)
      .insertAdjacentHTML("beforeend", e.data);
    selectores.length - 1 == cont ? ws.terminate : cont++;
  });
};

const showOne = (valor) => {
  const button = document.getElementById("sensor-button");
  const imgpokedex = document.querySelector(".camera-display");
  const infoPokemon = document.querySelector(".stats-display");
  let selectoresPokemon = [imgpokedex, infoPokemon];
  const ws2 = new Worker("js/workers/workerOne.js");
  ws2.postMessage(valor);
  let contPokemon = 0;
  ws2.addEventListener("message", (e) => {
    const { templateHtml2, templateHtml3, descripcionEs } = e.data;
    if (contPokemon === 0) {
      imgpokedex.innerHTML = "";
      selectoresPokemon[contPokemon].insertAdjacentHTML(
        "beforeend",
        templateHtml2
      );
      contPokemon++;
    }

    if (contPokemon === 1) {
      infoPokemon.innerHTML = "";
      selectoresPokemon[contPokemon].insertAdjacentHTML(
        "beforeend",
        templateHtml3
      );
      contPokemon++;
    }

    pokedex.pokedexSpeak(
      descripcionEs[0].flavor_text.replace(/\n/g, " "), //reemplazar saltos de linea por un salto vacio
      descripcionEs[1].flavor_text.replace(/\n/g, " "),
      descripcionEs[2].flavor_text.replace(/\n/g, " ")
    );
    button.classList.add("pulsing");
  
  });

   
};



export default { showAll, showOne };
