import { prismaMock } from './__mocks__/prismaMock';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: prismaMock,
}));