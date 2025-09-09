# 🎨 Guia de Styled-Components

## 📚 Biblioteca Completa de Componentes

Este projeto agora conta com uma biblioteca abrangente de styled-components reutilizáveis, organizados em `/src/styles/components.ts`.

## 🏗️ Estrutura dos Componentes

### 📦 Cards e Containers

#### `Card`
Card flexível com múltiplas variantes e configurações.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/styles/components'

<Card variant="elevated" padding="lg" borderRadius="xl">
  <CardHeader>
    <CardTitle size="lg">Título do Card</CardTitle>
    <CardDescription>Descrição opcional do card</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo principal do card
  </CardContent>
  <CardFooter>
    <Badge variant="success">Status</Badge>
    <Button size="sm">Ação</Button>
  </CardFooter>
</Card>
```

**Variantes:**
- `default` - Card padrão com sombra sutil
- `elevated` - Sombra mais forte com efeito hover
- `outlined` - Borda forte sem sombra
- `flat` - Sem sombra, fundo cinza claro

**Padding:** `none`, `sm`, `md`, `lg`, `xl`
**Border Radius:** `none`, `sm`, `md`, `lg`, `xl`

### 🔘 Botões Avançados

#### `Button`
Sistema completo de botões com múltiplas variantes, tamanhos e estados.

```tsx
import { Button, ButtonGroup } from '@/styles/components'

// Botão básico
<Button variant="primary" size="lg" fullWidth>
  Botão Principal
</Button>

// Botão com estados
<Button variant="danger" disabled>Desabilitado</Button>
<Button variant="success" loading>Carregando...</Button>

// Grupo de botões
<ButtonGroup orientation="horizontal">
  <Button variant="ghost">Opção 1</Button>
  <Button variant="ghost">Opção 2</Button>
  <Button variant="ghost">Opção 3</Button>
</ButtonGroup>
```

**Variantes:**
- `primary` - Azul, ação principal
- `secondary` - Cinza, ação secundária
- `success` - Verde, ações positivas
- `danger` - Vermelho, ações destrutivas
- `warning` - Amarelo, atenção
- `info` - Ciano, informativo
- `ghost` - Transparente com borda
- `link` - Estilo de link

**Tamanhos:** `xs`, `sm`, `md`, `lg`, `xl`

### 📝 Formulários

#### Sistema completo de formulários com validação visual

```tsx
import { 
  FormGroup, 
  FormLabel, 
  Input, 
  TextArea, 
  Select, 
  FormHelperText 
} from '@/styles/components'

<FormGroup hasError={!!errors.email}>
  <FormLabel required>Email</FormLabel>
  <Input 
    type="email" 
    size="lg"
    placeholder="seu@email.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <FormHelperText variant="error">
    {errors.email}
  </FormHelperText>
</FormGroup>

<FormGroup>
  <FormLabel>Categoria</FormLabel>
  <Select size="md">
    <option value="">Selecione...</option>
    <option value="1">Opção 1</option>
  </Select>
</FormGroup>

<FormGroup>
  <FormLabel>Mensagem</FormLabel>
  <TextArea 
    resize="vertical"
    placeholder="Digite sua mensagem..."
  />
  <FormHelperText variant="success">
    Campo preenchido corretamente
  </FormHelperText>
</FormGroup>
```

**Tamanhos:** `sm`, `md`, `lg`
**Helper Text Variants:** `default`, `error`, `success`

### 🎯 Layout Flexível

#### `Grid` e `Flex`
Sistemas de layout responsivo e flexível.

```tsx
import { Grid, Flex } from '@/styles/components'

// Grid responsivo
<Grid columns={3} gap="1.5rem" responsive>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Grid com colunas customizadas
<Grid columns="200px 1fr 100px" gap="1rem">
  <div>Sidebar</div>
  <div>Conteúdo</div>
  <div>Actions</div>
</Grid>

// Flex layout
<Flex justify="between" align="center" gap="1rem">
  <div>Conteúdo à esquerda</div>
  <div>Conteúdo à direita</div>
</Flex>

<Flex direction="column" align="center" gap="0.5rem">
  <h3>Título</h3>
  <p>Descrição</p>
  <Button>Ação</Button>
</Flex>
```

**Grid Props:**
- `columns` - Número ou template de colunas
- `gap` - Espaçamento entre itens
- `responsive` - Adapta para mobile (1 coluna)

**Flex Props:**
- `direction` - `row`, `column`, `row-reverse`, `column-reverse`
- `justify` - `start`, `end`, `center`, `between`, `around`, `evenly`
- `align` - `start`, `end`, `center`, `stretch`, `baseline`
- `wrap` - `nowrap`, `wrap`, `wrap-reverse`
- `gap` - Espaçamento entre itens

### 🔔 Feedback

#### `Alert` e `Badge`
Componentes para comunicação visual com o usuário.

```tsx
import { Alert, Badge } from '@/styles/components'

// Alertas
<Alert variant="success" size="lg">
  <strong>Sucesso:</strong> Operação realizada com êxito!
</Alert>

<Alert variant="error">
  Ocorreu um erro ao processar a solicitação.
</Alert>

// Badges
<Badge variant="primary" size="lg">Novo</Badge>
<Badge variant="success">Ativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="error">Inativo</Badge>
```

**Alert Variants:** `info`, `success`, `warning`, `error`
**Badge Variants:** `default`, `primary`, `success`, `warning`, `error`, `info`
**Tamanhos:** `sm`, `md`, `lg`

### 🧭 Navegação

#### `Breadcrumb` e `Tabs`
Componentes para navegação e organização de conteúdo.

```tsx
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  Tabs, 
  TabsList, 
  Tab, 
  TabContent 
} from '@/styles/components'

// Breadcrumb
<Breadcrumb>
  <BreadcrumbItem>
    <a href="/">Home</a>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <a href="/dashboard">Dashboard</a>
  </BreadcrumbItem>
  <BreadcrumbItem isActive>
    Página Atual
  </BreadcrumbItem>
</Breadcrumb>

// Tabs
const [activeTab, setActiveTab] = useState('tab1')

<Tabs>
  <TabsList>
    <Tab 
      isActive={activeTab === 'tab1'} 
      onClick={() => setActiveTab('tab1')}
    >
      Aba 1
    </Tab>
    <Tab 
      isActive={activeTab === 'tab2'} 
      onClick={() => setActiveTab('tab2')}
    >
      Aba 2
    </Tab>
  </TabsList>
  
  <TabContent>
    {activeTab === 'tab1' && <div>Conteúdo da Aba 1</div>}
    {activeTab === 'tab2' && <div>Conteúdo da Aba 2</div>}
  </TabContent>
</Tabs>
```

## 🎨 Exemplos Práticos

### Dashboard Card
```tsx
<Card variant="elevated" padding="lg">
  <CardHeader>
    <Flex justify="between" align="center">
      <div>
        <CardTitle>Vendas do Mês</CardTitle>
        <CardDescription>Comparativo com mês anterior</CardDescription>
      </div>
      <Badge variant="success" size="lg">+12%</Badge>
    </Flex>
  </CardHeader>
  <CardContent>
    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
      R$ 45.230,00
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="ghost" size="sm">Ver detalhes</Button>
    <Button variant="primary" size="sm">Relatório</Button>
  </CardFooter>
</Card>
```

### Formulário de Contato
```tsx
<Card padding="xl">
  <CardHeader>
    <CardTitle size="lg">Entre em Contato</CardTitle>
    <CardDescription>
      Preencha o formulário e entraremos em contato
    </CardDescription>
  </CardHeader>
  
  <CardContent>
    <Grid columns={1} gap="1rem">
      <FormGroup>
        <FormLabel required>Nome</FormLabel>
        <Input size="lg" placeholder="Seu nome completo" />
      </FormGroup>
      
      <FormGroup>
        <FormLabel required>Email</FormLabel>
        <Input type="email" size="lg" placeholder="seu@email.com" />
      </FormGroup>
      
      <FormGroup>
        <FormLabel>Mensagem</FormLabel>
        <TextArea placeholder="Digite sua mensagem..." />
      </FormGroup>
    </Grid>
  </CardContent>
  
  <CardFooter>
    <Flex justify="end" gap="0.75rem">
      <Button variant="ghost">Cancelar</Button>
      <Button variant="primary">Enviar Mensagem</Button>
    </Flex>
  </CardFooter>
</Card>
```

### Lista com Status
```tsx
<Card padding="none">
  <CardHeader style={{ padding: '1.5rem' }}>
    <CardTitle>Usuários Ativos</CardTitle>
  </CardHeader>
  
  <div>
    {users.map(user => (
      <Flex 
        key={user.id}
        justify="between" 
        align="center"
        style={{ 
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #f3f4f6'
        }}
      >
        <div>
          <h5 style={{ margin: 0 }}>{user.name}</h5>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
            {user.email}
          </p>
        </div>
        
        <Flex gap="0.5rem">
          <Badge 
            variant={user.status === 'active' ? 'success' : 'warning'}
          >
            {user.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
          <ButtonGroup>
            <Button size="sm" variant="ghost">Editar</Button>
            <Button size="sm" variant="danger">Excluir</Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    ))}
  </div>
</Card>
```

## 🚀 Como Usar

1. **Importe os componentes necessários:**
```tsx
import { Card, Button, Input, Alert } from '@/styles/components'
```

2. **Use com TypeScript para autocomplete completo:**
```tsx
<Button 
  variant="primary"    // Autocomplete com todas as variantes
  size="lg"           // Autocomplete com todos os tamanhos
  fullWidth           // Props boolean
  onClick={handleClick}
>
  Clique aqui
</Button>
```

3. **Combine componentes para layouts complexos:**
```tsx
<Grid columns={2} responsive>
  <Card variant="elevated">
    <Flex direction="column" gap="1rem">
      <Alert variant="info">Informação importante</Alert>
      <Button variant="primary" fullWidth>Ação</Button>
    </Flex>
  </Card>
</Grid>
```

## 🎯 Vantagens

- ✅ **Consistência Visual**: Todos os componentes seguem o mesmo design system
- ✅ **Tipagem Completa**: TypeScript garante uso correto das props
- ✅ **Flexibilidade**: Múltiplas variantes e configurações
- ✅ **Responsividade**: Adaptação automática para diferentes telas
- ✅ **Acessibilidade**: Estados visuais claros e navegação intuitiva
- ✅ **Performance**: CSS-in-JS otimizado
- ✅ **Manutenibilidade**: Componentes centralizados e reutilizáveis

## 📱 Demonstração

Acesse `/components` para ver todos os componentes em ação com exemplos interativos!
