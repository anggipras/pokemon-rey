import useTranslation from "next-translate/useTranslation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetServerSideProps } from "next";
import baseApi from "@utils/api";
import { PokemonTypeName, PokeType } from "src/types/poke-type";
import { dataFilter } from "src/types/data-filter";
import { PokeTypeColor, Species, Sprites, TypePoke } from "src/types/pokemon";
import Image from "next/image";
import { muiColor } from "@helpers/styles";
import { Container, Popover, Typography } from "@mui/material";
import { EmotionGrid, generalCenter } from "@components/emotion-components";
import TypoButton from "@components/modules/typo-bar";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ROUTES_PATH } from "@constants/config";
import { capitalizeFirstLetter, splitPokeUrl } from "@utils/custom-function";
import Pagination from "@components/modules/pagination";
import { useState } from "react";
import Icon from "@constants/icons";
import usePagination from "@helpers/usePagination";
import { scrollToDynamicView } from "@utils/browser-behaviour";

export interface SlugInfo {
    params: { handle: string; id: string };
    locale: string;
}

interface UsedPokeType {
    id: number;
    name: string;
    pokemon: PokemonTypeName[];
}

interface UsedPokeDetail {
    id: number;
    name: string;
    sprites: Sprites;
    types: TypePoke[];
}

interface PokemonTypeWithDetail {
    pokemon: Species;
    slot: number;
    detail: UsedPokeDetail;
}

const PokemonTypePage = ({
    id,
    name,
    pokemon,
    pokeChannel,
}: {
    id: number;
    name: string;
    pokemon: PokemonTypeWithDetail[];
    pokeChannel: Species[];
}) => {
    const { t } = useTranslation();
    const route = useRouter();
    const [filteredPokeType, setFilteredPokeType] = useState<
        PokemonTypeWithDetail[]
    >(pokemon.filter((_, idx) => idx < 9));
    const {
        anchorEl,
        setAnchorEl,
        activePage,
        setActivePage,
        resetPerPage,
        perPage,
        setPerPage,
    } = usePagination({ itemsPerPage: 9 });
    const [totalPages, setTotalPages] = useState<number>(
        Math.floor(pokemon.length / perPage),
    );

    const activePageHandler = async (clickedActivePage: string) => {
        setActivePage(parseInt(clickedActivePage));
        const startIndex = (parseInt(clickedActivePage) - 1) * perPage;
        const endIndex = startIndex + perPage;
        setFilteredPokeType(pokemon.slice(startIndex, endIndex));
    };

    const handleChangePerPage = async (v: number) => {
        resetPerPage();
        setPerPage(v);
        setTotalPages(pokemon.length / v);
        setFilteredPokeType(pokemon.slice(0, v));
        scrollToDynamicView("pokemon-type");
    };

    return (
        <>
            <Head>{capitalizeFirstLetter(name)} - Pokemon Type</Head>
            <div
                id="pokemon-type"
                css={css`
                    position: absolute;
                    top: 90vh;
                    left: 0;
                    z-index: -1;
                `}
            >
                <svg
                    width="392"
                    height="780"
                    viewBox="0 0 392 780"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2 670C156.64 670 282 544.64 282 390C282 235.36 156.64 110 2 110"
                        stroke={PokeTypeColor[id]}
                        strokeWidth="220"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <div
                css={css`
                    position: absolute;
                    top: 30vh;
                    right: 0;
                    z-index: -1;
                `}
            >
                <svg
                    width="392"
                    height="780"
                    viewBox="0 0 392 780"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2 670C156.64 670 282 544.64 282 390C282 235.36 156.64 110 2 110"
                        stroke={PokeTypeColor[id]}
                        strokeWidth="220"
                        strokeLinecap="round"
                        transform="rotate(180, 196, 390)"
                    />
                </svg>
            </div>
            <Container
                maxWidth="lg"
                sx={{ display: "flex", padding: "3rem 0" }}
            >
                <div
                    css={css`
                        padding: 2rem;
                        min-width: 12rem;
                    `}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: muiColor(800).grey,
                            fontWeight: "bold",
                            marginBottom: "1rem",
                        }}
                    >
                        {t("common:poke-type.sidebar")}
                    </Typography>
                    <ul>
                        {pokeChannel.map((pk) => (
                            <li
                                css={css`
                                    color: ${pk.name === name
                                        ? [PokeTypeColor[id]]
                                        : muiColor(800).grey};
                                    margin-bottom: 1rem;
                                    text-transform: capitalize;
                                    cursor: pointer;
                                    &:hover {
                                        color: ${PokeTypeColor[id]};
                                    }
                                `}
                                key={pk.url}
                                onClick={() =>
                                    route.replace(
                                        ROUTES_PATH.pokemon_type(pk.name),
                                    )
                                }
                            >
                                {pk.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ width: "100%" }}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: muiColor(800).grey,
                            fontWeight: "bold",
                            marginBottom: "2rem",
                            textTransform: "capitalize",
                            marginTop: "1rem",
                        }}
                    >
                        {t("common:poke-type.title")} {name}
                    </Typography>
                    <TableContainer
                        component={Paper}
                        css={css`
                            padding: 3rem;
                            background-color: ${muiColor(100).grey}80;
                            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
                                rgba(0, 0, 0, 0.22) 0px 10px 10px;
                            border-radius: 3rem;
                            width: unset;
                        `}
                    >
                        <Table>
                            <TableBody>
                                {filteredPokeType.map((row, idx) => (
                                    <TableRow
                                        key={`table-row-${idx}`}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            route.replace(
                                                ROUTES_PATH.pokemon_detail(
                                                    splitPokeUrl(
                                                        row.pokemon.url,
                                                    ),
                                                ),
                                            )
                                        }
                                    >
                                        <TableCell>
                                            <div>
                                                <Image
                                                    src={
                                                        row.detail.sprites
                                                            .other[
                                                            "official-artwork"
                                                        ].front_default
                                                    }
                                                    height="100"
                                                    width="100"
                                                    alt="pokemon-type-detail"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: muiColor(800).grey,
                                                    fontWeight: "bold",
                                                    marginBottom: "2rem",
                                                    textTransform: "capitalize",
                                                    marginTop: "1rem",
                                                }}
                                            >
                                                #{row.detail.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: muiColor(800).grey,
                                                    fontWeight: "bold",
                                                    marginBottom: "2rem",
                                                    textTransform: "capitalize",
                                                    marginTop: "1rem",
                                                }}
                                            >
                                                {row.detail.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <EmotionGrid gridCol={3}>
                                                {row.detail.types.map((dt) => (
                                                    <TypoButton
                                                        key={dt.slot}
                                                        data={dt.type}
                                                    />
                                                ))}
                                            </EmotionGrid>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                                color: ${PokeTypeColor[id]};
                                margin-right: 0.5rem;
                            `}
                        >
                            <div
                                css={css`
                                    color: ${PokeTypeColor[id]};
                                    width: 100%;
                                `}
                            >
                                {t("common:pagination.page")}
                            </div>
                            <button
                                css={css`
                                    ${generalCenter}
                                    border: 0.2rem solid ${PokeTypeColor[id]};
                                    border-radius: 0.5rem;
                                    padding: 0.5rem;
                                    margin-left: 0.2rem;
                                    cursor: pointer;
                                    color: ${PokeTypeColor[id]};
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
                                                background-color: ${PokeTypeColor[
                                                    id
                                                ]};
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
                            listTheme={PokeTypeColor[id]}
                            mainTheme="#ffffff"
                            active={activePage}
                            onClickHandler={activePageHandler}
                            size={totalPages}
                            step={1}
                        />
                        <div
                            css={css`
                                display: flex;
                                color: ${PokeTypeColor[id]};
                                width: 100%;
                                justify-content: flex-end;
                            `}
                        >
                            {t("common:pagination.total")}: {totalPages || 0}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const api = await baseApi(process.env.NEXT_PUBLIC_API_URL);

    try {
        const pokeTypeRes = await api.get(`type/${ctx.params.id.toString()}`);
        const pokeTypeData = pokeTypeRes.data as PokeType;
        const pokeTypeDtKey: (keyof UsedPokeType)[] = ["id", "name", "pokemon"];
        let pokeType = dataFilter(pokeTypeData, pokeTypeDtKey);

        pokeType.pokemon = await Promise.all(
            pokeType.pokemon.map(async (poke: PokemonTypeName) => {
                const id = poke.pokemon.url.split("/").filter(Boolean).pop();
                const detailPokemon = await api.get(`/pokemon/${id}`);
                const pokeDetailDtKey: (keyof UsedPokeDetail)[] = [
                    "id",
                    "name",
                    "sprites",
                    "types",
                ];
                const pokeDetailandType = dataFilter(
                    detailPokemon.data,
                    pokeDetailDtKey,
                );
                return { ...poke, detail: pokeDetailandType };
            }),
        );

        const apiTypeResponse = await api.get("type?limit=100");

        return {
            props: {
                id: pokeType.id,
                name: pokeType.name,
                pokemon: pokeType.pokemon,
                pokeChannel: apiTypeResponse.data.results as Species[],
            },
        };
    } catch (error) {
        console.error("Error fetching Pokémon Type List:", error);

        return {
            props: {
                pokemons: [],
            },
        };
    }
};

export default PokemonTypePage;
