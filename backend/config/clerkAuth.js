import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import dotenv from 'dotenv'
dotenv.config({ path: '../config/.env'})

export const clerkMiddleware = ClerkExpressWithAuth({
    secretKey : process.env.CLERK_SECRET_KEY,
});