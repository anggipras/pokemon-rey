import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pagination from "../../../src/components/modules/pagination";

describe("Pagination Component", () => {
    const mockOnClickHandler = jest.fn();

    const defaultProps = {
        listTheme: "#000",
        mainTheme: "#fff",
        active: 1,
        size: 100,
        step: 2,
        onClickHandler: mockOnClickHandler,
    };

    it("renders pagination numbers", () => {
        render(<Pagination {...defaultProps} />);

        // Check if the pagination first numbers are visible (before paginate)
        ["3", "4", "5"].forEach((v) => {
            expect(
                screen.getByTestId(`pagination-ctn-num-${v}`),
            ).toHaveTextContent(v);
        });
    });
});
