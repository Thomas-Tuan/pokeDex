import { useEffect, useState } from 'react';
import pokemonApi from '../api/pokemonApi';


const usePokemons = (offset, setOffset) => {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const limit = 20;
    useEffect(() => {
        setIsLoading(true);
        fetchPokemonList();
    }, [offset])

    const indexPokemonInList = (indexPokemon) => {
        const pokemonUrl = indexPokemon.url;
        const urlParts = pokemonUrl.split('/');
        const pokemonId = (urlParts[urlParts.length - 2]).toString();
        const listPokemon = {
            pokemonId: `#${pokemonId.padStart(3, 0)}`,
            name: indexPokemon.name,
            url: indexPokemon.url,
            img: `${process.env.REACT_APP_POKEMON_URL__IMG}${pokemonId}.png`,
        }
        return listPokemon
    }
    const fetchPokemonList = async () => {
        try {
            const params = {
                offset,
                limit,
            }
            const response = await pokemonApi.getAll(params);
            const listPokemons = response.results.map(pokemon => indexPokemonInList(pokemon))
            setIsLoading(false);
            setPokemons([...pokemons, ...listPokemons]);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }
    return {
        pokemons,
        limit,
        isLoading,
    };
}

export default usePokemons;