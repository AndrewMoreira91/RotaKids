
## Rota Kids App: Instruções para Execução

**Introdução**

Este guia detalha as etapas necessárias para executar o aplicativo Rota Kids em seu ambiente local. Siga as instruções com atenção para garantir uma configuração bem-sucedida.

**Pré-requisitos**

**Para executar o aplicativo:**

-   **Sem emulador:**
    -   É necessário ter o Expo Go instalado em seu celular. Você pode baixá-lo na loja de aplicativos do seu dispositivo.
-   **Com emulador:**
    -   Recomenda-se usar o emulador do Android Studio. Para instruções de instalação e configuração, [consulte este guia](https://react-native.rocketseat.dev/android/emulador/).

**Para executar o servidor:**
-   Node.js 20.11.0 ou superior instalado em sua máquina. Faça o download em [aqui](https://nodejs.org/en/download/package-manager).
-   npm ou yarn para gerenciamento de pacotes. O npm geralmente é instalado junto com o Node.js.

**Passos para execução do aplicativo**

1.  **Clone o repositório:**
    
    Bash
    
    ```
    git clone <url_do_repositório> nome-do-projeto
    ```
    
2.  **Navegue até a pasta do projeto:**
    
    Bash
    
    ```
    cd nome-do-projeto
    ```
    
3.  **Instale as dependências:**
    
    Bash
    
    ```
    npm install
    ```
    
4.  **Inicie o aplicativo:**
    
    Bash
    
    ```
    npm run start
    ```

**Executando sem emulador:**

1.  Abra o Expo Go no seu celular.
2.  Leia o QR Code exibido no terminal.

**Executando com emulador:**

1.  Certifique-se de ter configurado o emulador corretamente.
2.  Pressione a tecla "a" no terminal para iniciar o emulador com o aplicativo em execução.

**Passos para execução do servidor**

1.  **Navegue até a pasta do servidor:**
    
    Bash
    
    ```
    cd server
    ```
2.  **Instale as dependências:**
    
    Bash
    
    ```
    npm install
    ```
    
3.  **Inicie o servidor:**
    
    Bash
    
    ```
    npm run dev
    ```
**Observações:**

-   Para visualizar os dados do banco de dados, execute o seguinte comando no terminal:
    
    Bash
    
    ```
    npx prisma studio
    ```
    Isso abrirá uma interface do Prisma Studio em seu navegador.
