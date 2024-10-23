import { useState } from "react";

interface UsePaginationProps {
    itemsPerPage: number;
}

const usePagination = ({ itemsPerPage }: UsePaginationProps) => {
    const [activePage, setActivePage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(itemsPerPage);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const resetPerPage = () => {
        setAnchorEl(null);
        setActivePage(1);
    };

    return {
        anchorEl,
        activePage,
        setAnchorEl,
        setActivePage,
        resetPerPage,
        perPage,
        setPerPage,
    };
};

export default usePagination;
