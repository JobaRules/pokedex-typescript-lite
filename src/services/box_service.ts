// O código define uma classe chamada "BoxService" que é responsável por gerenciar um catálogo de pokémons armazenados em um arquivo JSON.
import { readFile, writeFile } from "fs/promises";

// A classe "BoxService" possui um construtor que recebe o caminho do arquivo JSON onde os dados dos pokémons serão armazenados e lidos. 
// O caminho é armazenado como uma propriedade privada da classe.
import { PokemonResumo } from "../models/pokemon.js";


// A classe "BoxService" é exportada para que possa ser utilizada em outras partes do aplicativo, como no controlador do terminal para gerenciar o catálogo de pokémons.
export class BoxService {
    //   Construtor que recebe o caminho do arquivo JSON onde os dados dos pokémons serão armazenados e lidos. 
    // O caminho é armazenado como uma propriedade privada da classe.
    constructor(
        //    O parâmetro "path" é do tipo string e representa o caminho para o arquivo JSON que contém os dados dos pokémons.
        private readonly path: string
    ) { }

    //   O método "listar" é assíncrono e retorna uma Promise que resolve para um array de objetos do tipo "PokemonResumo".
    async listar(): Promise<PokemonResumo[]> {

        // O método lê o conteúdo do arquivo JSON usando a função "readFile" do módulo "fs/promises". 
        // O conteúdo é lido como uma string usando a codificação "utf-8".
        const data = await readFile(
            this.path,
            "utf-8"
        );

        // O método converte a string JSON em um array de objetos do tipo "PokemonResumo" usando "JSON.parse".
        return JSON.parse(data);
    }

    // O método "adicionar" é assíncrono e recebe um objeto do tipo "PokemonResumo" como parâmetro. 
    // Ele retorna uma Promise que resolve para void (sem valor de retorno).
    async adicionar(pokemon: PokemonResumo): Promise<void> {

        // O método chama o método "listar" para obter a lista atual de pokémons do arquivo JSON.
        const pokemons =
            await this.listar();

        // O método verifica se o pokémon a ser adicionado já existe na lista usando o método "some" do array.
        const existe =
            pokemons.some(
                p => p.id === pokemon.id
            );

        // Se o pokémon já existe, o método exibe um aviso no console e retorna sem adicionar o pokémon novamente.
        if (existe) {

            console.log(
                `[AVISO] ${pokemon.nome} já está no catálogo.`
            );

            // O método retorna sem adicionar o pokémon, evitando duplicatas na lista.
            return;
        }

        // O método adiciona o novo pokémon à lista.
        pokemons.push(pokemon);

        //   O método escreve a lista atualizada de pokémons de volta no arquivo JSON usando a função "writeFile" do módulo "fs/promises".
        await writeFile(
            this.path,
            JSON.stringify(
                pokemons,
                null,
                2
            )
        );

        console.log(
            `[OK] ${pokemon.nome} adicionado ao catálogo.`
        );
    }

    // O método "remover" é assíncrono e recebe um número (id) como parâmetro, representando o ID do pokémon a ser removido. 
    // Ele retorna uma Promise que resolve para void (sem valor de retorno).
    async remover(
        id: number
    ): Promise<void> {

        // O método chama o método "listar" para obter a lista atual de pokémons do arquivo JSON.
        const pokemons =
            await this.listar();

        // O método verifica se o pokémon a ser removido existe na lista usando o método "some" do array.
        const existe =
            pokemons.some(
                p => p.id === id
            );

        // Se o pokémon não existe, o método exibe um aviso no console e retorna sem tentar remover o pokémon.
        if (!existe) {

            console.log(
                "[AVISO] Pokémon não encontrado."
            );

            // O método retorna sem tentar remover o pokémon, pois ele não existe na lista.
            return;
        }

        // O método cria um novo array "atualizados" contendo todos os pokémons, exceto o que será removido.
        const atualizados =
            pokemons.filter(
                p => p.id !== id
            );

        // O método escreve a lista atualizada de pokémons de volta no arquivo JSON usando a função "writeFile" do módulo "fs/promises".
        await writeFile(
            this.path,
            JSON.stringify(
                atualizados,
                null,
                2
            )
        );

        console.log(
            "[OK] Pokémon removido."
        );
    }

}