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

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# As configurações de .env.example ja são funcionais não precisa editar
```

### **📋 Lista Completa de Scripts**

```bash
# 🚀 Desenvolvimento
npm run dev              # Inicia o Next.js

# 🏗️ Build e Produção
npm run build            # Constrói o projeto para produção
npm run start            # Inicia o servidor de produção

```

### **👨🏽‍👩🏾‍👧🏼‍👦🏽 Usuarios para Login**

```bash
# Email: 
admin@test.com

# Password(senha)
123456
```
### **🌐 URLs do Projeto**

Após executar `npm run dev`, o projeto estará disponível em:

- **🖥️ Dashboard Next.js:** [http://localhost:3000](http://localhost:3000)

### **📱 Páginas Disponíveis**

- **`/`** - Página inicial com autenticação
- **`/login`** - Página de login
- **`/dashboard`** - Dashboard principal com gráficos
- **`/components`** - Biblioteca de componentes (demonstração)


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

### **🎨 Design System com componentes pessoais**
- ✅ **35+ Componentes** - Cards, botões, formulários, layouts
- ✅ **Variantes Múltiplas** - Cores, tamanhos, estilos
- ✅ **Responsividade** - Adaptação automática para mobile
- ✅ **Estados Visuais** - Loading, error, hover, focus
- ✅ **Acessibilidade** - Navegação por teclado, contraste

### **🔧 Arquitetura**
- ✅ **Context API Modular** - Estado global organizado
- ✅ **TypeScript Completo** - Tipagem em todo o projeto
- ✅ **Custom Hooks** - Lógica reutilizável
- ✅ **Sidebar Exclusiva** - Layout específico do dashboard


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
