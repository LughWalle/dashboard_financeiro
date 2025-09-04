import axios from 'axios'
import bcrypt from 'bcryptjs'

const API_URL = 'http://localhost:3001'

export type UserMock = {
  id: number
  email: string
  name: string
  role: string
  password: string
}

export const getAllUsersMock = async (): Promise<UserMock[]> => {
  try {
    const response = await axios.get(`${API_URL}/users`)
    return await response.data
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return []
  }
}

export const getUserMockById = async (id: number): Promise<UserMock | null> => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`)
    if (!response.status) return null
    return await response.data
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}

export const getUserMockByEmail = async (email: string): Promise<UserMock | null> => {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}`)
    const users = await response.data
    return users.length > 0 ? users[0] : null
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error)
    return null
  }
}

export const createUserMock = async (user: Omit<UserMock, 'id'>): Promise<UserMock | null> => {
  try {
    const response = await axios.post(`${API_URL}/users`, user)
    return await response.data
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return null
  }
}

export const updateUserMock = async (id: number, user: Partial<UserMock>): Promise<UserMock | null> => {
  try {
    const response = await axios.patch(`${API_URL}/users/${id}`, user)
    return await response.data
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return null
  }
}

export const deleteUserMock = async (id: number): Promise<number | null> => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`)
    return response.status
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    return null
  }
}

export const verifyUserMock = async (email: string, password: string): Promise<UserMock | null> => {
  const user = await getUserMockByEmail(email)
  if (!user) return null
  
  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if (!isPasswordValid) return null
  
  return user
}