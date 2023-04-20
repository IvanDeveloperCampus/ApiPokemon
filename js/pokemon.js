
export default {
    show(urlPokemon) {
        const info = document.querySelector(".cardss")
        const ws = new Worker("./js/worker.js");

        

        //este es el mensaje que se envia
        ws.postMessage(urlPokemon);
        ws.postMessage(urlPokemon)
        ws.addEventListener("message", (e) => {
            info.innerHTML="";
            //OBTENEMOS LA INFORMACION PARA INYECTARLA
            info.insertAdjacentHTML("beforeend", e.data)
        })
    }
}

