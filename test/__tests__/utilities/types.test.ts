import { dataFilter } from "../../../src/types/data-filter";

describe("Should run all types", () => {
    it("returns an object with only the specified keys for data-filter", () => {
        const input = { a: 1, b: 2, c: 3 };
        const keys: (keyof typeof input)[] = ["a", "c"];
        const result = dataFilter(input, keys);
        expect(result).toEqual({ a: 1, c: 3 });
    });
});
