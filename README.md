# Sistema de Estacionamento (Firebase) 🅿️

Este é um projeto de sistema de estacionamento desenvolvido utilizando HTML, Bootstrap, JavaScript e Firebase. O sistema permite o cadastro, consulta e remoção de veículos estacionados, utilizando o Firestore para armazenamento dos dados e Firebase Authentication para autenticação dos usuários.

## Funcionalidades ⚙️

- Cadastro de veículos
- CheckOut de Veículos
- Base dos clientes cadastrados
- Comprovantes
- Edição de preços do estacionamento
- Interface responsiva utilizando Bootstrap
- Backend com Firebase Firestore e Authentication

## Tecnologias Utilizadas 🧑‍💻

- **HTML**: Estruturação das páginas web.
- **Bootstrap**: Estilização e responsividade das páginas.
- **JavaScript**: Lógica de front-end e manipulação do DOM.
- **Firebase Firestore**: Armazenamento dos dados dos veículos e clientes.
- **Firebase Authentication**: Autenticação dos usuários via email e senha.

## Classes 📜

### Login 🪪
Esta versão do sistema de estacionamento foi baseada na versão anterior (com Node.js e JSON), mas agora com Firebase Firestore e Authentication. O sistema possui login, cadastro de clientes via email e senha, e ativação de conta. Existem duas categorias de usuários: clientes e administradores.

### Clientes 🧑‍🦱
Clientes podem cadastrar um novo veículo, visualizar somente seus cadastros, visualizar somente seus checkouts e comprovantes, e também excluir seu cadastro.

### Administrador 🫅
O administrador possui permissões para visualizar todos os comprovantes, cadastros e checkouts dos clientes. Também pode excluir cadastros, checkouts e comprovantes.

### Cadastro de Veículos 📜
Esta classe permite cadastrar os veículos no sistema. Informações como nome do proprietário, telefone, modelo do veículo, tipo de veículo e placa serão coletados nesta etapa. Logo após, os dados serão tratados e formatados para serem salvos no Firestore.

### CheckOut de Veículos 📜
Esta classe permite realizar o check out dos veículos. Assim que a página é aberta, os dados são carregados do Firestore. Nesta etapa serão coletados somente hora de entrada e hora de saída para calcular o tempo que o veículo permaneceu no estacionamento. Os dados serão salvos no Firestore.

### Clientes Cadastrados 🧑‍🦱
Esta funcionalidade permite listar e excluir cadastros dos clientes.

### Comprovantes 📜
Após gerar o check out do cliente, as informações podem ser acessadas através desta funcionalidade que também permite imprimir a página do comprovante.

### Edição de Preços do Estacionamento ⚙️
Esta funcionalidade tem métodos para alterar `Preços por hora` e `Preço fixo` do estacionamento.

### Home 🏠
Representa a página inicial do sistema com informações sobre disponibilidade de vagas, preços do estacionamento e quantidade de clientes.

## Estrutura do Projeto

```plaintext
avaliacao/
├── public/
│   ├── bootstrap/
│   ├── navbar-admin/
│   ├── navigation/
│   ├── register/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   └── index.js
├── .firebaserc
├── .gitignore
├── firebase.json
└── README.md
