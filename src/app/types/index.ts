export interface questionInterface {
  id: number;
  imgSrc: string;
  options: string[];
}

export interface verifyPokemonResponseInterface {
  name: string;
  imgSrc: string;
  isPokemonAMatch: boolean;
}
