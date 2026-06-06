// O código é o ponto de entrada principal de um aplicativo TypeScript que gerencia um catálogo de pokémons. 
// Ele importa três classes: "TerminalController", "BoxService" e "PokeApiService". A função "main" é definida como assíncrona e é responsável por criar instâncias dessas classes e executar o controlador do terminal. O controlador do terminal é responsável por interagir com o usuário e gerenciar as operações relacionadas aos pokémons, utilizando os serviços fornecidos pelas outras duas classes. Por fim, a função "main" é chamada para iniciar a execução do aplicativo.
import { TerminalController } from "./controllers/terminal_controller.js";

// O código importa as classes "BoxService" e "PokeApiService" dos arquivos correspondentes na pasta "services". 
// Essas classes são responsáveis por gerenciar o catálogo de pokémons e buscar informações sobre os pokémons, respectivamente.
import { BoxService } from "./services/box_service.js";

// O código importa a classe "PokeApiService" do arquivo correspondente na pasta "services". 
// Essa classe é responsável por buscar informações sobre os pokémons, provavelmente fazendo requisições a uma API externa.
import { PokeApiService } from "./services/poke_api_service.js";

// A função "main" é definida como assíncrona e é responsável por criar instâncias das classes "PokeApiService", "BoxService" e "TerminalController". 
// Ela também chama o método "executar" do controlador do terminal para iniciar a interação com o usuário.
async function main(): Promise<void> {

  // O código cria uma instância da classe "PokeApiService" e a armazena na variável "pokeApiService". 
  // Essa instância será usada para buscar informações sobre os pokémons.
  const pokeApiService =
    new PokeApiService();

  // O código cria uma instância da classe "BoxService" e a armazena na variável "boxService". 
  // Essa instância será usada para gerenciar o catálogo de pokémons. O caminho para o arquivo JSON onde os dados dos pokémons serão armazenados é passado como argumento para o construtor da classe.
  const boxService =
    new BoxService(
      "./pc_box.json"
    );

    // O código cria uma instância da classe "TerminalController" e a armazena na variável "controller". 
    // O controlador do terminal é criado passando as instâncias de "PokeApiService" e "BoxService" como argumentos para o construtor da classe. 
    // Isso permite que o controlador do terminal utilize os serviços fornecidos por essas classes para interagir com o usuário e gerenciar as operações relacionadas aos pokémons.
  const controller =
    new TerminalController(
      pokeApiService,
      boxService
    );

    // O código chama o método "executar" do controlador do terminal, que é responsável por iniciar a interação com o usuário e gerenciar as operações relacionadas aos pokémons.
  await controller.executar();
}

// A função "main" é chamada para iniciar a execução do aplicativo.
main();