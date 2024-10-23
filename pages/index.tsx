import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import HeroBg from "@components/modules/hero-bg";
import PokeCard from "@components/modules/card";
import Pagination from "@components/modules/pagination";
import { muiColor } from "@helpers/styles";
import {
    Ability,
    PokemonType,
    Species,
    Sprites,
    TypePoke,
} from "src/types/pokemon";
import { dataFilter } from "src/types/data-filter";
import { Container, Popover, Typography } from "@mui/material";
import baseApi from "@utils/api";
import { splitPokeUrl } from "@utils/custom-function";
import { css } from "@emotion/react";
import Icon from "@constants/icons";
import { generalCenter } from "@components/emotion-components";
import usePagination from "@helpers/usePagination";
import { scrollToDynamicView } from "@utils/browser-behaviour";

interface Pokemon {
    name: string;
    url: string;
    detail?: PokemonType;
}

interface PokemonListProps {
    countedPokemons: number;
    initialPokemons?: Pokemon[];
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
    const {
        anchorEl,
        setAnchorEl,
        activePage,
        setActivePage,
        resetPerPage,
        perPage,
        setPerPage,
    } = usePagination({ itemsPerPage: 9 });
    const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
    const [offset, setOffset] = useState<number>(initialOffset);
    const [totalPages, setTotalPages] = useState<number>(
        Math.floor(countedPokemons / perPage),
    );

    const fetchPokemons = async (newLimit: number, newOffset: number) => {
        try {
            const api = await baseApi(process.env.NEXT_PUBLIC_API_URL);
            const response = await api.get(
                `/pokemon?limit=${newLimit}&offset=${newOffset}`,
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
            setPerPage(newLimit);
            setOffset(newOffset);
            setTotalPages(Math.floor(countedPokemons / newLimit));
        } catch (error) {
            console.error("Error fetching Pokémon list:", error);
        }
    };

    const activePageHandler = async (clickedActivePage: string) => {
        setActivePage(parseInt(clickedActivePage));
        await fetchPokemons(
            perPage,
            (parseInt(clickedActivePage) - 1) * perPage,
        );
    };

    const handleChangePerPage = async (v: number) => {
        resetPerPage();
        await fetchPokemons(v, 0);
        scrollToDynamicView("pokedex");
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
                        <div
                            css={css`
                                ${generalCenter}
                                width: 100%;
                                color: white;
                            `}
                        >
                            <Typography variant="h6">
                                {t("common:pagination.page")}:
                            </Typography>
                            <button
                                css={css`
                                    ${generalCenter}
                                    border: 0.2rem solid white;
                                    border-radius: 0.5rem;
                                    padding: 0.5rem;
                                    margin-left: 1rem;
                                    cursor: pointer;
                                    color: white;
                                    background-color: transparent;
                                `}
                                onClick={(event) =>
                                    setAnchorEl(event.currentTarget)
                                }
                            >
                                <Typography variant="h6">{perPage}</Typography>
                                <Icon.KeyboardArrowDown
                                    sx={{ marginLeft: "0.5rem" }}
                                />
                            </button>
                            <Popover
                                id={anchorEl ? "simple-popover" : undefined}
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                            >
                                {[3, 6, 9].map((v, idx) => (
                                    <div
                                        key={`paginate-${idx}`}
                                        css={css`
                                            padding: 0.5rem 1.5rem;
                                            cursor: pointer;
                                            &:hover {
                                                background-color: ${muiColor(
                                                    500,
                                                ).amber};
                                            }
                                        `}
                                        onClick={() => handleChangePerPage(v)}
                                    >
                                        {v}
                                    </div>
                                ))}
                            </Popover>
                        </div>
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
        return {
            props: {
                countedPokemons: 0,
                initialPokemons: [],
                initialOffset: 0,
            },
        };
    }
};

export default Index;
