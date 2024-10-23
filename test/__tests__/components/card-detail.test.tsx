import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import CardDetail from "../../../src/components/modules/card-detail";
import { PokemonType } from "../../../src/types/pokemon";
import { mockPokemonType } from "../../__mocks__/dataMock";

// Mocking useRouter
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe("CardDetail Component", () => {
    beforeEach(() => {
        mockUseRouter.mockReturnValue({
            replace: jest.fn(),
        });
    });

    it("renders correctly with given data", () => {
        render(<CardDetail data={mockPokemonType} />);

        expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/0.4/i)).toBeInTheDocument(); // Height
        expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument(); // Hidden Ability
        expect(screen.getByText(/electric/i)).toBeInTheDocument(); // Type
    });

    it("navigates to the type route when type button is clicked", () => {
        render(<CardDetail data={mockPokemonType} typeBtn={true} />);

        const typeButton = screen.getByText(/electric/i);
        fireEvent.click(typeButton);

        expect(mockUseRouter().replace).toHaveBeenCalledWith(
            "/pokemon/type/electric",
        );
    });

    it("renders button if url is provided", () => {
        render(
            <CardDetail
                data={mockPokemonType}
                url="https://pokeapi.co/api/v2/pokemon/25"
            />,
        );

        const button = screen.getByTestId("card-detail-btn");
        
        expect(button).toBeInTheDocument();
    });

    it("navigates when url is provided", () => {
        render(
            <CardDetail
                data={mockPokemonType}
                url="https://pokeapi.co/api/v2/pokemon/25"
            />,
        );

        const button = screen.getByTestId("card-detail-btn");
        fireEvent.click(button);

        expect(mockUseRouter().replace).toHaveBeenCalledWith(
            "/pokemon/detail/25",
        );
    });
});
