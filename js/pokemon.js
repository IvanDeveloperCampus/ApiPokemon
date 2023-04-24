const synth = window.speechSynthesis; // synth hace referencia al objeto speechSynthesis, que es una interfaz que permite acceder y controlar la síntesis de voz del navegador.
const utterance = new SpeechSynthesisUtterance(); //una instancia que contiene la información del texto a sintetizar y las características de la voz que se utilizará para sintetizar el habla.

const pokedexSpeak = (detail, detail2, detail3) => {
  const phrase = `
      ${detail}, ${detail2}, ${detail3}
    `;

  //establecemos propiedades
  utterance.text = phrase;
  utterance.rate = 1.2;
  utterance.lang = "es-ES";

  //verificamos si hay una instancia,
  //si es asi cancelamos antes de reproducir la nueva voz
  if (synth.speaking) {
    synth.cancel();
    synth.speak(utterance);
  }

  //reproducimos
  synth.speak(utterance);
};

const showAll = (urlPokemon) => {
  let selectores = [".cardss", ".paginacion"];
  let cont = 0;
  const ws = new Worker("../js/workers/workerAll.js");

  //este es el mensaje que se envia
  ws.postMessage(urlPokemon);
  //ws.postMessage(urlPokemon)
  ws.addEventListener("message", (e) => {
    document.querySelector(`${selectores[cont]}`).innerHTML = "";
    document
      .querySelector(`${selectores[cont]}`)
      .insertAdjacentHTML("beforeend", e.data);
    selectores.length - 1 == cont ? ws.terminate : cont++;
  });
};

const showOne = (url) => {
  const button = document.getElementById("sensor-button");
  const imgpokedex = document.querySelector(".camera-display");
  const infoPokemon = document.querySelector(".stats-display");
  let selectoresPokemon = [imgpokedex, infoPokemon];
  const ws2 = new Worker("../js/workers/workerOne.js");
  ws2.postMessage(url);
  let contPokemon = 0;
  ws2.addEventListener("message", (e) => {
    console.log(contPokemon);
    const { templateHtml2, templateHtml3, descripcionEs } = e.data;
    if (contPokemon === 0) {
      imgpokedex.innerHTML = "";
      selectoresPokemon[contPokemon].insertAdjacentHTML(
        "beforeend",
        templateHtml2
      );
      
    }

    if (contPokemon === 1) {
      infoPokemon.innerHTML = "";
      selectoresPokemon[contPokemon].insertAdjacentHTML(
        "beforeend",
        templateHtml3
      );
      
    }

    pokedexSpeak(
      descripcionEs[0].flavor_text.replace(/\n/g, " "), //reemplazar saltos de linea por un salto vacio
      descripcionEs[1].flavor_text.replace(/\n/g, " "),
      descripcionEs[2].flavor_text.replace(/\n/g, " ")
    );
    button.classList.add("pulsing");
  });

    selectoresPokemon.length - 1 == contPokemon ? ws.terminate : contPokemon++;
};

function playAudio() {
  if (synth.speaking) {
    console.log("playy");
    synth.resume();
  }
}

function pauseAudio() {
  console.log("pausaaaa");
  synth.pause();
}

function stopAudio() {
  console.log("stop");
  synth.cancel();
}

export default { showAll, showOne, playAudio, pauseAudio, stopAudio };
