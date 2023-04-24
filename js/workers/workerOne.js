const getPokemonByName = async (url) => {
  let templateHtml2 = "";
  let templateHtml3 = "";
  let descripcionEs;

  try {
    const response = await fetch(url);
    const resultado = await response.json();
    const abilities = resultado.abilities;
    //console.log(abilities[0].ability.name);
    templateHtml2 += `
      <img src="${resultado.sprites.other.dream_world.front_default}"/>
            
      `;
    templateHtml3 += `
             <h2>${resultado.name}</h2>
            <h3>Abilities</h3>
            <ul>
              <li>${abilities[0].ability.name}</li>
  
            </ul>
            <h3>Moves</h3>
            <ul>
              <li>dragon-rage</li>
              <li>dragon-breath</li>
              <li>dragon-claw</li>
            </ul>`;

    try {
      const response2 = await fetch(resultado.species.url);
      const pokemonSpecies = await response2.json();
      let drescripciones = pokemonSpecies.flavor_text_entries;
      descripcionEs = drescripciones.filter(
        (des) => des.language.name === "es"
      );
    } catch (error) {
      console.log(error);
    }
    return {
      templateHtml2: templateHtml2,
      templateHtml3: templateHtml3,
      descripcionEs: descripcionEs,
    };
  } catch (error) {
    console.log(error);
  }
};

self.addEventListener("message", async (e) => {
  const byName = await getPokemonByName(e.data);
  postMessage(byName);
});
