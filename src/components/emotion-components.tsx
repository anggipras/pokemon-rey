import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { muiColor } from "@helpers/styles";

// Components
type EmotionGridType = {
    gridCol: number;
};

export const EmotionBoxModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    background-color: white;
    padding: 3rem;
    border-radius: 1rem;
`;

const dynamicGrid = ({ gridCol }: EmotionGridType) =>
    css`
        color: white;
        display: grid;
        grid-template-columns: repeat(${gridCol}, minmax(0, 1fr));
        gap: 1rem;
        width: 100%;
    `;

export const EmotionGrid = styled.div`
    ${dynamicGrid};
`;

export const EmotionTable = styled.div`
    display: table;
    width: 100%;
`;

export const EmotionTableRow = styled.div`
    display: table-row;
`;

export const EmotionTableCell = styled.div`
    display: table-cell;
`;

// Styles
export const primaryButton = css`
    background-color: ${muiColor(600).amber};
    box-shadow: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1.5rem;
    font-weight: bold;
    text-transform: none;
`;
