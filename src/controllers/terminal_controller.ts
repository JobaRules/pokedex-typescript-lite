// O código define uma classe chamada "TerminalController" que é responsável por controlar a execução do terminal da aplicação. 
// A classe possui um construtor que recebe duas dependências: "PokeApiService" e "BoxService". 
// O método "executar" é assíncrono e é responsável por realizar uma série de operações relacionadas aos pokémons, como buscar informações, adicionar ao catálogo, listar o catálogo e remover pokémons. 
// O método utiliza os serviços fornecidos pelas dependências para realizar essas operações e exibe os resultados no console.
import { BoxService } from "../services/box_service.js";
import { PokeApiService } from "../services/poke_api_service.js";
import { formatPokemon } from "../utils/text_formatters.js";

// A classe "TerminalController" é exportada para que possa ser utilizada em outras partes do aplicativo, como no arquivo principal "main.ts" para iniciar a execução do terminal.
export class TerminalController {

  // O construtor da classe "TerminalController" recebe duas dependências: "PokeApiService" e "BoxService". 
  // Essas dependências são injetadas na classe para que possam ser utilizadas em seus métodos. 
  // O construtor armazena essas dependências como propriedades privadas da classe, permitindo que sejam acessadas e utilizadas em outros métodos da classe.
  constructor(
    private readonly pokeApiService: PokeApiService,
    private readonly boxService: BoxService
  ) {}

  // O método "executar" é definido como assíncrono e retorna uma Promise que resolve para void (sem valor de retorno). 
  // Ele é responsável por realizar uma série de operações relacionadas aos pokémons, como buscar informações, adicionar ao catálogo, listar o catálogo e remover pokémons. 
  // O método utiliza os serviços fornecidos pelas dependências para realizar essas operações e exibe os resultados no console.
  async executar(): Promise<void> {

    console.log("\n\n=== INICIANDO POKEDEX ===\n");

    // Buscar Pikachu NOME ou ID e adicionar ao catálogo
    const pikachu =
      await this.pokeApiService.buscarPokemon(
        "pikachu"
      );

    if (pikachu) {
      await this.boxService.adicionar(
        pikachu
      );
    }

    // Buscar Charmander NOME ou ID e adicionar ao catálogo
    const charmander =
      await this.pokeApiService.buscarPokemon(
        "charmander"
      );

    if (charmander) {
      await this.boxService.adicionar(
        charmander
      );
    }

    // Testar duplicidade NOME ou ID
    const duplicado =
      await this.pokeApiService.buscarPokemon(
        "pikachu"
      );

    if (duplicado) {
      await this.boxService.adicionar(
        duplicado
      );
    }

    // Testar erro 404 NOME ou ID
    await this.pokeApiService.buscarPokemon(
      "pokemon-inexistente"
    );

    // Listar catálogo
    const catalogo =
      await this.boxService.listar();

    console.log("\n=== CATÁLOGO ===\n");

    // O código utiliza o método "forEach" do array para iterar sobre cada pokémon presente no catálogo e exibir suas informações formatadas no console.
    catalogo.forEach(
      pokemon => {
        console.log(
          formatPokemon(pokemon)
        );
      }
    );

    // Remover Pikachu (ID 25)
    await this.boxService.remover(25);

    // Listar novamente
    const atualizado =
      await this.boxService.listar();

    console.log(
      "\n=== CATÁLOGO ATUALIZADO ===\n"
    );

    atualizado.forEach(
      pokemon => {
        console.log(
          formatPokemon(pokemon)
        );
      }
    );
  }
}