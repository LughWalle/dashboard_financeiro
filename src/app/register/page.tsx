'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FormGroup,
  FormLabel,
  Input,
  Button,
  Alert,
  Flex
} from '@/styles/components'

export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validação básica
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post('/api/auth/register', { email, name, password })
      if (response.status === 201) {
        setSuccess(true)
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Container>
        <Flex 
          direction="column" 
          justify="center" 
          align="center" 
          style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem'
          }}
        >
          <Card 
            variant="elevated" 
            padding="xl"
            style={{ 
              width: '100%', 
              maxWidth: '400px',
              background: 'white',
              textAlign: 'center'
            }}
          >
            <CardContent>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <CardTitle size="lg" style={{ color: '#10b981', marginBottom: '1rem' }}>
                Conta Criada com Sucesso!
              </CardTitle>
              <CardDescription>
                Você será redirecionado para a página de login em instantes...
              </CardDescription>
            </CardContent>
          </Card>
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Flex 
        direction="column" 
        justify="center" 
        align="center" 
        style={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem'
        }}
      >
        <Card 
          variant="elevated" 
          padding="xl"
          style={{ 
            width: '100%', 
            maxWidth: '400px',
            background: 'white'
          }}
        >
          <CardHeader>
            <CardTitle size="lg" style={{ textAlign: 'center', color: '#1f2937' }}>
              🏦 Dashboard Financeiro
            </CardTitle>
            <CardDescription style={{ textAlign: 'center' }}>
              Crie sua conta para começar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel required>Nome Completo</FormLabel>
                <Input
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel required>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel required>Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Digite sua senha (mín. 6 caracteres)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel required>Confirmar Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="lg"
                  required
                />
              </FormGroup>

              {error && (
                <Alert variant="error" style={{ marginBottom: '1rem' }}>
                  <strong>Erro:</strong> {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                loading={loading}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <Flex justify="center" style={{ width: '100%' }}>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                Já tem uma conta?{' '}
                <Link 
                  href="/login" 
                  style={{ 
                    color: '#3b82f6', 
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  Faça login
                </Link>
              </p>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </Container>
  )
}