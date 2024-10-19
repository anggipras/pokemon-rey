export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ROUTES_PATH = {
    home: "/",
    pokemon_list: "/pokemon/type",
    pokemon_detail: (dt: string) => `/pokemon/${dt}`,
};
