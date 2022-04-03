import { Type } from "./type";

export interface Pokemon {
  image: string;
  number: number;
  name: string;
  types: Type[];
}

export interface Item {
  name: string;
  url: string;
}

export interface FullResponse {
  abilities: Ability[];
  base_experience: number;
  forms: unknown[];
  game_indices: GameIndice;
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encouters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: unknown[];
  species: Item[];
  sprites: Sprite;
  stats: Stat[];
  types: PokemonType[]
}

interface Ability {
  ability: Item;
  is_hidden: boolean;
  slot: number;
}

interface GameIndice {
  game_index: number;
  version: Item;
}

interface Move {
  move: Item;
  version_group_details: VersionGroupDetails;
}

interface VersionGroupDetails {
  level_learned_at: number;
  move_learn_method: Item;
  version_group: Item;
}

interface Sprite {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: Item
}

interface PokemonType {
  slot: number;
  type: Item;
}

export function getPokemonImage(pokemon?: Pokemon): string {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${leadingZero(pokemon?.number)}.png`
}

export function getPokemonNumber(pokemon?: Pokemon): string {
  return leadingZero(pokemon?.number);
}

function leadingZero(str: string | number = '', size: number = 3) {
  let s = String(str);

  while(s.length < (size || 2)) {
    s = '0' + s;
  }

  return s;
}