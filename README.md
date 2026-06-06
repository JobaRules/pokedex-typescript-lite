# Pokedex TypeScript Lite

Projeto desenvolvido em **Node.js + TypeScript** com arquitetura em camadas para consulta de Pokémon através da **PokeAPI** e armazenamento local em arquivo JSON.

---

# Objetivo

Desenvolver uma aplicação Back-End capaz de:

* Buscar Pokémon por nome ou ID.
* Consumir dados da PokeAPI.
* Armazenar Pokémon localmente.
* Evitar registros duplicados.
* Remover Pokémon cadastrados.
* Listar Pokémon armazenados.
* Persistir dados em arquivo JSON.

---

# Tecnologias Utilizadas

* Node.js
* TypeScript
* Docker
* Git
* GitHub
* GitHub CLI
* GitFlow
* Fetch API
* JSON
* Visual Studio Code

---

# Pré-requisitos

## Docker

A instalação do Node.js será realizada através de um contêiner Docker.

Documentação oficial:

https://docker.com/get-started/

### Baixar imagem Node.js

```bash
docker pull node:24-alpine
```

### Criar contêiner e abrir terminal

```bash
docker run -it --rm --entrypoint sh node:24-alpine
```

### Verificar versão Node.js

```bash
node -v
```

Saída esperada:

```text
v24.16.0
```

### Verificar versão npm

```bash
npm -v
```

Saída esperada:

```text
11.13.0
```

---

# GitHub CLI

Site oficial:

https://cli.github.com

### Autenticação

```bash
gh auth login
```

---

# Criando o Repositório GitHub

```bash
gh repo create pokedex-typescript-lite \
  --public \
  --add-readme \
  --gitignore Node
```

## Parâmetros

| Parâmetro        | Descrição                        |
| ---------------- | -------------------------------- |
| --public         | Repositório público              |
| --add-readme     | Cria README inicial              |
| --gitignore Node | Adiciona .gitignore para Node.js |

---

# Clonando o Projeto

```bash
git init
```

```bash
git clone https://github.com/JobaRules/pokedex-typescript-lite.git
```

```bash
cd pokedex-typescript-lite
```

Abrir projeto:

```bash
code .
```

---

# Inicializando Projeto TypeScript

### Criar package.json

```bash
npm init -y
```

### Instalar dependências

```bash
npm install -D typescript ts-node @types/node
```

### Gerar tsconfig.json

```bash
npx tsc --init
```

---

# Estrutura do Projeto

```text
pokedex-typescript-lite/
│
├── src/
│   │
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── main.ts
│
├── pc_box.json
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

# Criando Estrutura de Pastas

```bash
mkdir src
mkdir src/controllers
mkdir src/services
mkdir src/models
mkdir src/utils
```

ou

```bash
mkdir src && \
mkdir src/controllers && \
mkdir src/services && \
mkdir src/models && \
mkdir src/utils
```

Criar arquivo de persistência:

```bash
touch pc_box.json
```

Conteúdo inicial:

```json
[]
```

---

# Conceitos Aplicados

* Programação Orientada a Objetos
* Interfaces
* Classes
* Injeção de Dependência
* Arquitetura em Camadas
* Persistência Local
* Tratamento de Erros
* Async/Await
* Consumo de API REST
* Serialização JSON

---

# Métodos de Array Utilizados

| Método  | Utilização                   |
| ------- | ---------------------------- |
| map     | Extrair tipos do Pokémon     |
| find    | Buscar atributos específicos |
| some    | Verificar duplicidade        |
| filter  | Remover Pokémon              |
| forEach | Listar catálogo              |

---

# GitFlow

## Branches

```text
  main
  evelop
  docs/readme
  feat/box-service
  feat/controller
  feat/pokeapi-service
  feat/pokmon-model
  feat/utils
```

---

## Criar Branch Develop

```bash
git checkout -b develop
```

Enviar para remoto:

```bash
git push -u origin develop
```

---

## Fluxo Principal

```text
main
 ↑
develop
 ↑
feature/*
```

---

# Fluxo de Trabalho

## Atualizar Develop

```bash
git checkout develop
```

```bash
git pull
```

---

## Criar Nova Funcionalidade

```bash
git checkout -b feat/pokemon-model
```

---

## Após Finalizar

Adicionar arquivos:

```bash
git add .
```

Commit semântico:

```bash
git commit -m "feat: cria interfaces pokemon"
```

Enviar branch:

```bash
git push origin feat/pokemon-model
```

---

## Pull Request

```text
feat/pokemon-model
        ↓
     develop
```

---

# Commits Semânticos

## Exemplos

```bash
feat: adiciona modelo pokemon
```

```bash
fix: corrige busca por id
```

```bash
docs: atualiza README
```

```bash
refactor: reorganiza serviços
```

```bash
test: adiciona testes do box service
```

---

# Configuração Git

## Global

```bash
git config --global user.name "Seu Nome"
```

```bash
git config --global user.email "seu-email@exemplo.com"
```

## Local

```bash
git config user.name "Seu Nome"
```

```bash
git config user.email "seu-email@exemplo.com"
```

---

# Kanban GitHub

Criar:

```text
GitHub
 └── Projects
      └── New Project
            └── Board
```

Nome:

```text
Pokedex TypeScript Lite
```

---

## Colunas

* BACKLOG
* A FAZER
* EM ANDAMENTO
* CONCLUÍDO

---

## Cards

### BACKLOG

* Criar repositório GitHub
* Configurar TypeScript
* Criar package.json
* Criar tsconfig.json
* Criar interfaces Pokemon
* Criar serviço PokeAPI
* Implementar fetch
* Tratar erro 404
* Criar BoxService
* Criar persistência JSON
* Criar Controller
* Implementar listar catálogo
* Implementar remoção
* Implementar duplicidade
* Criar README
* Adicionar exemplos
* Criar GitFlow
* Revisão final

---

# Executando Projeto

Instalar dependências:

```bash
npm install
```

Executar aplicação:

```bash
npm run dev
```

Build:

```bash
npm run build
```

---

# Executando com Docker

## Rodar contêiner

```bash
docker compose up -d --build && docker compose logs -f
```

## Executar

```bash
docker run --rm pokedex-typescript-lite
```

---

# Ferramentas de Apoio

Durante o desenvolvimento deste projeto foi utilizada a extensão GitHub Copilot Chat do Visual Studio Code como ferramenta de apoio para pesquisa, esclarecimento de dúvidas e revisão de código.

Todo o código foi analisado, compreendido, adaptado e validado pelo autor do projeto para fins acadêmicos.

---

# Autor

Desenvolvido para fins de estudo utilizando Node.js, TypeScript, Docker, GitHub e GitFlow.
