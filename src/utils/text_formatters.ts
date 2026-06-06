// O arquivo "text_formatters.ts" define a função "formatPokemon", que é responsável por formatar as informações de um pokémon em uma string legível. 
// A função recebe um objeto do tipo "PokemonResumo" como parâmetro e retorna uma string formatada contendo as informações do pokémon, como ID, nome, tipos, altura, peso, HP, ataque e defesa. 
// Essa função é utilizada para exibir as informações dos pokémons de forma organizada e fácil de ler no console, especialmente ao listar o catálogo de pokémons gerenciado pelo "BoxService".
import { PokemonResumo } from "../models/pokemon.js";

// A função "formatPokemon" é exportada para que possa ser utilizada em outras partes do aplicativo, como no controlador do terminal para formatar as informações dos pokémons antes de exibi-las no console.
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