import { PrismaClient } from '@prisma/client'

// ⚡ L'URL de la base Neon vient de la variable d'environnement DATABASE_URL
// (.env en local, Variables d'environnement du projet sur Vercel). Ne jamais la mettre en dur ici.
const connectionString = process.env.DATABASE_URL

const prismaClientSingleton = () => {
  if (!connectionString) throw new Error("DATABASE_URL est manquante : renseignez-la dans .env (local) ou dans les variables d'environnement Vercel.")
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