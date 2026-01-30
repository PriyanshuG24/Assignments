require('dotenv').config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/auth.route")
const userRoutes = require("./routes/user.route")
const postRoutes = require("./routes/post.route")
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

app.use("/api/auth", routes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
startServer();