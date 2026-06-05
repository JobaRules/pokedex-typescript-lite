import { BoxService } from "../services/box_service.js";
import { PokeApiService } from "../services/poke_api_service.js";
import { formatPokemon } from "../utils/text_formatters.js";

export class TerminalController {

  constructor(
    private readonly pokeApiService: PokeApiService,
    private readonly boxService: BoxService
  ) {}

  async executar(): Promise<void> {

    console.log("\n=== INICIANDO POKEDEX ===\n");

    // Buscar Pikachu
    const pikachu =
      await this.pokeApiService.buscarPokemon(
        "pikachu"
      );

    if (pikachu) {
      await this.boxService.adicionar(
        pikachu
      );
    }

    // Buscar Charmander
    const charmander =
      await this.pokeApiService.buscarPokemon(
        "charmander"
      );

    if (charmander) {
      await this.boxService.adicionar(
        charmander
      );
    }

    // Testar duplicidade
    const duplicado =
      await this.pokeApiService.buscarPokemon(
        "pikachu"
      );

    if (duplicado) {
      await this.boxService.adicionar(
        duplicado
      );
    }

    // Testar erro 404
    await this.pokeApiService.buscarPokemon(
      "pokemon-inexistente"
    );

    // Listar catálogo
    const catalogo =
      await this.boxService.listar();

    console.log("\n=== CATÁLOGO ===\n");

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