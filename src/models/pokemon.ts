// O arquivo "pokemon.ts" define as interfaces "PokemonApiResponse" e "PokemonResumo", que são utilizadas para representar a estrutura dos dados relacionados aos pokémons. 
// A interface "PokemonApiResponse" representa a estrutura dos dados retornados pela PokeAPI ao buscar informações de um pokémon, enquanto a interface "PokemonResumo" representa um resumo das informações relevantes de um pokémon, que é utilizado para armazenar os dados no catálogo gerenciado pelo "BoxService". 
// Essas interfaces são importantes para garantir que os dados sejam manipulados corretamente e estejam no formato esperado em todo o aplicativo.
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;

  types: {
    type: {
      name: string;
    };
  }[];

  stats: {
    base_stat: number;

    stat: {
      name: string;
    };
  }[];
}
// A interface "PokemonApiResponse" é definida para representar a estrutura dos dados retornados pela PokeAPI ao buscar informações de um pokémon. 
// Ela inclui propriedades como "id", "name", "height", "weight", "types" e "stats", que correspondem às informações relevantes sobre o pokémon. 
// Essa interface é utilizada para garantir que os dados recebidos da API estejam no formato esperado e possam ser manipulados corretamente no restante do código.
export interface PokemonResumo {
  id: number;
  nome: string;
  tipos: string[];
  altura: number;
  peso: number;
  hp: number;
  ataque: number;
  defesa: number;
}