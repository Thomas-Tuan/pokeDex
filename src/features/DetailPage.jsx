import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Card, CardContent, CardMedia, Chip, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import pokemonApi from '../api/pokemonApi';
import { accentColors } from '../constant/AccentColor';
import useRandomColor from '../hooks/useRandomColor';

function DetailPage(props) {
    let { pokemonName } = useParams();
    const randomColors = useRandomColor();

    const upperFirstLetter = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState();
    const [image, setImage] = useState('');
    const [attack, setAttack] = useState();
    const [defense, setDefense] = useState();
    const [speed, setSpeed] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [typesPoke, setTypes] = useState([]);
    const fetchPokemonData = async () => {
        try {
            const response = await pokemonApi.get(pokemonName);
            setPokemon(response);
            setImage(response.sprites["front_default"])
            setAttack(response.stats[1].base_stat);
            setDefense(response.stats[2].base_stat);
            setSpeed(response.stats[5].base_stat);
            setHeight(response.height);
            setWeight(response.weight);
            setTypes(response.types);
            setIsLoading(false);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }
    useEffect(() => {
        setIsLoading(true);
        fetchPokemonData();
    }, [pokemonName]);
    return (
        <Container >
            {isLoading === true ?
                <LoadingButton loading variant="outlined">
                    Fetch data
                </LoadingButton>
                : <Grid container flexDirection="column" alignItems="center" justifyContent="center" spacing={2} mt={1}>
                    <Grid item container alignItems="center" justifyContent="center" spacing={2}>
                        <Card sx={{ maxWidth: 345, backgroundColor: randomColors }}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={image}
                                alt={pokemonName}
                                sx={{ objectFit: "contain" }}
                            />
                            <CardContent>
                                <Typography color="common.white" align="center" gutterBottom variant="h3" component="div">
                                    {upperFirstLetter}
                                </Typography>
                                <Box
                                    sx={{
                                        mb: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    {typesPoke.map((typeInfo) => {
                                        const { type } = typeInfo;
                                        const { name } = type;
                                        if (accentColors[name]) {
                                            const { color, background, border } = accentColors[name];
                                            return (
                                                <Box
                                                    key={name}
                                                    sx={{
                                                        color: color,
                                                        bgcolor: background,
                                                        border: `1px solid ${border}`,
                                                        padding: '8px',
                                                        marginRight: '8px',
                                                        borderRadius: '5px'
                                                    }}
                                                >
                                                    <Typography>{name}</Typography>
                                                </Box>
                                            );
                                        }
                                    })}
                                </Box>
                                <Typography align="center" gutterBottom variant="h5" component="div">
                                    <Chip label={"Attack: " + attack} clickable color="secondary" />
                                    &nbsp;
                                    <Chip label={"Defense: " + defense} clickable color="primary" />
                                    &nbsp;
                                    <Chip label={"Speed: " + speed} clickable color="success" />
                                    &nbsp;
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to={"/pokemons"} variant="contained">
                            Return PokemonList
                        </Button>
                    </Grid>
                </Grid>
            }

        </Container >
    )
}

export default DetailPage;