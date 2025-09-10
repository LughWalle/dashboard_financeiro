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

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post('/api/auth/login', { email, password })

      if (response.status === 200) {
        window.location.href = '/dashboard'
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Erro ao fazer login');
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false)
    }
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
              Faça login para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
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
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <Flex justify="center" style={{ width: '100%' }}>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                Não tem uma conta?{' '}
                <Link 
                  href="/register" 
                  style={{ 
                    color: '#3b82f6', 
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  Cadastre-se
                </Link>
              </p>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </Container>
  )
}
