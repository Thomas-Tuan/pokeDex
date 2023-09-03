import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Container, Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import usePokemons from '../hooks/usePokemon';
import PokemonCard from './components/PokemonCard';


function PokemonList(props) {
    const [offset, setOffset] = useState(0);
    const { pokemons, limit, isLoading } = usePokemons(offset, setOffset);
    return (
        <Container>
            {pokemons.length > 0 ? (
                <Grid container spacing={3}>
                    {pokemons.map((pokemon, idx) => {
                        return (
                            <PokemonCard key={pokemon.name} pokemon={pokemon} />
                        );
                    })}
                </Grid>
            ) : null}
            <Box sx={{ maxWidth: 'xs' }} textAlign='center' mt={3}>
                {isLoading === true ?
                    <LoadingButton loading variant="outlined">
                        Fetch data
                    </LoadingButton>
                    :
                    <Button color='warning' onClick={() => setOffset(offset + limit)} variant="contained">Load more</Button>
                }
            </Box>

        </Container >
    );
};

export default PokemonList;