# NestJS MySQL TypeORM Boilerplate

Este é um boilerplate para aplicativos Node.js criados com o NestJS framework, usando o MySQL como banco de dados e TypeORM como ORM e implementação de autenticação e nível de acesso.

- *Este projeto ainda está em desenvolvimento.*

## Recursos

- Configuração inicial do NestJS
- Conexão pré-configurada com o MySQL usando TypeORM
- Base service, Base controller, Base entitys prontos
- Implementação de autenticação e autorização de permissões com exemplos na controller CheckAuthorization
- permissões criadas automaticamente a partir de uma lista de permissões previamente criada.
- Estrutura de diretórios escalável para a organização do projeto
- Ambiente de desenvolvimento configurado com scripts úteis

## Pré-requisitos

- Node.js
- MySQL
- NestJS CLI

## Instalação

1. Clone este repositório em sua máquina local.
2. Execute `npm install` para instalar todas as dependências do projeto.

## Configuração

Antes de iniciar o servidor, configure o arquivo `.env` na raiz do projeto com as credenciais do banco de dados.

```
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name

JWT_TYPE=Bearer
JWT_SECRET={secret_jwt}
JWT_EXPIRES_IN=3600s

```

## Uso

Use os seguintes scripts para iniciar o servidor:

```
# NPM

- Iniciar em modo de desenvolvimento
npm run start:dev

- Iniciar em modo de produção
npm run start:prod

# YARN

- Iniciar em modo de desenvolvimento
yarn start:dev

- Iniciar em modo de produção
yarn start:prod

```

Acesse `http://localhost:3000` no seu navegador para visualizar o aplicativo em execução.


## Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).