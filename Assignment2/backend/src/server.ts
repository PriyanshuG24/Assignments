import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { assertDatabaseConnection } from "./db/db.js";
import { logger } from "./lib/logger.js";
import http from "node:http";
// import fs from "node:fs";
// import Deal from "./modules/deals/deal.model.js";
// import path from "node:path";

async function bootstrap() {
    try {
        await assertDatabaseConnection();

        const app = createApp();
        const server = http.createServer(app);

        const port = Number(env.PORT) || 5000;

        // const filePath = path.join(process.cwd(), "src", "db", "dummy.json");
        // const raw = fs.readFileSync(filePath, "utf-8");
        // const deals = JSON.parse(raw);

        // const dealsWithIds = deals.map((deal: any, index: number) => ({
        //     ...deal,
        //     dealId: index + 1 
        // }));

        // await Deal.deleteMany({});
        // await Deal.insertMany(dealsWithIds);

        // console.log(`dummy data inserted successfully`);

        server.listen(port, () => {
            logger.info(`Server is now listening to port: http://localhost:${port}`);
        });
    } catch (err) {
        logger.error("Failed to start the server", `${(err as Error).message}`);
        process.exit(1);
    }
}

bootstrap();
