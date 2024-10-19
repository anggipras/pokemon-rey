//Notes: if someday u need to add another icon for floating banner
import { ArrowForward, KeyboardArrowDown, Language } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

interface MuiIconProps {
    ArrowForward: React.FC<SvgIconProps>;
    KeyboardArrowDown: React.FC<SvgIconProps>;
    Language: React.FC<SvgIconProps>;
}

const Icon: MuiIconProps = {
    ArrowForward,
    KeyboardArrowDown,
    Language,
};

export default Icon;
