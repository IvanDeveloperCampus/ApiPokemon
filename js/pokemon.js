

const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();//instancia de la voz

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

  synth.speak(utterance);

};

const show = (urlPokemon) => {
  const info = document.querySelector(".cardss");
  const imgpokedex = document.querySelector(".camera-display");
  const infoPokemon = document.querySelector(".stats-display");

  const ws = new Worker("./js/worker.js");

  let cont = 0;
  let selectores = [imgpokedex, infoPokemon];

  //este es el mensaje que se envia
  ws.postMessage(urlPokemon);
  //ws.postMessage(urlPokemon)
  ws.addEventListener("message", (e) => {
    //OBTENEMOS LA INFORMACION PARA INYECTARLA
    if (typeof e.data == "object") {
      const { templateHtml2, templateHtml3, descripcionEs } = e.data;
      if (cont === 0) {
        imgpokedex.innerHTML = "";
        selectores[cont].insertAdjacentHTML("beforeend", templateHtml2);
        cont++;
      }

      if (cont === 1) {
        infoPokemon.innerHTML = "";
        selectores[cont].insertAdjacentHTML("beforeend", templateHtml3);
        cont++;
      }

      pokedexSpeak(
        descripcionEs[0].flavor_text.replace(/\n/g, " "), //reemplazar saltos de linea por un salto vacio
        descripcionEs[1].flavor_text.replace(/\n/g, " "),
        descripcionEs[2].flavor_text.replace(/\n/g, " ")
      );
    } else {
      info.innerHTML = "";

      info.insertAdjacentHTML("beforeend", e.data);
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
