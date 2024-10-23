import useTranslation from "next-translate/useTranslation";
import { primaryButton } from "@components/emotion-components";
import { muiColor } from "@helpers/styles";
import { Button, Grid2, Typography } from "@mui/material";
import { scrollToDynamicView } from "@utils/browser-behaviour";
import Image from "next/image";

const HeroBg: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Grid2 container sx={{ alignItems: "center", padding: "5rem 0" }}>
            <Grid2 size={6}>
                <Typography
                    variant="h2"
                    sx={{ color: muiColor(800).grey, fontWeight: "700" }}
                    data-testid="hero-title"
                >
                    {t("home:hero.title")}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: muiColor(500).grey, margin: "2rem 0" }}
                    data-testid="hero-desc"
                >
                    {t("home:hero.desc")}
                </Typography>
                <Button
                    variant="contained"
                    css={primaryButton}
                    onClick={() => scrollToDynamicView("pokedex")}
                    data-testid="hero-button"
                >
                    {t("home:hero.btn")}
                </Button>
            </Grid2>
            <Grid2 size={6}>
                <Image
                    src="/imgs/pokemon_hero.png"
                    width={534}
                    height={631}
                    alt="Poke-Rey-Hero"
                />
            </Grid2>
        </Grid2>
    );
};

export default HeroBg;
