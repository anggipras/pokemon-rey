export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const ROUTES_PATH = {
    home: "/",
    pokemon_type: (dt: string) => `/pokemon/type/${dt}`,
    pokemon_detail: (dt: string) => `/pokemon/detail/${dt}`,
};
