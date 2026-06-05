import {
  PokemonApiResponse,
  PokemonResumo
} from "../models/pokemon.js";

export class PokeApiService {

  async buscarPokemon(
    nomeOuId: string
  ): Promise<PokemonResumo | null> {

    try {

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`
      );

      if (!response.ok) {

        console.log(
          `[ERRO] Pokémon não encontrado: ${nomeOuId}`
        );

        return null;
      }

      const dados: PokemonApiResponse =
        await response.json();

      const hp =
        dados.stats.find(
          stat => stat.stat.name === "hp"
        )?.base_stat ?? 0;

      const ataque =
        dados.stats.find(
          stat => stat.stat.name === "attack"
        )?.base_stat ?? 0;

      const defesa =
        dados.stats.find(
          stat => stat.stat.name === "defense"
        )?.base_stat ?? 0;

      return {
        id: dados.id,
        nome: dados.name,
        altura: dados.height,
        peso: dados.weight,

        tipos: dados.types.map(
          item => item.type.name
        ),

        hp,
        ataque,
        defesa
      };

    } catch {

      console.log(
        "[ERRO] Falha ao acessar a PokeAPI."
      );

      return null;
    }
  }
}