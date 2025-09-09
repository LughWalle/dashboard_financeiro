# 💰 Dashboard Financeiro

Sistema completo de gestão financeira com dashboard interativo, gráficos avançados e análise de transações em tempo real.

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 18](https://reactjs.org/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[Styled Components](https://styled-components.com/)** - CSS-in-JS para estilização
- **[Nivo](https://nivo.rocks/)** - Biblioteca de gráficos interativos
  - `@nivo/pie` - Gráficos de pizza
  - `@nivo/line` - Gráficos de linha
  - `@nivo/bar` - Gráficos de barras

### **Backend & Dados**
- **[JSON Server](https://github.com/typicode/json-server)** - API REST mock para desenvolvimento
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições

### **Estado e Context**
- **React Context API** - Gerenciamento de estado global
- **useReducer** - Gerenciamento de estado complexo
- **Custom Hooks** - Lógica reutilizável

### **Funcionalidades Avançadas**
- **Filtros Inteligentes** - Por período, tipo, conta, indústria
- **Ordenação Dinâmica** - Por data, valor, ID, tipo
- **Paginação Client-side** - Performance otimizada
- **Persistência Local** - Filtros salvos no localStorage
- **Gráficos Responsivos** - Adaptação automática para mobile
- **Navegação Horizontal** - Para grandes volumes de dados
- **Context API Modularizado** - Separação em múltiplos arquivos

### **UI/UX**
- **Design System Completo** - 35+ componentes styled-components
- **Sidebar Fixa** - Navegação exclusiva do dashboard
- **Layouts Responsivos** - Grid e Flex systems
- **Estados Visuais** - Loading, error, empty states
- **Feedback Visual** - Alerts, badges, tooltips
- **Acessibilidade** - Focus states, keyboard navigation

### **Desenvolvimento**
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **Concurrently** - Execução simultânea de scripts
- **Nodemon** - Reload automático do JSON Server

## Pré-requisitos

- Node.js >= 20.0.0
- npm >= 8.0.0

## Configuração do Node.js

### Usando nvm (recomendado)

```bash
# Instalar a versão correta do Node.js
nvm install 20.19.0
nvm use 20.19.0

# Verificar a versão
node --version
npm --version
```

### Usando n (alternativa)

```bash
# Instalar a versão correta do Node.js
n 18.19.0

# Verificar a versão
node --version
npm --version
```

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas configurações
```

### **📋 Lista Completa de Scripts**

```bash
# 🚀 Desenvolvimento
npm run dev              # Inicia apenas o Next.js
npm run dev:all          # 🌟 Inicia Next.js + JSON Server (RECOMENDADO)
npm run json-server      # Inicia apenas o JSON Server

# 🏗️ Build e Produção
npm run build            # Constrói o projeto para produção
npm run start            # Inicia o servidor de produção

# 🔍 Qualidade de Código
npm run lint             # Executa o linter
npm run lint:fix         # Corrige automaticamente problemas
npm run type-check       # Verifica tipos TypeScript

# 🧹 Limpeza
npm run clean            # Remove arquivos de build
npm run clean:all        # Remove tudo e reinstala dependências
```

## 🎨 Demonstração Visual

### **Dashboard Principal**
```
┌─────────────────────────────────────────────────────────┐
│ 💰 Dashboard Financeiro                                 │
├─────────────────────────────────────────────────────────┤
│ 🥧 Gráfico Pizza    📈 Gráfico Linha    📊 Gráfico Barras│
│ [Filtros]           [Navegação ◀️ ▶️]   [Top Contas]     │
├─────────────────────────────────────────────────────────┤
│ 📋 Lista de Transações                                  │
│ [Busca] [Filtros] [Ordenação] [Paginação]              │
└─────────────────────────────────────────────────────────┘
```

### **Biblioteca de Componentes** (`/components`)
- 🎯 **35+ Componentes Styled** - Cards, botões, formulários
- 🎨 **Múltiplas Variantes** - Cores, tamanhos, estilos
- 📱 **Exemplos Interativos** - Demonstração completa
- 📚 **Documentação** - Guia de uso detalhado

## 🔧 Configuração Avançada

### **🌍 Variáveis de Ambiente**

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME="Dashboard Financeiro"
```

### **🗄️ Dados do JSON Server**

O arquivo `db.json` contém dados mock para desenvolvimento:
- **1000+ transações** - Dados realistas para teste
- **Múltiplas contas** - Diferentes bancos e tipos
- **Categorias variadas** - Indústrias e estados diversos
- **Período amplo** - Dados de 2023 e 2024

### **🎯 Customização**

Para personalizar o projeto:

1. **Cores do Design System:** Edite `/src/styles/components.ts`
2. **Dados Mock:** Modifique `/db.json`
3. **Filtros:** Ajuste `/src/contexts/transactions/`
4. **Gráficos:** Configure componentes em `/src/components/`

## 🚀 Deploy e Produção

### **Build Otimizado**
```bash
npm run build        # Gera build otimizado
npm run start        # Inicia servidor de produção
```

### **Verificações Pré-Deploy**
```bash
npm run type-check   # Verifica tipos TypeScript
npm run lint         # Verifica qualidade do código
npm run build        # Testa se compila sem erros
```

## 📚 Recursos Adicionais

- 📖 **[Guia de Styled-Components](./STYLED_COMPONENTS_GUIDE.md)** - Documentação completa dos componentes
- 🎨 **[Demonstração Live](http://localhost:3000/components)** - Biblioteca interativa
- 🔧 **[Next.js Docs](https://nextjs.org/docs)** - Documentação oficial
- 📊 **[Nivo Charts](https://nivo.rocks/)** - Documentação dos gráficos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e Styled Components**

## 🚀 Como Iniciar o Projeto

### **Método Recomendado - Desenvolvimento Completo**

```bash
# Instalar dependências
npm install

# Iniciar Next.js + JSON Server simultaneamente
npm run dev:all
```

### **Métodos Alternativos**

```bash
# Apenas Next.js
npm run dev

# Apenas JSON Server (em outro terminal)
npm run json-server

# Build para produção
npm run build
npm run start
```

### **🌐 URLs do Projeto**

Após executar `npm run dev:all`, o projeto estará disponível em:

- **🖥️ Dashboard Next.js:** [http://localhost:3000](http://localhost:3000)
- **🗄️ API JSON Server:** [http://localhost:3001](http://localhost:3001)
- **📊 Dados de Transações:** [http://localhost:3001/transactions](http://localhost:3001/transactions)

### **📱 Páginas Disponíveis**

- **`/`** - Página inicial com autenticação
- **`/dashboard`** - Dashboard principal com gráficos
- **`/components`** - Biblioteca de componentes (demonstração)

## 📁 Estrutura do Projeto

```
dashboard_financeiro/
├── 📂 src/
│   ├── 📂 app/                     # App Router do Next.js
│   │   ├── 📂 api/                 # API routes
│   │   ├── 📂 components/          # Página de demonstração
│   │   ├── 📂 dashboard/           # Dashboard com layout próprio
│   │   ├── layout.tsx              # Layout raiz
│   │   └── page.tsx                # Página inicial
│   ├── 📂 components/              # Componentes React
│   │   ├── AreaCharts.tsx          # Gráficos principais
│   │   ├── BarChart.tsx            # Gráfico de barras
│   │   ├── PieChart.tsx            # Gráfico de pizza
│   │   ├── ScrollableLineChart.tsx # Gráfico de linha navegável
│   │   ├── TransactionsList.tsx    # Lista de transações
│   │   ├── DashboardSidebar.tsx    # Sidebar do dashboard
│   │   └── ExampleComponents.tsx   # Demonstração de componentes
│   ├── 📂 contexts/                # Context API modularizado
│   │   └── 📂 transactions/        # Context de transações
│   │       ├── context.ts          # Criação do contexto
│   │       ├── provider.tsx        # Provider component
│   │       ├── reducer.ts          # Reducer logic
│   │       ├── types.ts            # TypeScript types
│   │       └── index.ts            # Exports
│   ├── 📂 lib/                     # Utilitários e configurações
│   │   └── transactionsMock.ts     # Tipos e funções mock
│   ├── 📂 styles/                  # Styled Components
│   │   └── components.ts           # 35+ componentes reutilizáveis
│   └── middleware.ts               # Middleware de autenticação
├── 📂 public/                      # Arquivos estáticos
├── 📄 db.json                      # Dados do JSON Server
├── 📄 package.json                 # Dependências e scripts
├── 📄 README.md                    # Este arquivo
├── 📄 STYLED_COMPONENTS_GUIDE.md   # Guia dos componentes
└── 📄 tsconfig.json                # Configuração TypeScript
```

## 🎯 Funcionalidades Principais

### **📊 Dashboard Interativo**
- ✅ **Gráfico de Pizza** - Distribuição por tipo, indústria, estado
- ✅ **Gráfico de Linha** - Evolução temporal com navegação horizontal
- ✅ **Gráfico de Barras** - Top contas por movimentação
- ✅ **Filtros Avançados** - Por período, ano, tipo de transação
- ✅ **Persistência** - Filtros salvos automaticamente

### **📋 Lista de Transações**
- ✅ **Busca Inteligente** - Por conta, indústria, estado, valor
- ✅ **Ordenação Dinâmica** - Por qualquer campo (ASC/DESC)
- ✅ **Paginação Client-side** - Performance otimizada
- ✅ **Filtros por Tipo** - Depósitos, saques, todos
- ✅ **Formatação** - Valores em moeda brasileira

### **🎨 Design System**
- ✅ **35+ Componentes** - Cards, botões, formulários, layouts
- ✅ **Variantes Múltiplas** - Cores, tamanhos, estilos
- ✅ **Responsividade** - Adaptação automática para mobile
- ✅ **Estados Visuais** - Loading, error, hover, focus
- ✅ **Acessibilidade** - Navegação por teclado, contraste

### **🔧 Arquitetura**
- ✅ **Context API Modular** - Estado global organizado
- ✅ **TypeScript Completo** - Tipagem em todo o projeto
- ✅ **Custom Hooks** - Lógica reutilizável
- ✅ **API Mock** - JSON Server para desenvolvimento
- ✅ **Sidebar Exclusiva** - Layout específico do dashboard

## 🛠️ Scripts de Desenvolvimento
