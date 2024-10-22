import { Button, Grid2, Typography } from "@mui/material";
import {
    EmotionGrid,
    EmotionTable,
    EmotionTableCell,
    EmotionTableRow,
    primaryButton,
} from "@components/emotion-components";
import { css } from "@emotion/react";
import Image from "next/image";
import TypoButton from "./typo-bar";
import { muiColor } from "@helpers/styles";
import { PokemonType } from "src/types/pokemon";
import { useRouter } from "next/router";
import { splitPokeUrl } from "@utils/custom-function";
import { ROUTES_PATH } from "@constants/config";
import useTranslation from "next-translate/useTranslation";

interface CardDetailInterface {
    data: PokemonType;
    url?: string;
    typeBtn?: boolean;
}

const CardDetail = ({ data, url, typeBtn = false }: CardDetailInterface) => {
    const { t } = useTranslation();
    const route = useRouter();
    return (
        <Grid2 container sx={{ alignItems: "center", padding: "5rem 0" }}>
            <Grid2 size={4} sx={{ paddingRight: "1.5rem" }}>
                <div
                    css={css`
                        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                        border-radius: 1rem;
                    `}
                >
                    <Image
                        src={
                            data.sprites.other["official-artwork"].front_default
                        }
                        height="0"
                        width="0"
                        sizes="100%"
                        alt="Poke-Rey-Detail"
                    />
                </div>
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
                            <strong>{t("common:card-detail.width")}</strong>
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
                                        <strong>
                                            {t("common:card-detail.height")}
                                        </strong>
                                        : {data.height}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        </EmotionTableCell>
                    </EmotionTableRow>
                    <EmotionTableRow>
                        <Typography variant="h6" sx={{ display: "table-cell" }}>
                            <strong>{t("common:card-detail.ab")}</strong>
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
                                        <li key={ab.ability.url}>
                                            {`${ab.ability.name}${
                                                ab.is_hidden
                                                    ? ` ${t(
                                                          "common:card-detail.hidden",
                                                      )}`
                                                    : " "
                                            }`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Typography>
                    </EmotionTableRow>
                    <EmotionTableRow>
                        <Typography variant="h6" sx={{ display: "table-cell" }}>
                            <strong>{t("common:card-detail.type")}</strong>
                        </Typography>
                        <EmotionTableCell>
                            <div style={{ display: "flex" }}>
                                <span style={{ marginRight: "0.5rem" }}>:</span>
                                <EmotionGrid gridCol={3}>
                                    {data.types.map((dt) => (
                                        <TypoButton
                                            key={dt.slot}
                                            data={dt.type}
                                            onClick={() => {
                                                if (typeBtn) {
                                                    route.replace(
                                                        ROUTES_PATH.pokemon_type(
                                                            dt.type.name,
                                                        ),
                                                    );
                                                }
                                            }}
                                            typeBtn={typeBtn}
                                        />
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
                            route.replace(
                                ROUTES_PATH.pokemon_detail(splitPokeUrl(url)),
                            )
                        }
                    >
                        {t("common:card-detail.btn")}
                    </Button>
                )}
            </Grid2>
        </Grid2>
    );
};

export default CardDetail;
