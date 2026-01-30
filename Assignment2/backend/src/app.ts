import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./lib/logger.js";
import { apiRouter } from "./routes/index.js";

export function createApp() {
    const app = express();
    app.use(
        cors({
            origin: ["http://localhost:3000"],
            credentials: true,
        })
    );

    app.use(express.json());
    app.use(cookieParser());
    app.use((req, _res, next) => {
        logger.info(`Method: ${req.method}`)
        logger.info(`URL: ${req.url}`)

        next()
    })
    app.get("/health", async (_req, res) => {
        try {

            res.json({
                status: "healthy",
                timestamp: new Date().toISOString(),
                database: "connected",
                message: "Backend is running safely"
            });
        } catch (error) {
            res.status(503).json({
                status: "unhealthy",
                timestamp: new Date().toISOString(),
                database: "disconnected",
                message: "Database connection failed"
            });
        }
    });
    app.use('/api', apiRouter)
    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}
