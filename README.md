# Dashboard Financeiro

Sistema de gestão financeira desenvolvido com Next.js e Node.js.

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

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run dev:all` - Inicia Next.js e JSON Server simultaneamente
- `npm run build` - Constrói o projeto para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige automaticamente problemas do linter
- `npm run type-check` - Verifica tipos TypeScript
- `npm run json-server` - Inicia o JSON Server para dados mock
- `npm run clean` - Remove arquivos de build
- `npm run clean:all` - Remove tudo e reinstala dependências

## Desenvolvimento

```bash
# Iniciar desenvolvimento completo
npm run dev:all
```

O projeto estará disponível em:
- Next.js: http://localhost:3000
- JSON Server: http://localhost:3001

## Estrutura do Projeto

```
src/
├── app/                 # App Router do Next.js
├── components/          # Componentes React
├── hooks/              # Custom hooks
├── lib/                # Utilitários e configurações
└── middleware.ts       # Middleware de autenticação
```
