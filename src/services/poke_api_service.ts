// O código define uma classe "PokeApiService" que é responsável por buscar informações sobre os pokémons utilizando a PokeAPI.
// A classe possui um método assíncrono "buscarPokemon" que recebe um nome ou ID de pokémon como argumento e retorna um resumo das informações do pokémon ou null caso o pokémon não seja encontrado ou ocorra um erro ao acessar a API.
import {
  PokemonApiResponse,
  PokemonResumo
} from "../models/pokemon.js";

// A classe "PokeApiService" é exportada para que possa ser utilizada em outras partes do aplicativo, como no controlador do terminal para buscar informações sobre os pokémons.
export class PokeApiService {

  // O método "buscarPokemon" é definido como assíncrono e retorna uma Promise que resolve para um objeto do tipo "PokemonResumo" ou null. 
  // Ele utiliza a função "fetch" para fazer uma requisição à PokeAPI, passando o NOME ou ID do pokémon na URL da requisição.
  async buscarPokemon(
    nomeOuId: string
  ): Promise<PokemonResumo | null> {

    try {

      // O código faz uma requisição à PokeAPI utilizando a função "fetch" e aguarda a resposta.
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`
      );

      // O código verifica se a resposta da requisição foi bem-sucedida (status HTTP 200). 
      // Se a resposta não for bem-sucedida, é exibida uma mensagem de erro no console indicando que o pokémon não foi encontrado, e o método retorna null.
      if (!response.ok) {

        console.log(
          `[ERRO] Pokémon não encontrado: ${nomeOuId}`
        );

        return null;
      }

      // O código converte a resposta da requisição em um objeto JSON do tipo "PokemonApiResponse".
      const dados: PokemonApiResponse =
        await response.json();

      // O código extrai os valores de HP, ataque e defesa do pokémon a partir do objeto JSON.
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

      // O código retorna um objeto do tipo "PokemonResumo" contendo as informações do pokémon.
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