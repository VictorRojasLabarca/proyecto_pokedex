const getPokemonData = async (query) =>{
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if(!response.ok)throw new Error('Pokémon no encontrado');
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error.message);
    }
};

document.querySelector('#searchPokemon').addEventListener('click', async () =>{
    const query = document.querySelector('#inputPokemon').value.toLowerCase();
    const pokemonData = await getPokemonData(query);

    if(pokemonData){
        renderPokemonInfo(pokemonData);
    }else{
        alert('Pokémon no encontrado, intenta con otro número o nombre');
    }
});

const renderPokemonInfo = (pokemon) =>{
    const displayLeft = document.querySelector('.display');
    displayLeft.innerHTML = `
        <h2 class='pokemon-name'>${pokemon.name.toUpperCase()}</h2>
        <img class='pokemon-image' src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    `;
    const displayRight = document.querySelector('.display-2');
    displayRight.innerHTML = `
        <h4>INFORMACIÓN:</h4>
        <p>Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}.</p>
    `;
};