const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const paginaIndex = document.getElementById("content")


const maxRecord = 151
const limit = 10;
let offset = 0;

function loadPokemItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => ` 
             
             
               <li class="pokemom ${pokemon.type}" id="${pokemon.name}">
                            <span class="number ">#${pokemon.number}</span> 
                            <span class="name ${pokemon.name}">${pokemon.name}</span>

                            
                            <div class="detail">
            
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </ol>
                                <img src=${pokemon.photo}  alt="${pokemon.name}"/>
                                
                            </div>          
               </li>
           
          
            
        `).join('')

        pokemonList.innerHTML += newHtml

        const detalhesdoPokemon = document.querySelectorAll('.pokemom')
       // console.log(Array.from(detalhesdoPokemon))

        Array.from(detalhesdoPokemon).map(poke => poke.addEventListener('click', () => {
          //  console.log(poke.id)
            loadMoreButton.parentElement.removeChild(loadMoreButton);

            paginaIndex.innerHTML = `
            
            `
            executaDetalhes(poke.id, paginaIndex)
        }))


    })


}


loadPokemItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecord) {
        const newLimit = maxRecord - offset
        loadPokemItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemItens(offset, limit)
    }


})






