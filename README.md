# Desafio FullStack

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn install
````
<br>

**Configure as variáveis de ambiente no seu .env**, passando as credenciais corretas para conectar em seu banco local

**Atualize seu banco local rodando as migrações para tudo funcionar corretamente**, para isso execute o comando:

````
yarn typeorm migration:run -d src/data-source
````

<br>

Com isso feito, para rodar sua aplicação, basta utilizar o comando
````
yarn dev
````

<br>

