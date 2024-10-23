import "@testing-library/jest-dom";
import React from "react";
import { GetStaticPropsResult } from "next";
import { render, screen } from "@testing-library/react";
import Index, { getStaticProps } from "../../../pages/index";
import { mockPokemonList } from "../../__mocks__/dataMock";

describe("Home Page", () => {
    it("renders the home page correctly", async () => {
        render(
            <Index
                countedPokemons={77}
                initialPokemons={mockPokemonList}
                initialOffset={0}
            />,
        );

        // Check if the title is rendered
        expect(screen.getByText("PokèDex")).toBeInTheDocument();
        expect(screen.getByText(/77 Pokemon/)).toBeInTheDocument(); // Counted Pokémon

        // Check if the correct name of Pokémon card is rendered
        expect(screen.getByTestId("poke-card-1")).toHaveTextContent(
            "bulbasaur",
        );
    });

    it("renders with mocked getStaticProps from home page", async () => {
        const response = await getStaticProps({});
        const dataProps = response as { props: { [key: string]: any } };
        expect(response).toEqual({
            props: {
                countedPokemons: dataProps.props.countedPokemons,
                initialPokemons: dataProps.props.initialPokemons,
                initialOffset: dataProps.props.initialOffset,
            },
            revalidate: 3600,
        });
    });
});
