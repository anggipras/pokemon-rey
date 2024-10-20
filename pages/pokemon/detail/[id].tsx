import { EmotionGrid } from "@components/emotion-components";
import CardDetail from "@components/modules/card-detail";
import { muiColor } from "@helpers/styles";
import { Container, Typography } from "@mui/material";
import baseApi from "@utils/api";
import { GetStaticPaths, GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Image from "next/image";
import {
    FrontDefaultSprite,
    PokemonType,
    PokeTypeColor,
} from "src/types/pokemon";
import { css } from "@emotion/react";
import { splitPokeUrl } from "@utils/custom-function";
import Icon from "@constants/icons";
import { EvolvesTo, PokemonEvolution } from "src/types/evolution";

const DetailPokemon = ({
    detailPokemon,
}: // pokeSpeciesEvo,
{
    detailPokemon: PokemonType;
    // pokeSpeciesEvo: PokemonType[];
}) => {
    const { t } = useTranslation();
    // console.log(pokeSpeciesEvo);

    return (
        <>
            <Head>
                <title>{detailPokemon.name} - Pokemon</title>
            </Head>
            <Container maxWidth="lg">
                <CardDetail data={detailPokemon} />
                <Typography
                    variant="h6"
                    sx={{
                        color: muiColor(800).grey,
                        fontWeight: "bold",
                        marginBottom: "2rem",
                    }}
                >
                    Other Images :
                </Typography>
                <EmotionGrid gridCol={6}>
                    {Object.values(detailPokemon.sprites.other).map(
                        (category: FrontDefaultSprite, idx) => (
                            <Image
                                key={idx}
                                src={category.front_default || ""}
                                height="0"
                                width="0"
                                sizes="100%"
                                alt="Poke-Rey-detail-sprites"
                            />
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
                        Stats :
                    </Typography>
                    <EmotionGrid gridCol={6} style={{ alignItems: "stretch" }}>
                        {detailPokemon.stats.map((dt) => (
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
                        Evolution :
                    </Typography>
                    <div
                        css={css`
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 1rem;
                        `}
                    >
                        {[1, 2, 3, 4].map((dt, idx) => (
                            <>
                                <div
                                    key={idx}
                                    css={css`
                                        display: flex;
                                        align-items: center;
                                        flex-direction: column;
                                        text-align: center;
                                    `}
                                >
                                    <div
                                        css={css`
                                            display: flex;
                                            width: 200px;
                                            height: 200px;
                                            border-radius: 50%;
                                            align-items: center;
                                            justify-content: center;
                                            border: 1rem solid
                                                ${PokeTypeColor[idx + 1]};
                                            overflow: hidden;
                                        `}
                                    >
                                        <Image
                                            src="/imgs/pokemon_hero.png"
                                            height="100"
                                            width="100"
                                            alt="PokeDex"
                                        />
                                    </div>
                                    <p>Pokemon Evolution State 1 Name</p>
                                </div>
                                {idx < 3 && (
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
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const api = await baseApi(process.env.NEXT_PUBLIC_API_URL);

    try {
        const response = await api.get(`pokemon/${ctx.params.id}`);
        const pokeSpecies = await api.get(`pokemon-species/${ctx.params.id}`);
        const detailPokemon = response.data;
        const pokeSpeciesId = splitPokeUrl(
            pokeSpecies.data.evolution_chain.url,
        );
        const pokeSpeciesEvo = await api.get(
            `evolution-chain/${pokeSpeciesId}`,
        );
        const pokeSpeciesData = pokeSpeciesEvo.data as PokemonEvolution;
        const evolvedPoke = [
            await api.get(
                `pokemon/${splitPokeUrl(pokeSpeciesData.chain.species.url)}`,
            ),
        ];
        const extractEvolveData = async (obj: EvolvesTo) => {
            evolvedPoke.push(
                await api.get(`pokemon/${splitPokeUrl(obj.species.url)}`),
            );
            if (obj.evolves_to && obj.evolves_to.length > 0) {
                obj.evolves_to.forEach((innerObj) =>
                    extractEvolveData(innerObj),
                );
            }
        };
        pokeSpeciesData.chain.evolves_to.forEach((v) => extractEvolveData(v));
        const allEvolvedPokemon = await Promise.all(evolvedPoke);

        return {
            props: {
                detailPokemon,
                // pokeSpeciesEvo: allEvolvedPokemon,
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

export default DetailPokemon;
