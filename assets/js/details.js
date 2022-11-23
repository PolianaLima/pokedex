
function executaDetalhes(nomes, paginaIndex) {

    pokemonDetails(nomes)
        .then(pokemon => {

            const pokemonSpecies = pokemonDetailsSpecies(pokemon.number)

            paginaIndex.innerHTML = ` 
              
        <li class="pokemom ${pokemon.type}">
        
          <div class="topo">                
            <img src="https://img.icons8.com/small/32/000000/long-arrow-left.png" onClick="window.location.reload()"  alt="Voltar Pagina Principal"/>
            <img src="https://img.icons8.com/tiny-color/32/null/like.png"  alt=""/>
          </div>
        
           <span class=" number">#${pokemon.number}</span>
           <span class="titleDetals ">${pokemon.name}</span>
           <div class="detail detailOnePokemon">
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type} typeOnePokemon">${type}</li>`).join('')}
                 </ol>
            </div>
           <div class="detailsPokemom">
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                
            </li>
         
        </div>

        <div class=" details">
                <div class="menu">
                    <button type="button">About</button>
                    <button type="button">base Stats</button>
                    <button type="button">Evolution</button>
                    <button type="Moves">Moves</button>
                </div>

                <div class="detailsAbout">
                    <div class="detailsList">
                        <div>
                             <span>Specie</span> 
                             <span>${pokemon.species}</span>
                        </div>
                        <div>
                             <span>Height</span> 
                             <span> ${pokemon.height} inch (${(pokemon.height*2.54).toFixed(2)} cm)</span>
                        </div>
                        <div>
                             <span>Weight</span> 
                             <span> ${pokemon.weight} lbs  (${(pokemon.weight*0.140867196).toFixed(2)} KG)</span>
                        </div>
                        <div>
                            <span>Abilities</span> 
                                <span>
                                     <ol class="abilities">
                                        ${pokemon.abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join(',')} 
                                    </ol>
                                </span>
                        </div>
                    </div>
                </div>
        </div>
`
            pokemonSpecies.then(especies=>{
                paginaIndex.innerHTML += `
        
              <div class="detailsList">
                     <h3>Breending</h3>
                        <div>
                             <span>Gender</span> 
                             <span>
                                ${especies.gender_rate}
                            </span>
                         </div>
                          <div>
                             <span>Egg Groups</span> 
                              <span>
                                <ol>
                                     ${especies.egg_groups.map((grup) => `<li >${grup.name}</li>`).join(', ')}
                                </ol>
                                   
                               </span>
                         </div>
                     
                       
                    </div>
        `
            })

        })




}


function pokemonDetails(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    return fetch(url)
        .then((response) => response.json())
        .then((pokemons) => convertPokeApiDetailToPokemom(pokemons))
        .then(detailsPokemon => detailsPokemon);

}




function pokemonDetailsSpecies(id){
    const  url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    return fetch(url)
        .then((response) => response.json())
        .then((pokemons) => pokemons)

}

