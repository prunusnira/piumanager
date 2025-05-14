import { PrismaClient } from '@prisma/client';

const globalPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalPrisma.prisma || new PrismaClient();
globalPrisma.prisma = prisma;

export default prisma;
