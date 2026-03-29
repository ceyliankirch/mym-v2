import { PrismaClient } from '@prisma/client'

const globalForPrisma = global

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'], // On active tous les logs pour voir ce qui se passe
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma