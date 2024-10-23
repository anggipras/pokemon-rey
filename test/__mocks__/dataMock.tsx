export const mockPokemonList = [
    {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
        detail: {
            id: 1,
            name: "bulbasaur",
            abilities: [
                {
                    ability: {
                        name: "overgrow",
                        url: "https://pokeapi.co/api/v2/ability/65/",
                    },
                    is_hidden: false,
                    slot: 1,
                },
                {
                    ability: {
                        name: "chlorophyll",
                        url: "https://pokeapi.co/api/v2/ability/34/",
                    },
                    is_hidden: true,
                    slot: 3,
                },
            ],
            types: [
                {
                    slot: 1,
                    type: {
                        name: "grass",
                        url: "https://pokeapi.co/api/v2/type/12/",
                    },
                },
                {
                    slot: 2,
                    type: {
                        name: "poison",
                        url: "https://pokeapi.co/api/v2/type/4/",
                    },
                },
            ],
            sprites: {
                back_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
                back_female: null,
                back_shiny:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
                back_shiny_female: null,
                front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                front_female: null,
                front_shiny:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
                front_shiny_female: null,
                other: {
                    dream_world: {
                        front_default:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
                        front_female: null,
                    },
                    home: {
                        front_default:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
                        front_female: null,
                        front_shiny:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png",
                        front_shiny_female: null,
                    },
                    "official-artwork": {
                        front_default:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
                        front_shiny:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
                    },
                    showdown: {
                        back_default:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/1.gif",
                        back_female: null,
                        back_shiny:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/shiny/1.gif",
                        back_shiny_female: null,
                        front_default:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/1.gif",
                        front_female: null,
                        front_shiny:
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/1.gif",
                        front_shiny_female: null,
                    },
                },
            },
        },
    },
];

export const mockPokemonType = {
    name: "Pikachu",
    weight: 6,
    height: 0.4,
    abilities: [
        {
            ability: {
                name: "static",
                url: "https://pokeapi.co/api/v2/ability/9/",
            },
            is_hidden: false,
            slot: 1,
        },
        {
            ability: {
                name: "lightning-rod",
                url: "https://pokeapi.co/api/v2/ability/31/",
            },
            is_hidden: true,
            slot: 3,
        },
    ],
    types: [
        {
            slot: 1,
            type: {
                name: "electric",
                url: "https://pokeapi.co/api/v2/type/13/",
            },
        },
    ],
    sprites: {
        back_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
        back_female:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png",
        back_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
        back_shiny_female:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png",
        front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        front_female:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png",
        front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
        front_shiny_female:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png",
        other: {
            dream_world: {
                front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
            },
            home: {
                front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
            },
            "official-artwork": {
                front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
            },
            showdown: {
                front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif",
            },
        },
    },
};
