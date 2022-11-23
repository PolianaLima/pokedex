const pokeapi = {}



function convertPokeApiDetailToPokemom(pokerDetail){
    const pokemom = new Pokemon()
    pokemom.number = pokerDetail.id
    pokemom.name = pokerDetail.name

    const types = pokerDetail.types.map((typeSlot)=> typeSlot.type.name)
    const[type] = types;

    pokemom.types = types;
    pokemom.type = type

    pokemom.photo = pokerDetail.sprites.other.dream_world.front_default

    const abilities = pokerDetail.abilities.map((ability)=>ability.ability.name)
    const [abiity] = abilities;

    pokemom.species = pokerDetail.species.name
    pokemom.height = pokerDetail.height
    pokemom.weight = pokerDetail.weight


    pokemom.ability = abiity

    pokemom.abilities = abilities;


    return pokemom

}

pokeapi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url).then((response)=>response.json())
    .then(convertPokeApiDetailToPokemom)
}


pokeapi.getPokemons = (offset = 0, limit = 5)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons)=>pokemons.map(pokeapi.getPokemonDetail))
    .then((detailsRequests)=>Promise.all(detailsRequests))
    .then((pokemonDetails)=>pokemonDetails)
}