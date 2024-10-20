export interface PokemonType {
    abilities: Ability[];
    base_experience: number;
    cries: Cries;
    forms: Form[];
    game_indices: Index[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Mfe[];
    name: string;
    order: number;
    past_abilities: any[];
    past_types: any[];
    species: Species;
    sprites: Sprites;
    stats: Stat[];
    types: TypePoke[];
    weight: number;
}

export interface Ability {
    ability: Ability2;
    is_hidden: boolean;
    slot: number;
}

export interface Ability2 {
    name: string;
    url: string;
}

export interface Cries {
    latest: string;
    legacy: string;
}

export interface Form {
    name: string;
    url: string;
}

export interface Index {
    game_index: number;
    version: Version;
}

export interface Version {
    name: string;
    url: string;
}

export interface Mfe {
    move: Move;
    version_group_details: VersionGroupDetail[];
}

export interface Move {
    name: string;
    url: string;
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: MoveLearnMethod;
    version_group: VersionGroup;
}

export interface MoveLearnMethod {
    name: string;
    url: string;
}

export interface VersionGroup {
    name: string;
    url: string;
}

export interface Species {
    name: string;
    url: string;
}

export interface Sprites {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: Other;
    versions: Versions;
}

export interface Other {
    dream_world: FrontDefaultSprite;
    home: FrontDefaultSprite;
    "official-artwork": FrontDefaultSprite;
    showdown: FrontDefaultSprite;
}

export interface FrontDefaultSprite {
    front_default: string;
}

export interface Versions {
    "generation-i": GenerationI;
    "generation-ii": GenerationIi;
    "generation-iii": GenerationIii;
    "generation-iv": GenerationIv;
    "generation-v": GenerationV;
    "generation-vi": GenerationVi;
    "generation-vii": GenerationVii;
    "generation-viii": GenerationViii;
}

export interface GenerationI {
    "red-blue": RedBlue;
    yellow: Yellow;
}

export interface RedBlue {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
}

export interface Yellow {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
}

export interface GenerationIi {
    crystal: Crystal;
    gold: Gold;
    silver: Silver;
}

export interface Crystal {
    back_default: string;
    back_shiny: string;
    back_shiny_transparent: string;
    back_transparent: string;
    front_default: string;
    front_shiny: string;
    front_shiny_transparent: string;
    front_transparent: string;
}

export interface Gold {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    front_transparent: string;
}

export interface Silver {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    front_transparent: string;
}

export interface GenerationIii {
    emerald: Emerald;
    "firered-leafgreen": FireredLeafgreen;
    "ruby-sapphire": RubySapphire;
}

export interface Emerald {
    front_default: string;
    front_shiny: string;
}

export interface FireredLeafgreen {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface RubySapphire {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface GenerationIv {
    "diamond-pearl": DiamondPearl;
    "heartgold-soulsilver": HeartgoldSoulsilver;
    platinum: Platinum;
}

export interface DiamondPearl {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
}

export interface HeartgoldSoulsilver {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
}

export interface Platinum {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
}

export interface GenerationV {
    "black-white": BlackWhite;
}

export interface BlackWhite {
    animated: Animated;
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
}

export interface Animated {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
}

export interface GenerationVi {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire;
    "x-y": XY;
}

export interface OmegarubyAlphasapphire {
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
}

export interface XY {
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
}

export interface GenerationVii {
    icons: Icons;
    "ultra-sun-ultra-moon": UltraSunUltraMoon;
}

export interface Icons {
    front_default: string;
    front_female: any;
}

export interface UltraSunUltraMoon {
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
}

export interface GenerationViii {
    icons: Icons2;
}

export interface Icons2 {
    front_default: string;
    front_female: any;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: StatDetail;
}

export interface StatDetail {
    name: string;
    url: string;
}

export interface TypePoke {
    slot: number;
    type: TypeDetail;
}

export interface TypeDetail {
    name: string;
    url: string;
}

export enum PokeTypeColor {
    "#F44336",
    "#F48FB1",
    "#9C27B0",
    "#B39DDB",
    "#3F51B5",
    "#90CAF9",
    "#03A9F4",
    "#80DEEA",
    "#009688",
    "#A5D6A7",
    "#8BC34A",
    "#E6EE9C",
    "#FFEB3B",
    "#FFE082",
    "#FF9800",
    "#FFAB91",
    "#795548",
    "#EEEEEE",
    "#607D8B",
    "#00E676",
    "#FFEA00",
}
