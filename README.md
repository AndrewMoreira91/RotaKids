# Rota Kids App

## Introdução

O **Rota Kids App** foi criado como parte de um projeto para o terceiro semestre na faculdade Eniac. A ideia era desenvolver um aplicativo móvel, então decidimos fazer algo útil para motoristas de vans escolares.

## Objetivo do Aplicativo

O Rota Kids App tem o objetivo de facilitar a vida dos motoristas de vans escolares. Ele ajuda a gerenciar as crianças que são transportadas, controlar os pagamentos, criar rotas otimizadas, mostrar a localização em tempo real para os pais e permitir a comunicação entre motoristas e pais.

## Tecnologias Utilizadas

- **Front-end:** Feito em React Native com o Expo.
- **Back-end:** API em Node.js usando Express e Prisma ORM para trabalhar com o banco de dados SQLite (usado só para testes).
- **Integrações:** Uso de APIs do Google para como o [Route Optimization API](https://developers.google.com/maps/documentation/route-optimization/overview?hl=pt-br) e a [Address Validation API](https://developers.google.com/maps/documentation/address-validation/overview?hl=pt-br).

## Principais Funcionalidades

- **Cadastro de Usuários:** Registro de novas crianças, responsáveis e escolas, além de um sistema de login e cadastro para motoristas.
- **Gerenciamento de Rotas:** Criação automática de rotas otimizadas usando as informações das crianças cadastradas, com visualização das rotas no mapa.
- **Pagamentos:** Controle de pagamentos, incluindo a possibilidade de pagar pelo app e cobranças de mensalidades atrasadas.
- **Localização em Tempo Real:** Monitoramento da localização da van escolar em tempo real, dando mais segurança e tranquilidade para os pais.
- **Comunicação:** Sistema de mensagens entre motoristas e pais para facilitar a comunicação.

## Versão Atual

Na versão atual do Rota Kids App, você pode:

- Cadastrar novas crianças, responsáveis e escolas.
- Utilizar o sistema de login e cadastro para motoristas.
- Criar rotas otimizadas com base nas crianças cadastradas.
- Visualizar as rotas no mapa.

---

## Instruções para Execução

### Pré-requisitos

**Para executar o aplicativo:**

- **Sem emulador:**
  - É necessário ter o Expo Go instalado em seu celular. Você pode baixá-lo na loja de aplicativos do seu dispositivo.
- **Com emulador:**
  - Recomenda-se usar o emulador do Android Studio. Para instruções de instalação e configuração, [consulte este guia](https://react-native.rocketseat.dev/android/emulador/).

**Para executar o servidor:**
- Node.js 20.11.0 ou superior instalado em sua máquina. Faça o download em [aqui](https://nodejs.org/en/download/package-manager).
- npm ou yarn para gerenciamento de pacotes. O npm geralmente é instalado junto com o Node.js.

### Passos para execução do aplicativo

1. **Clone o repositório:**

    ```bash
    git clone <url_do_repositório> nome-do-projeto
    ```

2. **Navegue até a pasta do projeto:**

    ```bash
    cd nome-do-projeto
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Inicie o aplicativo:**

    ```bash
    npm run start
    ```

**Executando sem emulador:**

1. Abra o Expo Go no seu celular.
2. Leia o QR Code exibido no terminal.

**Executando com emulador:**

1. Certifique-se de ter configurado o emulador corretamente.
2. Pressione a tecla "a" no terminal para iniciar o emulador com o aplicativo em execução.

### Passos para execução do servidor

1. **Navegue até a pasta do servidor:**

    ```bash
    cd server
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Inicie o servidor:**

    ```bash
    npm run dev
    ```

**Observações:**

- Para visualizar os dados do banco de dados, execute o seguinte comando no terminal:

    ```bash
    npx prisma studio
    ```
    Isso abrirá uma interface do Prisma Studio em seu navegador.
