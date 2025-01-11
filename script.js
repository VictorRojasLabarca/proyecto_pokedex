let currentPokemonId = 1;//Muestra el primer pokémon al cargar la página.

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

// document.querySelector('#searchPokemon').addEventListener('click', async () =>{
//     const query = document.querySelector('#inputPokemon').value.toLowerCase();
//     const pokemonData = await getPokemonData(query);

//     if(pokemonData){
//         renderPokemonInfo(pokemonData);
//     }else{
//         alert('Pokémon no encontrado, intenta con otro número o nombre');
//     }
// });

const renderPokemonInfo = (pokemon) =>{
    //información pantalla izquierda - info left display
    const displayLeft = document.querySelector('.display');
    displayLeft.innerHTML = `
        <h2 class='pokemon-name'>${pokemon.name.toUpperCase()}</h2>
        <img class='pokemon-image' src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    `;

    //Información input - Info input
    const inputPokemon = document.querySelector('#inputPokemon');
    inputPokemon.value = pokemon.id;

    //información pantalla derecha - info right display
    const displayRight = document.querySelector('.display-2');
    displayRight.innerHTML = `
        <h4>INFORMACIÓN:</h4>
        <p>Número ID: ${pokemon.id}</p>
        <p>Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}.</p>
        <p>Peso: ${pokemon.weight/10} kg.</p>
        <p>Altura: ${pokemon.height/10} mts.</p>
        <p>Puntos de salud: ${pokemon.stats[0].base_stat} pts.</p>
        <p>Puntos de ataque: ${pokemon.stats[1].base_stat} pts.</p>
        <p>Puntos de defensa: ${pokemon.stats[2].base_stat} pts.</p>
        <p>Velocidad: ${pokemon.stats[5].base_stat}.</p>
    `;
};

const fetchAndRenderPokemonInfo = async(id) =>{
    const pokemonData = await getPokemonData(id);
    if(pokemonData){
        currentPokemonId = pokemonData.id;
        renderPokemonInfo(pokemonData);
    }else{
        alert('Pokémon no encontrado, intenta con otro número o nombre');
    }
};

//Botón Buscar - Search Button
document.querySelector('#searchPokemon').addEventListener('click', async() =>{
    const query = document.querySelector('#inputPokemon').value.toLowerCase();
    await fetchAndRenderPokemonInfo(query);
});

//Botón Anterior - Previous Button
document.querySelector('#prev').addEventListener('click', async() =>{
    if(currentPokemonId > 1){
        await fetchAndRenderPokemonInfo(currentPokemonId - 1);
    }else{
        alert('Pokémon no encontrado, intenta con otro número o nombre');
    }
});

//Botón Siguiente - Next Button
document.querySelector('#next').addEventListener('click', async() =>{
        await fetchAndRenderPokemonInfo(currentPokemonId + 1);
});

//Cargar el primer pokémon al cargar la página - Load the first pokémon when the page loads
fetchAndRenderPokemonInfo(currentPokemonId);