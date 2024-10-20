import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid2,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import { ROUTES_PATH } from "@constants/config";
import HeroBg from "@components/modules/hero-bg";
import PokeCard from "@components/modules/card";
import { muiColor } from "@helpers/styles";
import { css } from "@emotion/react";
import baseApi from "@utils/api";
import { GetStaticProps } from "next";
import { PokemonType } from "src/types/pokemon";
import { splitPokeUrl } from "@utils/custom-function";

interface Pokemon {
    name: string;
    url: string;
    detail?: PokemonType;
}

interface PokemonListProps {
    countedPokemons: number;
    initialPokemons: Pokemon[];
    initialOffset: number;
}

const Index = ({
    countedPokemons,
    initialPokemons,
    initialOffset,
}: PokemonListProps) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
    const [offset, setOffset] = useState<number>(initialOffset);
    const [loading, setLoading] = useState<boolean>(false);

    const { t } = useTranslation();
    const route = useRouter();
    const { locale } = route;

    const tempRequirements = [
        { desc: "requirement-desc-1", action: null },
        { desc: "requirement-desc-2", action: "change-language" },
        { desc: "requirement-desc-3", action: null },
        { desc: "requirement-desc-4", action: null },
        { desc: "requirement-desc-5", action: null },
    ];

    const handleChangeLanguage = async () => {
        await setLanguage(locale === "id" ? "en" : "id");
    };

    const fetchPokemons = async (newOffset: number) => {
        setLoading(true);
        try {
            const api = await baseApi(process.env.NEXT_PUBLIC_API_URL);
            const response = await api.get(
                `/pokemon?limit=9&offset=${newOffset}`,
            );
            setPokemons(response.data.results);
            setOffset(newOffset);
        } catch (error) {
            console.error("Error fetching Pokémon list:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Pokemon - Rey</title>
            </Head>
            <Container maxWidth="lg">
                <HeroBg />
                {/* <Box component="div" m={10}>
                    <Grid2 container>
                        <Grid2 size={12}>
                            <Typography
                                align="center"
                                variant="h4"
                                component="h3"
                            >
                                {t("home:welcome-title")}
                            </Typography>
                        </Grid2>
                        <Grid2 size={12}>
                            <Box component="div" m={2}>
                                <Container maxWidth="sm">
                                    <Typography variant="body1" component="p">
                                        {t("home:welcome-description")}
                                        <Button
                                            target="_blank"
                                            href="https://pokeapi.co/"
                                            color="primary"
                                            style={{
                                                color: "##0082a3",
                                                fontWeight: "bold",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            Pokemon API
                                        </Button>
                                    </Typography>
                                    <Box m="5" height={30} />
                                    <Card variant="elevation" elevation={8}>
                                        <CardContent>
                                            <Typography
                                                color="textPrimary"
                                                variant="h6"
                                                gutterBottom
                                            >
                                                {t("home:requirement-title")}
                                            </Typography>
                                            <List>
                                                {tempRequirements.map(
                                                    (requirement, key) => (
                                                        <ListItem
                                                            disableGutters
                                                            key={`requirement-list-${key}`}
                                                        >
                                                            <ListItemIcon>
                                                                <Check />
                                                            </ListItemIcon>
                                                            <ListItemText>
                                                                {t(
                                                                    `home:${requirement.desc}`,
                                                                )}
                                                                {requirement.action ===
                                                                    "change-language" && (
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        size="small"
                                                                        onClick={
                                                                            handleChangeLanguage
                                                                        }
                                                                    >
                                                                        {t(
                                                                            `common:language-${locale}`,
                                                                        )}
                                                                    </Button>
                                                                )}
                                                            </ListItemText>
                                                        </ListItem>
                                                    ),
                                                )}
                                            </List>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={() =>
                                                    route.push(
                                                        ROUTES_PATH.pokemon_list,
                                                    )
                                                }
                                            >
                                                {t("home:requirement-action")}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Container>
                            </Box>
                        </Grid2>
                        <Grid2 size={12}>
                            <Box component="div" m={5}>
                                <Typography variant="h4" component="h3">
                                    {t("home:welcome-work")}
                                </Typography>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Box> */}
            </Container>
            <div
                id="pokedex"
                css={css`
                    background-color: ${muiColor(300).amber};
                    padding: 5rem 0;
                `}
            >
                <Container maxWidth="lg">
                    <Container
                        sx={{ textAlign: "center", marginBottom: "5rem" }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                color: muiColor(800).grey,
                                fontWeight: "bold",
                            }}
                        >
                            PokèDex
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: muiColor(800).grey,
                                marginTop: "2rem",
                            }}
                        >
                            All Generation totaling
                            <br />
                            {countedPokemons || 0} Pokemon
                        </Typography>
                    </Container>
                    <div
                        css={css`
                            display: grid;
                            grid-template-columns: repeat(3, minmax(0, 1fr));
                            gap: 2rem 3rem;
                        `}
                    >
                        {pokemons.map((dt) => (
                            <PokeCard
                                key={splitPokeUrl(dt.url)}
                                data={dt.detail}
                                url={dt.url}
                            />
                        ))}
                    </div>
                </Container>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const api = await baseApi(process.env.NEXT_PUBLIC_API_URL);

    try {
        const response = await api.get("/pokemon?limit=9&offset=0");
        let initialPokemons = response.data.results;
        const countedPokemons = response.data.count;

        initialPokemons = await Promise.all(
            initialPokemons.map(async (pokemon: Pokemon) => {
                const id = pokemon.url.split("/").filter(Boolean).pop(); // Extract ID from URL
                const detailPokemon = await api.get(`/pokemon/${id}`); // Fetch Pokémon detail
                return { ...pokemon, detail: detailPokemon.data }; // Add detail to the Pokémon
            }),
        );

        return {
            props: {
                countedPokemons,
                initialPokemons,
                initialOffset: 0,
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error("Error fetching Pokémon list:", error);

        return {
            props: {
                pokemons: [],
            },
        };
    }
};

export default Index;
