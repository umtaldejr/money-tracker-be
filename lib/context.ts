import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ContextParameters, Context as ContextType } from 'graphql-yoga/dist/types';
import { MockProxy, mockDeep } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';

import Environment from './types/Environment';
import authenticate from './utils/authenticate';

export type Context = ContextType & {
  bcrypt: typeof bcrypt,
  env: Environment,
  jwt: typeof jwt,
  prisma: PrismaClient,
  userId?: User['id'],
};

export type MockContext = {
  bcrypt: MockProxy<typeof bcrypt>,
  env: Environment,
  jwt: MockProxy<typeof jwt>,
  prisma: MockProxy<PrismaClient>,
  userId?: User['id'],
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
    env: {
      JWT_SECRET: 'secret',
      DATABASE_URL: 'postgresql://user:secret@localhost',
    },
    bcrypt: mockDeep<typeof bcrypt>(),
    jwt: mockDeep<typeof jwt>(),
  };
};

export default ({ request }: ContextParameters): Context => {
  const DEFAULT_CONTEXT: Context = {
    bcrypt,
    env: process.env as Environment,
    jwt,
    prisma: new PrismaClient(),
  };

  const userId = authenticate(request);
  return userId ? { ...DEFAULT_CONTEXT, userId } : DEFAULT_CONTEXT;
};
