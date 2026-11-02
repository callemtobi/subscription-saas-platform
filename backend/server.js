import express from "express"
import cors from "cors"
import redis from "redis"
import "dotenv/config"

import pool from "./config/db.js"
import { errorHandler } from "./middleware/errorHandler.js"
import createUserTable from "./data/createUserTable.js"

// Initialize Express App
const app = express()

// Routes
import authRoute from "./routes/auth.js"

// Configuration
const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8000,
    postgres: {
        connectionString: process.env.DATABASE_URL,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    redis: {
        url: process.env.REDIS_URL,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    },
    corsOptions: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ["Content-Type", "Authorization", 'X-Request-Id'],
    },

}

// Middleware
app.use(express.json())
app.use(cors(config.corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

// Create User Table
createUserTable();

// Routes
app.use("/api/auth", authRoute);
app.get("/db-check", async (req, res) => {
    try {
        const test = await pool.query("SELECT NOW(), current_database()");
        res.status(200).json({
            success: true,
            message: `-----------> Database name: ${test.rows[0].current_database}`,
            data: test.rows[0],
        });
    } catch (error) {
        // This will print the actual error to your terminal so you can see it
        console.error("DB Check Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "-----------> Internal server error",
            error: error.message 
        });
    }
});

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        uptime: process.uptime(),
        message: "-----------> Server is healthy...",
        environment: config.env,
        timestamp: new Date().toISOString(),
    })
})

// Route not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `-----------> Route not found: ${req.method} ${req.originalUrl}`,
    })
})

// Error Handler
app.use(errorHandler)

// Start Server
app.listen(config.port, () => {
    console.log(`------> Server is running: http://localhost:${config.port}`)
})