//Notes: if someday u need to add another icon for floating banner
import {
    ArrowForward,
    KeyboardArrowLeft,
    KeyboardDoubleArrowLeft,
    KeyboardArrowRight,
    KeyboardDoubleArrowRight,
    KeyboardArrowDown,
    Language,
} from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

interface MuiIconProps {
    ArrowForward: React.FC<SvgIconProps>;
    KeyboardArrowLeft: React.FC<SvgIconProps>;
    KeyboardDoubleArrowLeft: React.FC<SvgIconProps>;
    KeyboardArrowRight: React.FC<SvgIconProps>;
    KeyboardDoubleArrowRight: React.FC<SvgIconProps>;
    KeyboardArrowDown: React.FC<SvgIconProps>;
    Language: React.FC<SvgIconProps>;
}

const Icon: MuiIconProps = {
    ArrowForward,
    KeyboardArrowLeft,
    KeyboardDoubleArrowLeft,
    KeyboardArrowRight,
    KeyboardDoubleArrowRight,
    KeyboardArrowDown,
    Language,
};

export default Icon;
