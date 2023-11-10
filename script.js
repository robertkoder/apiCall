// Turn input text to lowercase and search for pokemon in api
const searchPokemon = () => {
    const pokemonName = document.getElementById("pokemon-search-input").value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayPokemonDetails(data);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Pokemon not found");
        });
};

// Check if the Enter key was pressed and search
const searchOnEnter = (event) => {
    if (event.keyCode === 13) {
        searchPokemon();
    }
};

// Display pokemon details
const displayPokemonDetails = (pokemon) => {
    const container = document.getElementById("pokemon-details");
    container.style.display = "flex";
    container.innerHTML = ""; // Clear previous content

    // Pokemon image
    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.style.width = "192px";
    img.style.height = "192px";
    container.appendChild(img);

    // Pokemon name
    container.appendChild(createDetailElement("Name", capitalizeFirstLetter(pokemon.name)));

    // Pokemon type(s)
    const types = pokemon.types.map(type => capitalizeFirstLetter(type.type.name)).join(", ");
    container.appendChild(createDetailElement("Type", types));

    // Pokemon abilities
    const abilities = pokemon.abilities.map(ability => capitalizeFirstLetter(ability.ability.name)).join(", ");
    container.appendChild(createDetailElement("Abilities", abilities));

    // Pokemon stats
    pokemon.stats.forEach(stat => {
        container.appendChild(createDetailElement(capitalizeFirstLetter(stat.stat.name), stat.base_stat));
    });
};

const createDetailElement = (label, value) => {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${label}:</strong> ${value}`;
    return element;
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};