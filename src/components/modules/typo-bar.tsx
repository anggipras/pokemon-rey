import { Button, ButtonProps } from "@mui/material";
import { css } from "@emotion/react";
import { PokeTypeColor, TypeDetail } from "src/types/pokemon";
import { splitPokeUrl } from "@utils/custom-function";

type TypoBarType = {
    data: TypeDetail;
    typeBtn?: boolean;
} & ButtonProps;

const TypoButton = ({ data, typeBtn = false, ...props }: TypoBarType) => {
    return (
        <Button
            css={css`
                background-color: ${PokeTypeColor[splitPokeUrl(data.url)]};
                padding: 0;
                border-radius: 1rem;
                font-weight: bold;
                font-size: 1.2rem;
                color: white;
                cursor: ${typeBtn ? "pointer" : "default"};
                text-transform: capitalize;
            `}
            {...props}
        >
            {data.name}
        </Button>
    );
};

export default TypoButton;
