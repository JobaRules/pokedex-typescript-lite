import { BoxService } from "./services/box_service.js";
import { PokeApiService } from "./services/poke_api_service.js";

async function main(): Promise<void> {

  const pokeApiService =
    new PokeApiService();

  const boxService =
    new BoxService(
      "./pc_box.json"
    );

}

main();