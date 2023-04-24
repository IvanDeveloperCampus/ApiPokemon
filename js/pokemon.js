
const synth = window.speechSynthesis; // synth hace referencia al objeto speechSynthesis, que es una interfaz que permite acceder y controlar la síntesis de voz del navegador.
const utterance = new SpeechSynthesisUtterance(); //una instancia que contiene la información del texto a sintetizar y las características de la voz que se utilizará para sintetizar el habla.

const pokedexSpeak = (detail, detail2, detail3) => {
 
  const phrase = `
      ${detail}, ${detail2}, ${detail3}
    `;

  //establecemos propiedades
  utterance.text = phrase;
  utterance.rate = 1.2;

  //verificamos si hay una instancia,
  //si es asi cancelamos antes de reproducir la nueva voz
  if (synth.speaking) {
    synth.cancel();
    synth.speak(utterance);
  }

  //reproducimos
  synth.speak(utterance);
};

const show = (urlPokemon) => {
  const info = document.querySelector(".cardss");
  const imgpokedex = document.querySelector(".camera-display");
  const infoPokemon = document.querySelector(".stats-display");
  const paginacion = document.querySelector(".paginacion");

  const ws = new Worker("./js/worker.js");

  let contPokemon = 0;
  let selectoresPokemon = [imgpokedex, infoPokemon];

  //este es el mensaje que se envia
  ws.postMessage(urlPokemon);
  //ws.postMessage(urlPokemon)
  ws.addEventListener("message", (e) => {
    //OBTENEMOS LA INFORMACION PARA INYECTARLA
    if (typeof e.data == "object") {
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

      pokedexSpeak(
        descripcionEs[0].flavor_text.replace(/\n/g, " "), //reemplazar saltos de linea por un salto vacio
        descripcionEs[1].flavor_text.replace(/\n/g, " "),
        descripcionEs[2].flavor_text.replace(/\n/g, " ")
      );
    } else {
      
      if (e.data.length<2000) {
        paginacion.innerHTML=""
        paginacion.insertAdjacentHTML("beforeend", e.data)
      }else{
        info.innerHTML = "";
        info.insertAdjacentHTML("beforeend", e.data);
      }
      
    }
  });
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

export default { show, playAudio, pauseAudio, stopAudio };
