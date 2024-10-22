import { render, screen } from "@testing-library/react";
import React from "react";
import HeroBg from "../../../src/components/modules/hero-bg";
import useTranslation from "next-translate/useTranslation";
import { muiColor } from "../../../src/helpers/styles";

jest.mock("next-translate/useTranslation");
const mockUseTranslation = useTranslation as jest.Mock;

describe("HeroBg component", () => {
    beforeEach(() => {
        // Mock the return value for useTranslation
        mockUseTranslation.mockReturnValue({
            t: (key: string) => {
                switch (key) {
                    case "home:hero.btn":
                        return "Hero Button";
                    case "home:hero.title":
                        return "Hero Title";
                    case "home:hero.desc":
                        return "Hero Desc";
                    default:
                        return key;
                }
            },
        });
    });

    it("renders the button with correct translation", () => {
        render(<HeroBg />);
        const button = screen.getByRole("button", { name: /Hero Button/i });
        expect(button).toBeInTheDocument();
    });

    it("renders the correct title with expected styles", () => {
        render(<HeroBg />);
        const titleElement = screen.getByTestId("hero-title");
        expect(titleElement).toHaveTextContent("Hero Title");
        const expectedColor = muiColor(800).grey;
        expect(titleElement).toHaveStyle(`color: ${expectedColor}`);
        expect(titleElement).toHaveStyle("font-weight: 700");
    });

    it("renders the correct description with expected styles", () => {
        render(<HeroBg />);
        const titleElement = screen.getByTestId("hero-desc");
        expect(titleElement).toHaveTextContent("Hero Desc");
        const expectedMargin = "2rem 0";
        expect(titleElement).toHaveStyle(`margin: ${expectedMargin}`);
    });
});
