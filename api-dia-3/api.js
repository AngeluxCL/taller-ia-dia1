//Ejercicio: Consumo de APIs con Fetch
//Objetivo: Buscar un pokemon con PokeAPI y mostrar su informacion en consola
//1. Crea una función llamada obtenerPokemonApi que reciba un nombre de pokemon, consulte la PokeApi y devuelva los datos en JSON
function obtenerPokemonApi(nombrePokemon) {
    //2. Dentro de la función, usa fetch para hacer una petición a la PokeApi
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`)
        .then(response => {
            //3. Verifica si la respuesta es correcta (status 200)
            if (!response.ok) { 
                throw new Error('Pokemon no encontrado');
            }
            //4. Convierte la respuesta a JSON
            return response.json();
        })
        .then(data => {
            //5. Retorna los datos en JSON
            console.log('Pokemon encontrado:', data);
            return data;
        })
        .catch(error => {
            //6. Maneja los errores en caso de que el pokemon no exista
            console.error('Error al obtener el pokemon:', error);
            throw error;
        });
}

//7. Prueba la función con diferentes nombres de pokemon (comentado para uso en la página web)
// obtenerPokemonApi('pikachu').then(data => console.log(data));
// obtenerPokemonApi('charizard').then(data => console.log(data));
// obtenerPokemonApi('mewtwo').then(data => console.log(data));

    