import { css } from "@emotion/react";
import { muiColor } from "@helpers/styles";
import { Modal, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import TypoButton from "./typo-bar";
import { EmotionBoxModal, EmotionGrid } from "@components/emotion-components";
import { PokemonType } from "src/types/pokemon";
import CardDetail from "./card-detail";

const PokeCard = ({ data, url }: { data: PokemonType; url: string }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div
                css={css`
                    padding: 3rem 1.5rem;
                    background-color: white;
                    border-radius: 1rem;
                    cursor: pointer;
                    &:hover {
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
                            rgba(0, 0, 0, 0.22) 0px 10px 10px;
                    }
                `}
                onClick={() => setOpen(true)}
            >
                <Image
                    src={data.sprites.other["official-artwork"].front_default}
                    height="0"
                    width="0"
                    sizes="100%"
                    alt="PokeDex"
                />
                <Typography
                    variant="h6"
                    css={css`
                        color: ${muiColor(500).grey};
                        font-weight: bold;
                        margin-top: 0.2rem;
                    `}
                >
                    #{data.id}
                </Typography>
                <Typography
                    variant="h3"
                    css={css`
                        color: ${muiColor(800).grey};
                        font-weight: bold;
                        margin: 1rem 0;
                        text-transform: capitalize;
                    `}
                >
                    {data.name}
                </Typography>
                <EmotionGrid gridCol={2}>
                    {data.types.map((dt) => (
                        <TypoButton key={dt.slot} data={dt.type} />
                    ))}
                </EmotionGrid>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <EmotionBoxModal>
                    <CardDetail data={data} url={url} />
                </EmotionBoxModal>
            </Modal>
        </>
    );
};

export default PokeCard;
