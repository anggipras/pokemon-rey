import { scrollToDynamicView } from "../../../src/utils/browser-behaviour";

describe("scrollToDynamicView", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should call scrollIntoView when element is found", () => {
        const mockElement = {
            scrollIntoView: jest.fn(),
        };
        document.getElementById = jest.fn().mockReturnValue(mockElement);
        scrollToDynamicView("poke-type");
        expect(document.getElementById).toHaveBeenCalledWith("poke-type");
        expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
            behavior: "smooth",
        });
    });

    it("should not call scrollIntoView when element is not found", () => {
        document.getElementById = jest.fn().mockReturnValue(null);
        scrollToDynamicView("poke-type");
        expect(document.getElementById).toHaveBeenCalledWith("poke-type");
        expect(document.getElementById("poke-type")).toBeNull();
    });
});
