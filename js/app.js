
// Claves de la API
const pubkey = '0886440dd4583e687e8644024fbe7195'; // Clave publica API 
const pvtkey = '4f4ac41e501a84a2f0be20ad418d5bf56b398500'; // Clave privada API 


const ts = Date.now();
const hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString();

//  URL Api  Marvel
const baseUrl = 'https://gateway.marvel.com:443/v1/public';

// funcion de crear div con la información de los personajes
function createCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<h3>${character.name}</h3>
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
        <p>${character.description ? character.description : 'No description available.'}</p>`;
    return card;
}

// function Fetch a la API para buscar a Wolverine

function fetchCharacter(name) {
    const url = `${baseUrl}/characters?name=${name}&ts=${ts}&apikey=${pubkey}&hash=${hash}`;   // anyadir al endpoint  `ts=${ts}&apikey=${pubkey}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const charactersDiv = document.getElementById('characters');
            const characters = data.data.results;
            characters.forEach(character => {
                const card = createCard(character);
                charactersDiv.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching character:', error));
}

// Esta función asíncrona Async/await es para buscar a otro personaje
async function fetchCharacterAsync(name) {
    const url = `${baseUrl}/characters?name=${name}&ts=${ts}&apikey=${pubkey}&hash=${hash}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const charactersDiv = document.getElementById('characters');
        const characters = data.data.results;
        characters.forEach(character => {
            const card = createCard(character);
            charactersDiv.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching character with async/await:', error);
    }
}

// Llamadas a las funciones con el pj que queramos buscar

fetchCharacter('wolverine');  // Fetch 
fetchCharacterAsync('thor'); // Async/await

// Función para buscar personajes Marvel
function fetchCharacters() {
    const url = `${baseUrl}/characters?ts=${ts}&apikey=${pubkey}&hash=${hash}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const charactersDiv = document.getElementById('characters');  
            const characters = data.data.results;
            
            // Limpiar el div antes de añadir los personajes
            charactersDiv.innerHTML = '';

            // Iterar sobre los resultados y crear tarjetas para cada personaje
            characters.forEach(character => {
                const card = createCard({
                    name: character.name,  // Usar "name" para personajes
                    thumbnail: character.thumbnail,
                    description: character.description || 'No description available'
                });
                charactersDiv.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching characters:', error));
}

// Llamada a la función para buscar personajes
fetchCharacters();
