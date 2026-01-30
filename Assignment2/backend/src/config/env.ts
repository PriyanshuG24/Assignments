import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
    PORT: z.string().default("5000"),
    MONGODB_URI: z.string(),
    JWT_ACCESS_SECRET: z.string(),
    JWT_ACCESS_EXPIRES_IN: z.string().transform(Number),
    JWT_REFRESH_SECRET: z.string(),
    JWT_REFRESH_EXPIRES_IN: z.string().transform(Number),
    NODE_ENV: z.enum(["development", "production"]).default("development"),

});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Environment variables validation failed:");
    console.error(parsed.error.issues);
    process.exit(1);
}

export const env = parsed.data;
