import { Typography } from "@mui/material";
import { css } from "@emotion/react";
import { muiColor } from "@helpers/styles";
import { PokeTypeColor, TypeDetail } from "src/types/pokemon";
import { splitPokeUrl } from "@utils/custom-function";

const TypoBar = ({ data }: { data: TypeDetail }) => {
    return (
        <Typography
            variant="h6"
            css={css`
                background-color: ${PokeTypeColor[splitPokeUrl(data.url)]};
                padding: 0 1rem;
                border-radius: 1rem;
                text-align: center;
                font-weight: bold;
                text-transform: capitalize;
            `}
        >
            {data.name}
        </Typography>
    );
};

export default TypoBar;
