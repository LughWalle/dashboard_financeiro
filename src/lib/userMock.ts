import bcrypt from 'bcryptjs';

export type UserMockType = {
  id: number;
  email: string;
  name: string;
  password: string;
};

export const userMock: UserMockType = {
  id: 1,
  email: 'admin@test.com',
  name: 'Admin',
  password: bcrypt.hashSync('123456', 10),
};

export let userMockList: UserMockType[] = [userMock];

export const getUserMockByEmail = (email: string) => {
  return userMockList.find((user) => user.email === email);
};

export const getUserMockById = (id: number) => {
  return userMockList.find((user) => user.id === id);
};

export const createUserMock = (user: UserMockType) => {
  userMockList.push(user);
};

export const updateUserMock = (user: UserMockType) => {
  const index = userMockList.findIndex((user) => user.id === user.id);
  userMockList[index] = user;
};

export const deleteUserMock = (id: number) => {
  userMockList = userMockList.filter((user) => user.id !== id);
};