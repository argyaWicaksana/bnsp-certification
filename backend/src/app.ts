import express from 'express';
import { errorHandler } from "@/middlewares/errorHandler";
import path from 'node:path';
import fs from "node:fs";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
