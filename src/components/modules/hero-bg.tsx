import { primaryButton } from "@components/emotion-components";
import { muiColor } from "@helpers/styles";
import { Button, Grid2, Typography } from "@mui/material";
import { scrollToDynamicView } from "@utils/browser-behaviour";
import Image from "next/image";

const HeroBg = () => {
    return (
        <Grid2 container sx={{ alignItems: "center", padding: "5rem 0" }}>
            <Grid2 size={6}>
                <Typography
                    variant="h2"
                    sx={{ color: muiColor(800).grey, fontWeight: "bold" }}
                >
                    All the Pokémon data you`ll ever need in one place!
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ color: muiColor(500).grey, margin: "2rem 0" }}
                >
                    Thousands of data compiled into one place
                </Typography>
                <Button
                    variant="contained"
                    css={primaryButton}
                    onClick={() => scrollToDynamicView("pokedex")}
                >
                    Check PokèDex
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
