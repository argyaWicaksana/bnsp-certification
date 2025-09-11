import express from 'express';
import { errorHandler } from "@/middlewares/errorHandler";
import path from 'node:path';
import fs from "node:fs";
import cors from 'cors';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-XSRF-TOKEN"],
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, '../public')))

const routesDir = path.join(__dirname, "./routes")
fs.readdirSync(routesDir).forEach((file) => {
    const routePath = path.join(routesDir, file);
    const routePathWithoutExt = path.parse(routePath).name;

    const dashedRoutePath = routePathWithoutExt.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
    const router = require(routePath).default;

    app.use(`/api/${dashedRoutePath}`, router);

});

app.use(errorHandler)

export default app
