# Processo seletivo Trybe

## Sobre o repositório
Repositório criado para salvar o código do processo seletivo de back-end da Trybe.
Os commits foram feitos utilizando o padrão de *flags* do Conventional Commits:
- `config`: representa um commit que altera configuração
- `feat`: adiciona uma nova funcionalidade
- `fix`: resolve um bug
- `build`: alterações relacionadas a construção do projeto (`yarn init` para criação do package.json por exemplo)
> fonte: https://www.conventionalcommits.org/en/v1.0.0/

## Como executar
- Utilize o comando `yarn install` para instalar todas as dependências
- Crie o arquivo .env com as variáveis de ambiente
	- Informações do banco de dados:
		- `DB_HOST` para definir o host
		- `DB_USERNAME` para definir o nome de usuário
		- `DB_PASSWORD` para definir a senha
		- `DB_NAME` para definir o nome do banco
	- `SECRET` para definir a chave secreta para encriptar o token
- Utilize o comando `yarn deploy` para iniciar o projeto como se estivesse em ambiente de produção ou homologação, caso queira executar como desenvolvimento use o comando `yarn dev`
- Para acessar a api basta utilizar a url http://localhost:3333

## Sobre o código
A api foi desenvolvida utilizando:
 - Node.js com Express
 - Bando de dados MySQL
	 - Para a conexão e gerenciamento - Sequelize e seu CLI
		 - `yarn sequelize db:migrate` para executar as migrations ainda não executadas
		 - `yarn sequelize migration:create --name=nome-da-migration` para criar uma nova migration
		 - `yarn sequelize db:migrate:undo:all` desfaz todas as migrations
 - Para os testes Insomnia, já que não foi desenvolvido o front-end. 