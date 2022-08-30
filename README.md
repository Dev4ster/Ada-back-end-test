# Teste prático back-end - Ada

Olá este arquivo vai conter algumas instruções do projeto do lado do back-end.

## Rodar o projeto na raiz

Para iniciar o projeto basta clonar e rodar o docker compose na raiz `docker-compose up -d`.

é necessário existir um .env na raiz do projeto, com essas variáveis:

```
LOGIN=""
PASSWORD=""
TOKEN_SECRET=""
```

Comando para subir o projeto, tanto front quanto back:

```json
docker-compose up -d
```

## Rodar projeto apenas back-end

```json
cd BACK && docker-compose up -d
```

## Ferramentas necessárias

- node.js 14.x
- yarn 1.22.x
- docker & docker-compose any version

## Acesso
- O front end pode ser acessado no localhost:3000
- o back end pode ser acessado na localhost:5000

## Scripts

- `yarn prepare` usado pelo husky para provisionar seus arquivos sh.
- `yarn build` apaga a pasta ./dist e gera um novo build usando o babel.
- `yarn start` inicia o projeto já ‘buildado’ ( é necessário ‘buildar’ antes de rodar esse comando ).
- `yarn start:debug` inicia uma inspeção na pasta dist afim de debugar utilizando o inspetor do vscode no modo attach.
- `yarn dev` inicia o projeto em modo dev usando nodemon ( isso pode tornar um pouco lento, mas foi o melhor que pude ).
- `yarn dev:container` gera um build do projeto & instancia um container do docker contendo a aplicação.
- `yarn dev:container:stop` para o container iniciado pelo comando anterior.
- `yarn test` roda todos os testes.
- `yarn test:unit` roda todos os testes unitários ( .spec ).
- `yarn test:integration` roda todos os testes de integrações ( .test ).
- `yarn test:staged` roda todos os testes que estão na staged area do git.
- `yarn test:coverage` roda todos os testes porém coleta a cobertura.
