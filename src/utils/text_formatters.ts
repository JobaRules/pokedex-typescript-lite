import { PokemonResumo } from "../models/pokemon.js";

export function formatPokemon(
  pokemon: PokemonResumo
): string {

  return `
#${pokemon.id}
Nome: ${pokemon.nome}
Tipos: ${pokemon.tipos.join(", ")}
Altura: ${pokemon.altura}
Peso: ${pokemon.peso}
HP: ${pokemon.hp}
Ataque: ${pokemon.ataque}
Defesa: ${pokemon.defesa}
`;
}