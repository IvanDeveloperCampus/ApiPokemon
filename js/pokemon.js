
export default {
    show(urlPokemon) {
        const info = document.querySelector(".cardss")
        const imgpokedex=document.querySelector(".camera-display")
        const infoPokemon=document.querySelector(".stats-display")

        const ws = new Worker("./js/worker.js");


        let cont=0;
        let selectores=[imgpokedex, infoPokemon]

        //este es el mensaje que se envia
        ws.postMessage(urlPokemon);
        ws.postMessage(urlPokemon)
        ws.addEventListener("message", (e) => {
            
             //OBTENEMOS LA INFORMACION PARA INYECTARLA
            if(typeof e.data == "object"){ 
                const { templateHtml2, templateHtml3 } = e.data;
                if (cont===0) {
                    imgpokedex.innerHTML=""
                selectores[cont].insertAdjacentHTML("beforeend", templateHtml2)
                cont++;
                }
                infoPokemon.innerHTML=""
                selectores[cont].insertAdjacentHTML("beforeend", templateHtml3)        
                
            }else{
                info.innerHTML="";
              
                info.insertAdjacentHTML("beforeend", e.data)
            }
           
        })
    }
}

