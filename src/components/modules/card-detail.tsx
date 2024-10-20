import { Button, Container, Grid2, Modal, Typography } from "@mui/material";
import {
    EmotionBoxModal,
    EmotionGrid,
    EmotionTable,
    EmotionTableCell,
    EmotionTableRow,
    primaryButton,
} from "@components/emotion-components";
import { css } from "@emotion/react";
import Image from "next/image";
import TypoBar from "./typo-bar";
import { muiColor } from "@helpers/styles";
import { PokemonType } from "src/types/pokemon";
import { useRouter } from "next/router";
import { splitPokeUrl } from "@utils/custom-function";

interface CardDetailInterface {
    data: PokemonType;
    url?: string;
}

const CardDetail = ({ data, url }: CardDetailInterface) => {
    const route = useRouter();
    return (
        <Grid2 container sx={{ alignItems: "center", padding: "5rem 0" }}>
            <Grid2 size={4} sx={{ paddingRight: "1rem" }}>
                <Image
                    src={data.sprites.other["official-artwork"].front_default}
                    height="0"
                    width="0"
                    sizes="100%"
                    alt="Poke-Rey-Detail"
                />
            </Grid2>
            <Grid2 size={8}>
                <Typography
                    variant="h3"
                    css={css`
                        color: ${muiColor(800).grey};
                        font-weight: bold;
                        margin-bottom: 3rem;
                        text-transform: capitalize;
                    `}
                >
                    {data.name}
                </Typography>
                <EmotionTable>
                    <EmotionTableRow>
                        <Typography variant="h6" sx={{ display: "table-cell" }}>
                            <strong>Weight</strong>
                        </Typography>
                        <EmotionTableCell>
                            <Grid2 container>
                                <Grid2 size={6}>
                                    <Typography variant="h6">
                                        : {data.weight}
                                    </Typography>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Typography variant="h6">
                                        <strong>Height</strong>: {data.height}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        </EmotionTableCell>
                    </EmotionTableRow>
                    <EmotionTableRow>
                        <Typography variant="h6" sx={{ display: "table-cell" }}>
                            <strong>Abilities</strong>
                        </Typography>
                        <Typography variant="h6" sx={{ display: "table-cell" }}>
                            <div style={{ display: "flex" }}>
                                <span style={{ marginRight: "0.5rem" }}>:</span>
                                <ul
                                    style={{
                                        margin: 0,
                                        padding: "0 1rem",
                                    }}
                                >
                                    {data.abilities.map((ab) => (
                                        <li
                                            key={ab.ability.url}
                                            style={{
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {`${ab.ability.name}${
                                                ab.is_hidden ? " (hidden)" : " "
                                            }`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Typography>
                    </EmotionTableRow>
                    <EmotionTableRow>
                        <Typography variant="h6" sx={{ display: "table-cell" }}>
                            <strong>Type</strong>
                        </Typography>
                        <EmotionTableCell>
                            <div style={{ display: "flex" }}>
                                <span style={{ marginRight: "0.5rem" }}>:</span>
                                <EmotionGrid gridCol={3}>
                                    {data.types.map((dt) => (
                                        <TypoBar key={dt.slot} data={dt.type} />
                                    ))}
                                </EmotionGrid>
                            </div>
                        </EmotionTableCell>
                    </EmotionTableRow>
                </EmotionTable>
                {url && (
                    <Button
                        variant="contained"
                        css={primaryButton}
                        sx={{ marginTop: "3rem" }}
                        onClick={() =>
                            route.push(`/pokemon/detail/${splitPokeUrl(url)}`)
                        }
                    >
                        More Detail
                    </Button>
                )}
            </Grid2>
        </Grid2>
    );
};

export default CardDetail;
