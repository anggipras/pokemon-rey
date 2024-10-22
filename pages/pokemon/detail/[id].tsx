import useTranslation from "next-translate/useTranslation";
import { EmotionGrid } from "@components/emotion-components";
import CardDetail from "@components/modules/card-detail";
import { muiColor } from "@helpers/styles";
import { Container, Typography } from "@mui/material";
import baseApi from "@utils/api";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import {
    Ability,
    FrontDefaultSprite,
    PokemonType,
    PokeTypeColor,
    Species,
    Sprites,
    TypePoke,
} from "src/types/pokemon";
import { css } from "@emotion/react";
import { capitalizeFirstLetter, splitPokeUrl } from "@utils/custom-function";
import Icon from "@constants/icons";
import { Chain, PokemonEvolution } from "src/types/evolution";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";
import { dataFilter } from "src/types/data-filter";
import { SlugInfo } from "../type/[id]";

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

const PokemonDetail = ({
    detailPoke,
    speciesEvoPoke,
    pokeId,
}: {
    detailPoke: PokemonType;
    speciesEvoPoke: UsedPokeDetail[];
    pokeId: string[];
}) => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>
                    {capitalizeFirstLetter(detailPoke.name)} - Pokemon
                </title>
            </Head>
            <Container maxWidth="lg">
                <CardDetail data={detailPoke} typeBtn />
                <Typography
                    variant="h6"
                    sx={{
                        color: muiColor(800).grey,
                        fontWeight: "bold",
                        marginBottom: "2rem",
                    }}
                >
                    {t("common:poke-detail.img")} :
                </Typography>
                <EmotionGrid gridCol={6}>
                    {Object.values(detailPoke.sprites.other).map(
                        (category: FrontDefaultSprite, idx) => (
                            <div
                                key={idx}
                                css={css`
                                    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px
                                            5px -1px,
                                        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                                    border-radius: 0.5rem;
                                `}
                            >
                                <Image
                                    src={category.front_default || ""}
                                    height="0"
                                    width="0"
                                    sizes="100%"
                                    alt="Poke-Rey-detail-sprites"
                                />
                            </div>
                        ),
                    )}
                </EmotionGrid>
                <div style={{ margin: "3rem 0" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: muiColor(800).grey,
                            fontWeight: "bold",
                            marginBottom: "2rem",
                        }}
                    >
                        {t("common:poke-detail.stat")} :
                    </Typography>
                    <EmotionGrid gridCol={6} style={{ alignItems: "stretch" }}>
                        {detailPoke.stats.map((dt) => (
                            <div
                                key={dt.stat.url}
                                css={css`
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    flex-direction: column;
                                    padding: 1.5rem;
                                    border-radius: 50%;
                                    border: 1.7rem solid
                                        ${PokeTypeColor[
                                            splitPokeUrl(dt.stat.url)
                                        ]};
                                    background-color: white;
                                    aspect-ratio: 1 / 1;
                                    box-sizing: border-box;
                                    width: 100%;
                                `}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: PokeTypeColor[
                                            splitPokeUrl(dt.stat.url)
                                        ],
                                        fontWeight: "bold",
                                        margin: "0",
                                        lineHeight: "1",
                                    }}
                                >
                                    {dt.base_stat}
                                </Typography>
                                <div
                                    css={css`
                                        color: black;
                                        text-transform: capitalize;
                                        text-align: center;
                                    `}
                                >
                                    {dt.stat.name}
                                </div>
                            </div>
                        ))}
                    </EmotionGrid>
                </div>
                <div style={{ margin: "3rem 0" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: muiColor(800).grey,
                            fontWeight: "bold",
                            marginBottom: "2rem",
                        }}
                    >
                        {t("common:poke-detail.evo")} :
                    </Typography>
                    <div
                        css={css`
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            gap: 1rem;
                        `}
                    >
                        {speciesEvoPoke.map((evo, idx) => (
                            <>
                                <div
                                    key={`species-evo-${evo.id}`}
                                    css={css`
                                        display: flex;
                                        align-items: center;
                                        flex-direction: column;
                                        text-align: center;
                                        cursor: pointer;
                                    `}
                                    onClick={() =>
                                        router.replace(
                                            ROUTES_PATH.pokemon_detail(
                                                pokeId[idx],
                                            ),
                                        )
                                    }
                                >
                                    <div
                                        css={css`
                                            display: flex;
                                            width: 170px;
                                            height: 170px;
                                            border-radius: 50%;
                                            align-items: center;
                                            justify-content: center;
                                            border: 1rem solid
                                                ${PokeTypeColor[idx + 1]};
                                            overflow: hidden;
                                        `}
                                    >
                                        <Image
                                            src={evo.sprites.front_default}
                                            height="150"
                                            width="150"
                                            alt="PokeDex"
                                        />
                                    </div>
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
                                        {evo.name}
                                    </Typography>
                                </div>
                                {idx < speciesEvoPoke.length - 1 && (
                                    <Icon.ArrowForward fontSize="large" />
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const api = await baseApi(process.env.NEXT_PUBLIC_API_URL);

    try {
        const apiResponse = await api.get("pokemon/?limit=2000");
        let pokeDetailPaths: SlugInfo[] = (
            apiResponse.data.results as Species[]
        ).map((v) => {
            return {
                params: { handle: "/", id: splitPokeUrl(v.url) },
                locale: "id",
            };
        });
        pokeDetailPaths = pokeDetailPaths.concat(
            (apiResponse.data.results as Species[]).map((v) => {
                return {
                    params: { handle: "/", id: splitPokeUrl(v.url) },
                    locale: "en",
                };
            }),
        );
        return {
            paths: pokeDetailPaths,
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
        const pokeRes = await api.get(`pokemon/${ctx.params.id}`);
        const pokeSpecies = await api.get(`pokemon-species/${ctx.params.id}`);
        const detailPoke = pokeRes.data;
        const pokeSpeciesId = splitPokeUrl(
            pokeSpecies.data.evolution_chain.url,
        );
        const pokeSpeciesEvo = await api.get(
            `evolution-chain/${pokeSpeciesId}`,
        );
        const pokeSpeciesData = pokeSpeciesEvo.data as PokemonEvolution;
        const evolvedPokeArr: string[] = [];
        const getSpeciesUrls = (chain: Chain): void => {
            evolvedPokeArr.push(splitPokeUrl(chain.species.url));

            // If there are evolutions (evolves_to has length), continue the recursion
            if (chain.evolves_to.length > 0) {
                getSpeciesUrls(chain.evolves_to[0]);
            }
        };
        getSpeciesUrls(pokeSpeciesData.chain);

        const evolvedPokemonSpecies = await Promise.all(
            evolvedPokeArr.map((url) =>
                api.get(`pokemon/${url}`).then((res) => {
                    const pokeDetailKey: (keyof UsedPokeDetail)[] = [
                        "abilities",
                        "id",
                        "name",
                        "species",
                        "sprites",
                        "types",
                        "weight",
                    ];
                    return dataFilter(res.data, pokeDetailKey);
                }),
            ),
        );

        return {
            props: {
                detailPoke,
                speciesEvoPoke: evolvedPokemonSpecies as UsedPokeDetail[],
                pokeId: evolvedPokeArr,
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error("Error fetching Pokémon Detail:", error);

        return {
            props: {
                pokemons: [],
            },
        };
    }
};

export default PokemonDetail;
