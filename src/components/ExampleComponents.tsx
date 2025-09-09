'use client'
import React, { useState } from 'react'
import {
  // Cards
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  
  // Botões
  Button,
  ButtonGroup,
  
  // Formulários
  FormGroup,
  FormLabel,
  Input,
  TextArea,
  Select,
  FormHelperText,
  
  // Layout
  Grid,
  Flex,
  
  // Feedback
  Alert,
  Badge,
  
  // Navegação
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabsList,
  Tab,
  TabContent,
  
  // Containers existentes
  Container,
  PageHeader,
  PageTitle,
  PageDescription
} from '@/styles/components'

export default function ExampleComponents() {
  const [activeTab, setActiveTab] = useState('cards')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: ''
  })

  return (
    <Container>
      <PageHeader>
        <PageTitle>🎨 Biblioteca de Componentes</PageTitle>
        <PageDescription>
          Demonstração dos novos styled-components criados para o sistema
        </PageDescription>
      </PageHeader>

      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: '2rem' }}>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href="/dashboard">Dashboard</a>
        </BreadcrumbItem>
        <BreadcrumbItem isActive>
          Componentes
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Tabs Navigation */}
      <Tabs>
        <TabsList>
          <Tab 
            isActive={activeTab === 'cards'} 
            onClick={() => setActiveTab('cards')}
          >
            Cards & Layout
          </Tab>
          <Tab 
            isActive={activeTab === 'buttons'} 
            onClick={() => setActiveTab('buttons')}
          >
            Botões
          </Tab>
          <Tab 
            isActive={activeTab === 'forms'} 
            onClick={() => setActiveTab('forms')}
          >
            Formulários
          </Tab>
          <Tab 
            isActive={activeTab === 'feedback'} 
            onClick={() => setActiveTab('feedback')}
          >
            Feedback
          </Tab>
        </TabsList>

        <TabContent>
          {/* Cards & Layout Tab */}
          {activeTab === 'cards' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: '#374151' }}>Cards e Layout</h3>
              
              {/* Grid de Cards */}
              <Grid columns={3} gap="1.5rem" responsive>
                <Card variant="default" padding="lg">
                  <CardHeader>
                    <CardTitle size="md">Card Padrão</CardTitle>
                    <CardDescription>
                      Um card simples com sombra sutil e borda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Conteúdo do card com padding largo e estilo padrão.</p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="primary">Novo</Badge>
                    <Button size="sm" variant="ghost">Ver mais</Button>
                  </CardFooter>
                </Card>

                <Card variant="elevated" padding="md">
                  <CardHeader>
                    <CardTitle size="md">Card Elevado</CardTitle>
                    <CardDescription>
                      Card com sombra mais pronunciada e efeito hover
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Este card tem uma sombra mais forte e se move ao passar o mouse.</p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="success">Ativo</Badge>
                    <Button size="sm" variant="primary">Ação</Button>
                  </CardFooter>
                </Card>

                <Card variant="outlined" padding="md">
                  <CardHeader>
                    <CardTitle size="md">Card Contornado</CardTitle>
                    <CardDescription>
                      Card com borda mais forte e sem sombra
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Design minimalista com foco na borda.</p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="info">Info</Badge>
                    <Button size="sm" variant="secondary">Detalhes</Button>
                  </CardFooter>
                </Card>
              </Grid>

              {/* Flex Layout Examples */}
              <h4 style={{ margin: '2rem 0 1rem', color: '#374151' }}>Layouts Flexíveis</h4>
              
              <Card variant="flat" padding="lg" style={{ marginBottom: '1rem' }}>
                <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                  Flex - Espaçamento Entre Elementos
                </CardTitle>
                <Flex justify="between" align="center">
                  <div>
                    <h5 style={{ margin: 0, color: '#374151' }}>Título</h5>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                      Descrição do item
                    </p>
                  </div>
                  <ButtonGroup>
                    <Button size="sm" variant="ghost">Editar</Button>
                    <Button size="sm" variant="danger">Excluir</Button>
                  </ButtonGroup>
                </Flex>
              </Card>

              <Card variant="flat" padding="lg">
                <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                  Flex - Coluna Centralizada
                </CardTitle>
                <Flex direction="column" align="center" gap="1rem">
                  <Badge variant="warning" size="lg">Status</Badge>
                  <p style={{ textAlign: 'center', margin: 0, color: '#6b7280' }}>
                    Conteúdo centralizado verticalmente
                  </p>
                  <Button variant="primary">Ação Principal</Button>
                </Flex>
              </Card>
            </div>
          )}

          {/* Buttons Tab */}
          {activeTab === 'buttons' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: '#374151' }}>Botões</h3>
              
              <Grid columns={2} gap="2rem" responsive>
                <Card padding="lg">
                  <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                    Variantes de Cor
                  </CardTitle>
                  <Flex direction="column" gap="0.75rem">
                    <Button variant="primary" fullWidth>Primary</Button>
                    <Button variant="secondary" fullWidth>Secondary</Button>
                    <Button variant="success" fullWidth>Success</Button>
                    <Button variant="danger" fullWidth>Danger</Button>
                    <Button variant="warning" fullWidth>Warning</Button>
                    <Button variant="info" fullWidth>Info</Button>
                    <Button variant="ghost" fullWidth>Ghost</Button>
                    <Button variant="link" fullWidth>Link</Button>
                  </Flex>
                </Card>

                <Card padding="lg">
                  <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                    Tamanhos e Estados
                  </CardTitle>
                  <Flex direction="column" gap="0.75rem">
                    <Button variant="primary" size="xs">Extra Small</Button>
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="md">Medium</Button>
                    <Button variant="primary" size="lg">Large</Button>
                    <Button variant="primary" size="xl">Extra Large</Button>
                    <Button variant="primary" disabled>Disabled</Button>
                    <Button variant="primary" loading>Loading</Button>
                  </Flex>
                </Card>
              </Grid>

              <Card padding="lg" style={{ marginTop: '1.5rem' }}>
                <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                  Grupos de Botões
                </CardTitle>
                <Flex direction="column" gap="1rem">
                  <div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      Horizontal
                    </p>
                    <ButtonGroup>
                      <Button variant="ghost">Esquerda</Button>
                      <Button variant="ghost">Centro</Button>
                      <Button variant="ghost">Direita</Button>
                    </ButtonGroup>
                  </div>
                  
                  <div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      Vertical
                    </p>
                    <ButtonGroup orientation="vertical">
                      <Button variant="ghost">Primeira</Button>
                      <Button variant="ghost">Segunda</Button>
                      <Button variant="ghost">Terceira</Button>
                    </ButtonGroup>
                  </div>
                </Flex>
              </Card>
            </div>
          )}

          {/* Forms Tab */}
          {activeTab === 'forms' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: '#374151' }}>Formulários</h3>
              
              <Grid columns={2} gap="2rem" responsive>
                <Card padding="lg">
                  <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                    Formulário Exemplo
                  </CardTitle>
                  
                  <form onSubmit={(e) => e.preventDefault()}>
                    <FormGroup>
                      <FormLabel required>Nome Completo</FormLabel>
                      <Input 
                        type="text" 
                        placeholder="Digite seu nome"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({
                          ...prev, 
                          name: e.target.value
                        }))}
                      />
                      <FormHelperText>
                        Este campo é obrigatório
                      </FormHelperText>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel required>Email</FormLabel>
                      <Input 
                        type="email" 
                        placeholder="seu@email.com"
                        size="lg"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev, 
                          email: e.target.value
                        }))}
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Categoria</FormLabel>
                      <Select 
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({
                          ...prev, 
                          category: e.target.value
                        }))}
                      >
                        <option value="">Selecione uma categoria</option>
                        <option value="suporte">Suporte</option>
                        <option value="vendas">Vendas</option>
                        <option value="feedback">Feedback</option>
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>Mensagem</FormLabel>
                      <TextArea 
                        placeholder="Digite sua mensagem..."
                        resize="vertical"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({
                          ...prev, 
                          message: e.target.value
                        }))}
                      />
                      <FormHelperText variant="success">
                        Mensagem opcional para mais detalhes
                      </FormHelperText>
                    </FormGroup>

                    <Flex justify="end" gap="0.75rem">
                      <Button variant="ghost">Cancelar</Button>
                      <Button variant="primary">Enviar</Button>
                    </Flex>
                  </form>
                </Card>

                <Card padding="lg">
                  <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                    Estados de Erro
                  </CardTitle>
                  
                  <FormGroup hasError>
                    <FormLabel required>Campo com Erro</FormLabel>
                    <Input 
                      type="text" 
                      placeholder="Campo inválido"
                      defaultValue="valor_inválido"
                    />
                    <FormHelperText variant="error">
                      Este campo contém um erro de validação
                    </FormHelperText>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Campo Desabilitado</FormLabel>
                    <Input 
                      type="text" 
                      placeholder="Campo desabilitado"
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Tamanhos</FormLabel>
                    <Flex direction="column" gap="0.5rem">
                      <Input size="sm" placeholder="Small input" />
                      <Input size="md" placeholder="Medium input" />
                      <Input size="lg" placeholder="Large input" />
                    </Flex>
                  </FormGroup>
                </Card>
              </Grid>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: '#374151' }}>Componentes de Feedback</h3>
              
              <Grid columns={1} gap="1.5rem">
                <Card padding="lg">
                  <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                    Alertas
                  </CardTitle>
                  <Flex direction="column" gap="1rem">
                    <Alert variant="info">
                      <strong>Informação:</strong> Esta é uma mensagem informativa para o usuário.
                    </Alert>
                    <Alert variant="success">
                      <strong>Sucesso:</strong> Operação realizada com sucesso!
                    </Alert>
                    <Alert variant="warning">
                      <strong>Atenção:</strong> Verifique os dados antes de continuar.
                    </Alert>
                    <Alert variant="error">
                      <strong>Erro:</strong> Ocorreu um problema ao processar a solicitação.
                    </Alert>
                  </Flex>
                </Card>

                <Card padding="lg">
                  <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                    Badges e Indicadores
                  </CardTitle>
                  
                  <Grid columns={3} gap="1rem" responsive>
                    <div>
                      <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        Tamanhos
                      </p>
                      <Flex direction="column" gap="0.5rem">
                        <div>
                          <Badge size="sm" variant="primary">Small</Badge>
                        </div>
                        <div>
                          <Badge size="md" variant="primary">Medium</Badge>
                        </div>
                        <div>
                          <Badge size="lg" variant="primary">Large</Badge>
                        </div>
                      </Flex>
                    </div>
                    
                    <div>
                      <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        Estados
                      </p>
                      <Flex direction="column" gap="0.5rem">
                        <div>
                          <Badge variant="success">Ativo</Badge>
                        </div>
                        <div>
                          <Badge variant="warning">Pendente</Badge>
                        </div>
                        <div>
                          <Badge variant="error">Inativo</Badge>
                        </div>
                      </Flex>
                    </div>
                    
                    <div>
                      <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        Contexto
                      </p>
                      <Flex direction="column" gap="0.5rem">
                        <div>
                          <Badge variant="info">Info</Badge>
                        </div>
                        <div>
                          <Badge variant="primary">Primary</Badge>
                        </div>
                        <div>
                          <Badge variant="default">Default</Badge>
                        </div>
                      </Flex>
                    </div>
                  </Grid>
                </Card>

                <Card padding="lg">
                  <CardTitle size="sm" style={{ marginBottom: '1rem' }}>
                    Exemplos Práticos
                  </CardTitle>
                  
                  <Flex direction="column" gap="1rem">
                    <Flex justify="between" align="center" style={{ 
                      padding: '1rem', 
                      background: '#f9fafb', 
                      borderRadius: '6px' 
                    }}>
                      <div>
                        <h5 style={{ margin: '0 0 0.25rem', color: '#374151' }}>
                          Usuário Premium
                        </h5>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                          João Silva - joao@email.com
                        </p>
                      </div>
                      <Flex gap="0.5rem">
                        <Badge variant="success">Ativo</Badge>
                        <Badge variant="primary">Premium</Badge>
                      </Flex>
                    </Flex>

                    <Flex justify="between" align="center" style={{ 
                      padding: '1rem', 
                      background: '#f9fafb', 
                      borderRadius: '6px' 
                    }}>
                      <div>
                        <h5 style={{ margin: '0 0 0.25rem', color: '#374151' }}>
                          Transação #12345
                        </h5>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                          R$ 1.250,00 - 15/01/2024
                        </p>
                      </div>
                      <Flex gap="0.5rem">
                        <Badge variant="warning">Pendente</Badge>
                        <Button size="sm" variant="ghost">Ver detalhes</Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </Grid>
            </div>
          )}
        </TabContent>
      </Tabs>
    </Container>
  )
}
