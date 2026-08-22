import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const connectionString = process.env.DATABASE_URL;
console.log(connectionString);
console.log(process.env.JWT_SECRET_KEY);
if (!connectionString) {
    throw new Error("DATABASE_URL not found");
}
const adapter = new PrismaPg({
    connectionString
});
const client = new PrismaClient({
    adapter
});
export default client;
//# sourceMappingURL=db.js.map