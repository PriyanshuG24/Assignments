import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "../app.js";
import { assertDatabaseConnection } from "../db/db.js";

const app = createApp();

let dbReady = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!dbReady) {
        await assertDatabaseConnection();
        dbReady = true;
    }

    return app(req as any, res as any);
}
