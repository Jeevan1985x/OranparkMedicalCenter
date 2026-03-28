import "dotenv/config";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is not set. Check your .env file.");
}

const adapter = new PrismaNeon({ connectionString });
export const prisma = new PrismaClient({ adapter });
