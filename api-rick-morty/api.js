/**
 * API de Rick and Morty
 * Consume la API de Rick and Morty para obtener personajes
 * URL: https://rickandmortyapi.com/api/character
 */

/**
 * Obtiene todos los personajes de la API de Rick and Morty
 * @returns {Promise<Array>} Promesa que se resuelve con array de personajes
 */
function obtenerPersonajes() {
    return fetch('https://rickandmortyapi.com/api/character')
        .then(response => {
            // Verificar si la respuesta es correcta
            if (!response.ok) {
                throw new Error('Error al obtener los personajes');
            }
            return response.json();
        })
        .then(data => {
            // Retornar el array de resultados
            console.log('Personajes obtenidos:', data.results.length);
            return data.results;
        })
        .catch(error => {
            console.error('Error al consumir la API:', error);
            throw error;
        });
}

/**
 * Filtra personajes por nombre
 * @param {Array} personajes - Array de personajes
 * @param {string} termino - Término de búsqueda
 * @returns {Array} Array de personajes filtrados
 */
function filtrarPersonajes(personajes, termino) {
    // Si el término está vacío, retornar todos
    if (!termino || termino.trim().length === 0) {
        return personajes;
    }

    // Filtrar por nombre (case-insensitive)
    return personajes.filter(personaje =>
        personaje.name.toLowerCase().includes(termino.toLowerCase())
    );
}

/**
 * Obtiene personajes con búsqueda
 * @param {string} nombre - Nombre del personaje a buscar (opcional)
 * @returns {Promise<Array>} Promesa con personajes filtrados
 */
function obtenerPersonajesBusqueda(nombre = '') {
    return obtenerPersonajes()
        .then(personajes => {
            return filtrarPersonajes(personajes, nombre);
        })
        .catch(error => {
            throw error;
        });
}