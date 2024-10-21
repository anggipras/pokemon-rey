import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import Head from "next/head";
import { Container, Typography } from "@mui/material";
import HeroBg from "@components/modules/hero-bg";
import PokeCard from "@components/modules/card";
import { muiColor } from "@helpers/styles";
import { css } from "@emotion/react";
import baseApi from "@utils/api";
import { GetStaticProps } from "next";
import {
    Ability,
    PokemonType,
    Species,
    Sprites,
    TypePoke,
} from "src/types/pokemon";
import { splitPokeUrl } from "@utils/custom-function";
import Pagination from "@components/modules/pagination";
import { dataFilter } from "src/types/data-filter";

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

interface UsedPokeDetail {
    abilities: Ability[];
    height: number;
    id: number;
    name: string;
    species: Species;
    sprites: Sprites;
    types: TypePoke[];
    weight: number;
}

const Index = ({
    countedPokemons,
    initialPokemons,
    initialOffset,
}: PokemonListProps) => {
    const { t } = useTranslation();
    const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
    const [offset, setOffset] = useState<number>(initialOffset);
    const [loading, setLoading] = useState<boolean>(false);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState<number>(9);
    const [totalPages, setTotalPages] = useState<number>(
        Math.floor(countedPokemons / perPage),
    );

    const tempRequirements = [
        { desc: "requirement-desc-1", action: null },
        { desc: "requirement-desc-2", action: "change-language" },
        { desc: "requirement-desc-3", action: null },
        { desc: "requirement-desc-4", action: null },
        { desc: "requirement-desc-5", action: null },
    ];

    const fetchPokemons = async (newOffset: number) => {
        setLoading(true);
        try {
            const api = await baseApi(process.env.NEXT_PUBLIC_API_URL);
            const response = await api.get(
                `/pokemon?limit=${perPage}&offset=${newOffset}`,
            );
            let initialPokemons = response.data.results;
            initialPokemons = await Promise.all(
                initialPokemons.map(async (pokemon: Pokemon) => {
                    const id = pokemon.url.split("/").filter(Boolean).pop();
                    const detailPokemon = await api.get(`/pokemon/${id}`);
                    return { ...pokemon, detail: detailPokemon.data };
                }),
            );
            setPokemons(initialPokemons);
            setOffset(newOffset);
        } catch (error) {
            console.error("Error fetching Pokémon list:", error);
        } finally {
            setLoading(false);
        }
    };

    const activePageHandler = async (clickedActivePage: string) => {
        setActivePage(parseInt(clickedActivePage));
        await fetchPokemons((parseInt(clickedActivePage) - 1) * perPage);
    };

    return (
        <>
            <Head>
                <title>Pokemon - Rey</title>
            </Head>
            <Container maxWidth="lg">
                <HeroBg />
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
                            {t("home:pokedex.title")}
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
                    <div
                        css={css`
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 2rem;
                            width: 100%;
                        `}
                    >
                        <Typography
                            variant="h6"
                            css={css`
                                color: white;
                                width: 100%;
                            `}
                        >
                            {t("common:pagination.page")}: {perPage}
                        </Typography>
                        <Pagination
                            listTheme="#ffffff"
                            mainTheme={muiColor(300).amber}
                            active={activePage}
                            onClickHandler={activePageHandler}
                            size={totalPages}
                            step={1}
                        />
                        <Typography
                            variant="h6"
                            css={css`
                                display: flex;
                                color: white;
                                width: 100%;
                                justify-content: flex-end;
                            `}
                        >
                            {t("common:pagination.total")}:{" "}
                            {countedPokemons || 0}
                        </Typography>
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
                const pokeDetailDtKey: (keyof UsedPokeDetail)[] = [
                    "abilities",
                    "id",
                    "name",
                    "species",
                    "sprites",
                    "types",
                    "weight",
                ];
                const pokeDetail = dataFilter(
                    detailPokemon.data,
                    pokeDetailDtKey,
                );
                return { ...pokemon, detail: pokeDetail }; // Add detail to the Pokémon
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
