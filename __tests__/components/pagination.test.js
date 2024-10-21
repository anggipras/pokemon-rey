import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../src/components/modules/pagination";

describe("Pagination Component", () => {
    const mockOnClickHandler = jest.fn();

    const defaultProps = {
        listTheme: "#000",
        mainTheme: "#fff",
        active: 1,
        size: 5,
        step: 2,
        onClickHandler: mockOnClickHandler,
    };

    it("renders pagination numbers", () => {
        render(<Pagination {...defaultProps} />);

        // Check for pagination numbers
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });
});
