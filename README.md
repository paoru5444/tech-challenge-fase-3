<div align="center">
  <img src="./assets/images/logo.png" alt="Orçamento Simples" width="300"/>
</div>

# Seja bem vindo ao Orçamento Simples 👋

Uma ferramenta simples e produtiva desenvolvida para ser o seu aliado, e ajudar a gerenciar melhor suas finanças pessoais de forma prática e conveniente!

<div align="left">
  <img src="./assets/screenshots/1.png" width="19%"/>
  <img src="./assets/screenshots/2.png" width="19%"/>
  <img src="./assets/screenshots/3.png" width="19%"/>
  <img src="./assets/screenshots/4.png" width="19%"/>
  <img src="./assets/screenshots/5.png" width="19%"/>
</div>
<div align="left">
  <img src="./assets/screenshots/6.png" width="19%"/>
  <img src="./assets/screenshots/7.png" width="19%"/>
  <img src="./assets/screenshots/8.png" width="19%"/>
  <img src="./assets/screenshots/9.png" width="19%"/>
  <img src="./assets/screenshots/10.png" width="19%"/>
</div>
<div align="left">
  <img src="./assets/screenshots/11.png" width="19%"/>
  <img src="./assets/screenshots/12.png" width="19%"/>
  <img src="./assets/screenshots/13.png" width="19%"/>
  <img src="./assets/screenshots/14.png" width="19%"/>
  <img src="./assets/screenshots/15.png" width="19%"/>
</div>

---

## Como começar

1. Instale as dependências
```bash
   npm install
```

2. Inicie o app
```bash
   npx expo start
```

Na saída do terminal, você encontrará opções para abrir o app em:

- [Build de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/)
- [Emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Simulador iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), uma sandbox limitada para experimentar o desenvolvimento com Expo

Você pode começar a desenvolver editando os arquivos dentro do diretório **app**. Este projeto utiliza [roteamento baseado em arquivos](https://docs.expo.dev/router/introduction).

---

## Ferramentas

- React Native
- Typescript
- Expo
- Firebase
- Zod
- React Hook Form
- Formik
- Expo Router
- Expo Font
- React Native Calendars
- React Native Document Picker

---

## Arquitetura

O projeto foi construído com uma arquitetura **modular**, onde cada pasta dentro de `screens/` representa um módulo independente da aplicação.

### Padrão de cada módulo

Cada módulo segue o mesmo padrão de escrita, separando responsabilidades entre dois tipos de componentes:

- **Stateful Components** (`screens/`) — gerenciam a lógica de negócio e o estado
- **Stateless Components** (`components/`) — apenas renderizam os dados recebidos via props

Essa separação torna os componentes **fáceis de testar** de forma isolada, uma vez que os Stateless Components recebem seus dados por injeção de dependência.

### Estrutura de pastas
```
src/
└── screens/
    └── <ModuleName>/
        ├── components/    # Stateless components (apenas renderização)
        ├── screens/       # Stateful components (lógica e estado)
        ├── context/       # Context API do módulo
        ├── models/        # Tipagens e interfaces
        ├── navigation/    # Configuração de navegação
        ├── constants/     # Constantes do módulo
        ├── utils/         # Funções utilitárias
        └── store/         # (em breve) Gerenciamento de estado global
```

### Escalabilidade

Essa estrutura torna o projeto preparado para crescer, seja para a adição de **novas features** ou para a inclusão de **novos integrantes** na equipe de desenvolvimento, sem que a organização do código seja comprometida.

---

## Melhorias

- Aprimorar a tipagem dos módulos em toda a aplicação
- Separar os hooks em 2 domínios (Lógica e Serviço)
- Criar dominio de serviço genérico para o firebase
- Salvar os assets no S3 da AWS
- Adicionar mais animações e selecionar icones melhores
- Adicionar ferramenta de gerenciamento de estado global mais robusta (Redux)
- Criar testes unitários visando 80% de coverage
- Criar em torno de 5 testes de integração para cenários criticos
- Adicionar ferramenta de Tracking e Monitoramento como o Sentry
- Subir a aplicação no Google Play e na App Store
- Adicionar EAS para OTA Updates
