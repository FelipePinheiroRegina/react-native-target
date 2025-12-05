# 💰 React Native Target

App React Native 0.81.5 + Expo 54 com Expo Router 6 (file-based routing), TypeScript 5.9, nova arquitetura habilitada. Gerenciamento financeiro: transações (income/outcome), metas com tracking de progresso, componentes modulares, tema customizado Inter font, edge-to-edge Android.

## 📱 Sobre o Projeto

O **RN Target** é uma aplicação mobile que permite aos usuários:

- Criar e gerenciar metas financeiras (targets)
- Registrar transações de entrada (income) e saída (outcome)
- Acompanhar o progresso em direção às metas estabelecidas
- Visualizar resumo financeiro com total, receitas e despesas

## 🚀 Tecnologias

- **React Native** 0.81.5
- **Expo** ~54.0.25
- **Expo Router** ~6.0.16 (navegação baseada em arquivos)
- **TypeScript** 5.9.2
- **Expo Google Fonts** (Inter)
- **React Native Currency Input**

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (para desenvolvimento Android)
- [Xcode](https://developer.apple.com/xcode/) (para desenvolvimento iOS - apenas macOS)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd rn-transactions
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

## 📱 Executando o App

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Web (opcional)

```bash
npm run web
```

## 📁 Estrutura do Projeto

```
rn-transactions/
├── src/
│   ├── app/                    # Rotas (Expo Router)
│   │   ├── _layout.tsx        # Layout raiz
│   │   ├── index.tsx          # Tela inicial (Home)
│   │   ├── target.tsx         # Criar nova meta
│   │   ├── in-progress/       # Detalhes da meta em progresso
│   │   └── transaction/       # Adicionar transação
│   ├── components/            # Componentes reutilizáveis
│   │   ├── Button/
│   │   ├── CurrencyInput/
│   │   ├── HomeHeader/
│   │   ├── Input/
│   │   ├── List/
│   │   ├── Progress/
│   │   ├── Summary/
│   │   ├── Target/
│   │   ├── Transaction/
│   │   └── TransactionType/
│   ├── theme/                 # Tema (cores, fontes)
│   │   ├── colors.ts
│   │   └── fontFamily.ts
│   └── utils/                # Utilitários
│       ├── formatCurrency.ts
│       └── transactionsType.ts
├── app.json                  # Configuração do Expo
├── package.json
└── tsconfig.json
```

## 🎨 Tema

### Cores

- **Azul**: `#3d44cd` (cor primária)
- **Verde**: `#4AE124` (entradas/income)
- **Vermelho**: `#FF6767` (saídas/outcome)
- **Cinza**: Escala de 100-600 para textos e backgrounds

### Fontes

- **Inter** (Bold, Medium, Regular)

## 📄 Funcionalidades

### Tela Inicial

- Exibe resumo financeiro (total, receitas, despesas)
- Lista de metas criadas
- Botão para adicionar nova meta

### Criar Meta

- Nome da meta
- Valor alvo
- Salvamento da meta

### Detalhes da Meta

- Barra de progresso visual
- Lista de transações relacionadas
- Adicionar nova transação

### Adicionar Transação

- Tipo: Entrada (Income) ou Saída (Outcome)
- Valor em R$
- Descrição opcional

## 🛠️ Scripts Disponíveis

- `npm start` - Inicia o servidor Expo
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS

## 📝 Configurações

### Android

- Package: `com.feh.react_native_target`
- Edge-to-edge habilitado
- Predictive back gesture desabilitado

### iOS

- Suporte para tablets

## 🔐 Variáveis de Ambiente

Atualmente o projeto não utiliza variáveis de ambiente. Se necessário, crie um arquivo `.env` na raiz do projeto.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Nota**: Este é um projeto em desenvolvimento. Algumas funcionalidades podem estar em implementação.
