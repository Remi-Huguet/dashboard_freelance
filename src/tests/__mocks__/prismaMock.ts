import { Client, Project, Invoice  } from '@prisma/client';

type JestMockFn<ReturnType> = jest.Mock<ReturnType, unknown[]>;

export const prismaMock = {
  client: {
    findMany: jest.fn() as JestMockFn<Promise<Client[]>>,
    findUnique: jest.fn() as JestMockFn<Promise<Client | null>>,
    create: jest.fn() as JestMockFn<Promise<Client>>,
    update: jest.fn() as JestMockFn<Promise<Client>>,
    delete: jest.fn() as JestMockFn<Promise<Client>>,
  },
  project: {
    findMany: jest.fn() as JestMockFn<Promise<Project[]>>,
    findUnique: jest.fn() as JestMockFn<Promise<Project | null>>,
    create: jest.fn() as JestMockFn<Promise<Project>>,
    update: jest.fn() as JestMockFn<Promise<Project>>,
    delete: jest.fn() as JestMockFn<Promise<Project>>,
  },
  invoice: {
    findMany: jest.fn() as JestMockFn<Promise<Invoice[]>>,
    findUnique: jest.fn() as JestMockFn<Promise<Invoice | null>>,
    findFirst: jest.fn() as JestMockFn<Promise<Invoice | null>>,
    create: jest.fn() as JestMockFn<Promise<Invoice>>,
    update: jest.fn() as JestMockFn<Promise<Invoice>>,
    delete: jest.fn() as JestMockFn<Promise<Invoice>>,
  },
};
