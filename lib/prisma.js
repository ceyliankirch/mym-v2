import { PrismaClient } from '@prisma/client'

// ⚡ L'URL de ta base de données Neon
const connectionString = "postgresql://neondb_owner:npg_w9qzNQjgc1ED@ep-purple-cake-abueyggh-pooler.eu-west-2.aws.neon.tech/sejours?sslmode=require"

const prismaClientSingleton = () => {
  console.log("🚀 PRISMA : Démarrage en mode NATIF (Sans Adaptateur) !");
  
  // Comme on n'utilise plus l'adaptateur, Prisma AUTORISE le bloc datasources !
  return new PrismaClient({
    datasources: {
      db: {
        url: connectionString,
      },
    },
  })
}

const globalForPrisma = globalThis
// On s'assure de ne créer qu'une seule instance en local
export const prisma = globalForPrisma.prisma || prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma