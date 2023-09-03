import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import useRandomColor from '../../../hooks/useRandomColor';

PokemonCard.propTypes = {
    pokemonData: PropTypes.object,
};
PokemonCard.defaultProps = {
    pokemonData: {},
};

function PokemonCard(props) {
    const { pokemon } = props;
    const randomColors = useRandomColor();
    const upperFirstLetter = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return (
        <Grid item xs={12} sm={6} lg={3} >
            <Card sx={{ maxWidth: 450, backgroundColor: randomColors }}>
                <Link style={{ textDecoration: "none" }} to={`${pokemon.name}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="240"
                            image={pokemon.img}
                            alt={pokemon.name}
                            sx={{ objectFit: "contain" }}
                        />
                        <CardContent>
                            <Box sx={{ maxWidth: 'xs' }} textAlign='center' mt={3}>
                                <Typography align="center" sx={{ color: 'common.black' }} gutterBottom variant="h5" component="div">
                                    {pokemon.pokemonId}
                                </Typography>
                                <Typography align="center" sx={{ color: 'common.white' }} gutterBottom variant="h4" component="div">
                                    {upperFirstLetter}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </Grid >


    );
}

export default PokemonCard;