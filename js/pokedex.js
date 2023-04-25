let synth;
let utterance;

export default {
  pokedexSpeak(detail, detail2, detail3) {
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
  },

  playAudio() {
    if (synth.speaking) {
      console.log("playy");
      synth.resume();
    }
  },

  pauseAudio() {
    console.log("pausaaaa");
    synth.pause();
  },

  stopAudio() {
    console.log("stop");
    synth.cancel();
  },
  eventos() {
    const button = document.getElementById("sensor-button");
    const playButton = document.querySelector(".reproducir");
    const pauseButton = document.querySelector(".pause");
    const stopButton = document.querySelector(".close");

    playButton.addEventListener("click", () => {
      button.classList.add("pulsing");
      this.playAudio();
    });

    pauseButton.addEventListener("click", () => {
      this.pauseAudio();
      button.classList.remove("pulsing");
    });

    stopButton.addEventListener("click", () => {
      this.stopAudio();
      button.classList.remove("pulsing");
    });
  },
};

synth = window.speechSynthesis; // synth hace referencia al objeto speechSynthesis, que es una interfaz que permite acceder y controlar la síntesis de voz del navegador.
utterance = new SpeechSynthesisUtterance(); //una instancia que contiene la información del
//texto a sintetizar y las características de la voz que se utilizará para sintetizar el habla.
