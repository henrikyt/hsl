import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// simple export for now. This could contain DB maintanance.
export default prisma;
