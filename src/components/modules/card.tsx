import { css } from "@emotion/react";
import { muiColor } from "@helpers/styles";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const PokeCard = () => {
    return (
        <div
            css={css`
                padding: 3rem 1.5rem;
                background-color: white;
                border-radius: 2rem;
                cursor: pointer;
                &:hover {
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
                        rgba(0, 0, 0, 0.22) 0px 10px 10px;
                }
            `}
        >
            <Box
                css={css`
                    border: 1px solid gray;
                `}
            >
                <Image
                    src="/imgs/pokemon_hero.png"
                    height="0"
                    width="0"
                    sizes="100%"
                    alt="PokeDex"
                />
            </Box>
            <Typography
                variant="h6"
                css={css`
                    color: ${muiColor(500).grey};
                    font-weight: bold;
                    margin-top: 0.2rem;
                `}
            >
                #001
            </Typography>
            <Typography
                variant="h3"
                css={css`
                    color: ${muiColor(800).grey};
                    font-weight: bold;
                    margin: 1rem 0;
                `}
            >
                Poke Name
            </Typography>
            <div
                css={css`
                    color: white;
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 1rem;
                `}
            >
                {[1, 2, 3, 4].map((dt) => (
                    <Typography
                        key={dt}
                        variant="h6"
                        css={css`
                            background-color: ${muiColor(500).amber};
                            padding: 0 1rem;
                            border-radius: 1rem;
                            text-align: center;
                            font-weight: bold;
                        `}
                    >
                        Type 1
                    </Typography>
                ))}
            </div>
        </div>
    );
};

export default PokeCard;
