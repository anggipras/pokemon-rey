import useTranslation from "next-translate/useTranslation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetStaticPaths, GetStaticProps } from "next";
import baseApi from "@utils/api";
import { PokemonTypeName, PokeType } from "src/types/poke-type";
import { dataFilter } from "src/types/data-filter";
import { PokeTypeColor, Species, Sprites, TypePoke } from "src/types/pokemon";
import Image from "next/image";
import { muiColor } from "@helpers/styles";
import { Container, Typography } from "@mui/material";
import { EmotionGrid } from "@components/emotion-components";
import TypoButton from "@components/modules/typo-bar";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ROUTES_PATH } from "@constants/config";
import { capitalizeFirstLetter, splitPokeUrl } from "@utils/custom-function";
import Pagination from "@components/modules/pagination";
import { useState } from "react";

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
}: {
    id: number;
    name: string;
    pokemon: PokemonTypeWithDetail[];
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [filteredPokeType, setFilteredPokeType] = useState<
        PokemonTypeWithDetail[]
    >(pokemon.filter((_, idx) => idx < 9));
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState<number>(9);
    const [totalPages, setTotalPages] = useState<number>(
        Math.floor(pokemon.length / perPage),
    );

    const activePageHandler = async (clickedActivePage: string) => {
        setActivePage(parseInt(clickedActivePage));
        const startIndex = (parseInt(clickedActivePage) - 1) * perPage;
        const endIndex = startIndex + perPage;
        setFilteredPokeType(pokemon.slice(startIndex, endIndex));
    };

    return (
        <>
            <Head>{capitalizeFirstLetter(name)} - Pokemon Type</Head>
            {/* <div
                css={css`
                    position: absolute;
                    top: 0;
                    right: 0;
                `}
            >
                <Image
                    src="/imgs/pokemon_hero.png"
                    height="1000"
                    width="1000"
                    alt="pokemon-type-detail"
                    style={{ position: "absolute" }}
                />
            </div> */}
            <Container maxWidth="lg" sx={{ padding: "3rem 0" }}>
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
                        background-color: transparent;
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
                            rgba(0, 0, 0, 0.22) 0px 10px 10px;
                        border-radius: 3rem;
                    `}
                >
                    <Table>
                        <TableBody>
                            {filteredPokeType.map((row, idx) => (
                                <TableRow
                                    key={`table-row-${idx}`}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        router.push(
                                            ROUTES_PATH.pokemon_detail(
                                                splitPokeUrl(row.pokemon.url),
                                            ),
                                        )
                                    }
                                >
                                    <TableCell>
                                        <div>
                                            <Image
                                                src={
                                                    row.detail.sprites.other[
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
                    <Typography
                        variant="h6"
                        css={css`
                            color: ${PokeTypeColor[id]};
                            width: 100%;
                        `}
                    >
                        {t("common:pagination.page")}: {perPage}
                    </Typography>
                    <Pagination
                        listTheme={PokeTypeColor[id]}
                        mainTheme="#ffffff"
                        active={activePage}
                        onClickHandler={activePageHandler}
                        size={totalPages}
                        step={1}
                    />
                    <Typography
                        variant="h6"
                        css={css`
                            display: flex;
                            color: ${PokeTypeColor[id]};
                            width: 100%;
                            justify-content: flex-end;
                        `}
                    >
                        {t("common:pagination.total")}: {totalPages || 0}
                    </Typography>
                </div>
            </Container>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const api = await baseApi(process.env.NEXT_PUBLIC_API_URL);

    try {
        const apiResponse = await api.get("type");
        let pokeTypePaths: SlugInfo[] = (
            apiResponse.data.results as Species[]
        ).map((v) => {
            return {
                params: { handle: "/", id: v.name.toString() },
                locale: "id",
            };
        });
        pokeTypePaths = pokeTypePaths.concat(
            (apiResponse.data.results as Species[]).map((v) => {
                return {
                    params: { handle: "/", id: v.name.toString() },
                    locale: "en",
                };
            }),
        );
        return {
            paths: pokeTypePaths,
            fallback: "blocking",
        };
    } catch (error) {
        console.error("Failed to get slugs:", error);

        return {
            paths: [],
            fallback: true,
        };
    }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
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

        return {
            props: {
                id: pokeType.id,
                name: pokeType.name,
                pokemon: pokeType.pokemon,
            },
            revalidate: 3600,
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
